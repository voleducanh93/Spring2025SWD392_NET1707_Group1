import { useContext, useState } from "react";
import SellIcon from "@mui/icons-material/Sell";

import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { useChildren } from "../../hooks/useChildren";
import { Avatar, Button, DatePicker, Divider, Form, Select, Space } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import AddChildModal from "../../components/ChildrenInput/CreateChildren";
import moment from "moment";

import { toast } from "react-toastify";
import { getVaccinesAndCombo } from "../../api/vaccineSchedule.api";
import { useBooking } from "../../hooks/useBooking";
import { usePayment } from "../../hooks/usePayment";
import { AppContext } from "../../contexts/app.context";
import { useProcessWalletPayment } from "../../hooks/useWallet";
import DepositModal from "../../components/Composit/DepositModal";

const BookingPage = () => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const { vaccines: children, addChildren } = useChildren();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinationSchedule, setVaccinationSchedule] = useState(null);
  const { addBooking } = useBooking();
  const { fetchPaymentUrl } = usePayment();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isComboSelected, setIsComboSelected] = useState(false);
  const [comboVaccines, setComboVaccines] = useState([]);
  const { walletBalance, refreshWalletBalance } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false)
  const openAddChildModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleAddChild = (newChild) => {
    addChildren.mutateAsync(newChild);
  };
  // Khi người dùng chọn trẻ
  const handleSelectChild = async (value) => {
    setSelectedChild(value.childId);
    setSelectedVaccines([]);
    //setIsComboSelected(false);

    try {
      const result = await getVaccinesAndCombo(value.childId);
      console.log("✅ API Response:", result);

      if (result?.result) {
        setVaccinationSchedule(result.result.vaccines || []);
        setComboVaccines(result.result.comboVaccines || []);
        console.log(comboVaccines);
      } else {
        console.warn("⚠️ Không có dữ liệu vaccine hoặc combo hợp lệ.");
        setVaccinationSchedule([]);
        setComboVaccines([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      setVaccinationSchedule([]);
      setComboVaccines([]);
    }
  };

  const createBookingData = () => {
    if (!selectedVaccines || selectedVaccines.length === 0) {
      toast.error("Vui lòng chọn ít nhất một vaccine hoặc combo vaccine.");
      return null;
    }

    if (!selectedDate) {
      toast.error("Vui lòng chọn ngày đặt lịch.");
      return null;
    }

    const bookingDetails = [];

    selectedVaccines.forEach((item) => {
      if (isComboSelected && item.comboId) {
        bookingDetails.push({ comboVaccineId: item.comboId });
      } else if (item.vaccineId) {
        bookingDetails.push({ vaccineId: item.vaccineId });
      }
    });

    const bookingDate = moment(selectedDate, "DD/MM/YYYY", true);
    if (!bookingDate.isValid()) {
      console.error("❌ Ngày không hợp lệ!");
      toast.error("⚠️ Ngày không hợp lệ, vui lòng chọn lại.");
      return null;
    }

    const formattedDate = bookingDate.format("YYYY-MM-DD");

    return {
      childId: selectedChild,
      bookingDate: formattedDate,
      notes: "Đặt lịch tiêm chủng",
      bookingDetails: bookingDetails,
    };
  };

  const handleBooking = () => {
    const bookingData = createBookingData();
    if (!bookingData) return;

    addBooking.mutate(bookingData, {
      onSuccess: (response) => {
        console.log("✅ Booking Created:", response);

        if (!response?.result?.bookingId) {
          toast.error("⚠️ Lỗi hệ thống. Vui lòng thử lại!");
          return;
        }

        const bookingId = response.result.bookingId;

        setSelectedVaccines([]);
        setSelectedChild(null);
        setSelectedDate(null);
        setVaccinationSchedule(null);

        fetchPaymentUrl(bookingId);
      },
      onError: (error) => {
        console.error("❌ Lỗi khi tạo booking:", error);

        const errorMessage =
          error?.response?.data?.errorMessages?.[0] ||
          "⚠️ Đặt lịch thất bại! Vui lòng thử lại.";
        toast.error(errorMessage);
      },
    });
  };
  const processWalletPayment = useProcessWalletPayment();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  // Mở modal nhập số tiền nạp
  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };
  const checkWalletBalance = () => {
    const totalCost = selectedVaccines.reduce((acc, item) => {
      return acc + (item.price || item.totalPrice || 0);
    }, 0);

    if (walletBalance < totalCost) {
      handleOpenDepositModal();
      return false;
    }

    return true;
  };

  const handleWallet = () => {
    if (!checkWalletBalance()) return;
    const bookingData = createBookingData();
    if (!bookingData) return;
    addBooking.mutate(bookingData, {
      onSuccess: (response) => {
        console.log("✅ Booking Created:", response);

        if (!response?.result?.bookingId) {
          console.error("❌ Lỗi: Không lấy được bookingId!");
          toast.error("⚠️ Lỗi hệ thống. Vui lòng thử lại!");
          return;
        }

        const bookingId = response.result.bookingId;

        processWalletPayment.mutate(
          { bookingId },
          {
            onSuccess: () => {
              toast.success("💰 Thanh toán thành công bằng ví!");
              setSelectedVaccines([]);
              setSelectedChild(null);
              setSelectedDate(null);
              setVaccinationSchedule(null);
              refreshWalletBalance();
            },
            onError: (walletError) => {
              console.error("❌ Lỗi khi thanh toán bằng ví:", walletError);
              toast.error("⚠️ Thanh toán thất bại! Vui lòng kiểm tra số dư.");
            },
          }
        );
      },
      onError: (error) => {
        console.error("❌ Lỗi khi tạo booking:", error);

        const errorMessage =
          error?.response?.data?.errorMessages?.[0] ||
          "⚠️ Đặt lịch thất bại! Vui lòng thử lại.";
        toast.error(errorMessage);
      },
    });
  };

  const toggleSelection = (item) => {
    setSelectedVaccines((prev) => {
      if (item.comboId) {
        const isComboSelected = prev.some((v) => v.comboId === item.comboId);

        if (isComboSelected) {
          return prev.filter((v) => v.comboId !== item.comboId);
        }

        return [...prev, item];
      } else {
        const isVaccineSelected = prev.some(
          (v) => v.vaccineId === item.vaccineId
        );

        if (isVaccineSelected) {
          return prev.filter((v) => v.vaccineId !== item.vaccineId);
        }

        return [...prev, item];
      }
    });
  };

  const calculateAgeInYears = (dob) => {
    const birthDate = moment(dob);
    if (!birthDate.isValid()) return "Không xác định";

    const years = moment().diff(birthDate, "years"); // Lấy số năm

    return `${years} tuổi`;
  };

  const handleVaccineAndCombo = (value) => {
    alert(` Dữ liệu sẽ bị xóa bên kia`);
    if (value === "vaccine") {
      setIsComboSelected(false);
    } else {
      setIsComboSelected(true);
    }
    setSelectedVaccines([]);
    console.log(selectedVaccines);
    console.log(isComboSelected);
  };

  return (
    <div className="flex flex-col md:px-20 sm:px-8 !px-4 !py-6 gap-6">
      <div className="max-w-full bg-[#252A6F] rounded-3xl">
        <h2 className="!m-3 text-4xl font-medium flex justify-center text-[#F9AA1A]">
          <span className="!mt-3">DỊCH VỤ CỦA CHÚNG TÔI</span>
        </h2>
        <div className="flex flex-row !mt-10 !mb-10 justify-around">
          <div
            onClick={selectedChild ? () => handleVaccineAndCombo("vaccine") : undefined}

            className="flex flex-col bg-white col-sm-2 col-xs-6 justify-center items-center !p-10 rounded-3xl shadow-xl !space-y-10 w-[350px] cursor-pointer hover:"
          >
            <img
              src="https://vnvc.vn/wp-content/uploads/2025/02/tiem-chung-tai-trung-tam-vnvc.png"
              alt=""
            />
            <h4 className="text-[#252A6F] text-xl font-medium">
              <span>CÁC LOẠI VACCCINE</span>
            </h4>
          </div>
          <div
            onClick={selectedChild ? () => handleVaccineAndCombo("combo") : undefined}
            className="flex flex-col bg-white col-sm-2 col-xs-6 justify-center items-center !p-10 rounded-3xl shadow-xl !space-y-10 w-[350px] cursor-pointer"
          >
            <img
              src="https://vnvc.vn/wp-content/uploads/2025/02/tiem-chung-goi-uu-tien.png"
              alt=""
            />
            <h4 className="text-[#252A6F] text-xl font-medium">
              <span>COMBO VACCINE</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="flex items-center w-1/2 gap-4 !mt-5 !mb-5">
        <label className="font-semibold text-2xl">💰 Số dư ví:</label>
        <span className="text-2xl font-bold text-green-600">
           {walletBalance.toLocaleString()} VND
        </span>
      </div>
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between gap-6 w-full">
        <div className="flex items-center gap-4 w-1/2">
          <label className="font-semibold text-xl">Chọn trẻ:</label>
          <Select
            style={{ width: 300, height: 50 }}
            placeholder="Chọn trẻ"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  {/* Khi bấm vào nút này, modal sẽ mở */}
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={openAddChildModal}
                  >
                    Thêm trẻ
                  </Button>
                </Space>
              </>
            )}
            options={children?.map((child) => ({
              label: (
                <div
                  className="flex items-center justify-between w-full"
                  onClick={() => handleSelectChild(child)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={
                        child.imageUrl ? (
                          <img src={child.imageUrl} alt="avatar" />
                        ) : (
                          <UserOutlined />
                        )
                      }
                    />
                    <span className="ml-2">{child.fullName}</span>
                  </div>
                  <span
                    className="ml-2 text-right"
                    style={{ minWidth: "50px" }}
                  >
                    {calculateAgeInYears(child.dateOfBirth)}
                  </span>
                </div>
              ),
              value: child.fullName,
            }))}
          />
        </div>
        <div className="flex items-center gap-4 w-1/2">
          {selectedVaccines.length > 0 && (
            <div className="flex items-center gap-4">
              <p className="font-semibold text-xl">Chọn ngày:</p>
              <Form.Item name="date" className="!pt-5">
                <DatePicker
                  style={{ width: 300, height: 45 }}
                  format="DD/MM/YYYY"
                  value={
                    selectedDate ? moment(selectedDate, "DD/MM/YYYY") : null
                  }
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  } // Chặn ngày trong quá khứ
                  onChange={(date, dateString) => {
                    console.log("📅 Ngày đã chọn:", dateString);
                    setSelectedDate(dateString);
                  }}
                />
              </Form.Item>
              
            </div>
          )}
        </div>
      </div>
      <AddChildModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddChild={handleAddChild}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* 1. Hiển thị danh sách vaccine đơn */}
          {!isComboSelected && vaccinationSchedule?.length > 0
            ? vaccinationSchedule.map((vaccine) => (
                <div
                  key={vaccine.vaccineId}
                  className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg max-h-[410px] overflow-hidden"
                >
                  <div className="flex flex-col gap-3 bg-[#DDECF9] rounded-2xl !p-4">
                    <h3 className="text-[#234060] text-lg font-medium">
                      {vaccine.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Nguồn gốc: {vaccine.manufacturer}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phòng bệnh: {vaccine.description}
                    </p>
                    <div className="flex items-center gap-3 text-[#2A388F] mt-6">
                      <SellIcon />
                      <p className="font-semibold text-2xl">
                        {vaccine.price
                          ? `${vaccine.price.toLocaleString("vi-VN")} VNĐ`
                          : "Liên hệ"}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`cursor-pointer p-4 text-white rounded-lg w-full font-semibold text-lg ${
                      selectedVaccines.some(
                        (v) => v.vaccineId === vaccine.vaccineId
                      )
                        ? "bg-[#35944A]"
                        : "bg-[#2A388F]"
                    }`}
                    onClick={() => toggleSelection(vaccine)}
                  >
                    {selectedVaccines.some(
                      (v) => v.vaccineId === vaccine.vaccineId
                    )
                      ? "ĐÃ CHỌN"
                      : "CHỌN"}
                  </button>
                </div>
              ))
            : !isComboSelected && (
                <div className="flex items-center justify-center text-2xl font-semibold text-red-500">
                  Không có dữ liệu vắc-xin
                </div>
              )}
          {/* 2. Thông báo khi không có vaccine đơn */}
          {!isComboSelected && vaccinationSchedule?.length === 0 && (
            <div className="flex items-center justify-center text-2xl font-semibold text-red-500">
              Không có dữ liệu vắc-xin
            </div>
          )}
          {/* 3. Hiển thị danh sách combo vaccine */}
          {isComboSelected && comboVaccines?.length > 0
            ? comboVaccines.map((combo) => (
                <div
                  key={combo.comboId}
                  className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg max-h-[410px] overflow-hidden"
                >
                  {/* Hiển thị thông tin combo vaccine */}
                  <div className="flex flex-col gap-3 bg-[#DDECF9] rounded-2xl !p-4">
                    <h3 className="text-[#234060] text-lg font-medium">
                      {combo.comboName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Mô tả: {combo.description}
                    </p>
                    <div className="flex items-center gap-3 text-[#2A388F] mt-6">
                      <SellIcon />
                      <p className="font-semibold text-2xl">
                        {combo.totalPrice
                          ? `${combo.totalPrice.toLocaleString("vi-VN")} VNĐ`
                          : "Liên hệ"}
                      </p>
                    </div>
                    {/* Danh sách các vaccine trong combo */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold">
                        Danh sách vắc-xin:
                      </h4>
                      <ul className="list-disc pl-5">
                        {combo.vaccines.map((vaccine) => (
                          <li
                            key={vaccine.vaccineId}
                            className="text-sm text-gray-600"
                          >
                            {vaccine.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    className={`cursor-pointer p-4 text-white rounded-lg w-full font-semibold text-lg ${
                      selectedVaccines.some((v) => v.comboId === combo.comboId)
                        ? "bg-[#35944A]"
                        : "bg-[#2A388F]"
                    }`}
                    onClick={() => toggleSelection(combo)}
                  >
                    {selectedVaccines.some((v) => v.comboId === combo.comboId)
                      ? "ĐÃ CHỌN"
                      : "CHỌN"}
                  </button>
                </div>
              ))
            : isComboSelected &&
              comboVaccines.length === 0 && (
                <div className="flex items-center justify-center text-2xl font-semibold text-red-500">
                  Không có dữ liệu combo vaccine
                </div>
              )}
          {/* 4. Thông báo khi không có vaccine đơn */}
          {!isComboSelected && vaccinationSchedule?.length === 0 && (
            <div className="flex items-center justify-center text-2xl font-semibold text-red-500">
              Không có dữ liệu vắc-xin
            </div>
          )}
          <DepositModal
            isOpen={isDepositModalOpen}
            onClose={() => setIsDepositModalOpen(false)}
          />
          ;
        </div>

        <div className="border border-[#dcdfe6] w-full md:w-1/3 !p-8 rounded-2xl shadow-xl bg-white">
          <div className="text-[#2A388F] flex items-center gap-3 !mt-5">
            <InventoryOutlinedIcon />
            <h2 className="font-semibold text-xl">
              DANH SÁCH VẮC XIN CHỌN MUA
            </h2>
          </div>
          <div className="!mt-10">
            {selectedVaccines.length > 0 ? (
              <div>
                {selectedVaccines.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className="!mt-3 !p-5 rounded-lg !mb-3 shadow-xl flex flex-col gap-3"
                  >
                    <h4 className="font-semibold">{vaccine.vaccineName}</h4>
                    <p className="text-sm">
                      Tên: {vaccine.name ?? vaccine.comboName}
                    </p>
                    <p className="font-semibold text-blue-600">
                      {vaccine.price?.toLocaleString() ??
                        vaccine.totalPrice?.toLocaleString()}{" "}
                      VNĐ
                    </p>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      onClick={() => toggleSelection(vaccine)}
                    >
                      Bỏ chọn
                    </button>
                  </div>
                ))}
                <button
                  className="!mt-5 w-full bg-orange-500 text-white !p-3 rounded-lg"
                  onClick={handleBooking}
                >
                  THANH TOÁN TRỰC TIẾP
                </button>
                <button
                  className="!mt-5 w-full bg-amber-300 text-white !p-3 rounded-lg"
                  onClick={handleWallet}
                >
                  THANH TOÁN BẰNG VÍ
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có vắc-xin nào được chọn.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
