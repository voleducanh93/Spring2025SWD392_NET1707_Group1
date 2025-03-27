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
import { usePayment } from "../../hooks/usePayment";
import { AppContext } from "../../contexts/app.context";
import { useProcessWalletPayment } from "../../hooks/useWallet";
import DepositModal from "../../components/Composit/DepositModal";
import { useBooking } from "../../hooks/useBooking";
import { checkParentVaccine } from "../../api/booking.api";

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
  const { walletBalance, refreshWalletBalance, getUser } =
    useContext(AppContext);

  const openAddChildModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleAddChild = (newChild) => {
    addChildren.mutateAsync(newChild);
  };

  const handleSelectChild = async (value) => {
    setSelectedChild(value.childId);
    setSelectedVaccines([]);

    try {
      const result = await getVaccinesAndCombo(value.childId);
      console.log("✅ API Response:", result);

      if (result?.result) {
        setVaccinationSchedule(result.result.vaccines || []);
        setComboVaccines(result.result.comboVaccines || []);
        console.log(comboVaccines);
      } else {
        setVaccinationSchedule([]);
        setComboVaccines([]);
      }
    } catch {
      setVaccinationSchedule([]);
      setComboVaccines([]);
    }
  };

  const createBookingData = async() => {
    if (!selectedVaccines || selectedVaccines.length === 0) {
      toast.error("Vui lòng chọn ít nhất một vaccine hoặc combo vaccine.");
      return null;
    }

    const isValid = handleValidationDate();
    if (!isValid) return null;
    if (!isValidSchedule){
      toast.error("ngu vl");
      return null;
    }
    const isVaccinationScheduleValid = await checkVaccinationSchedule(); // Chờ kết quả từ checkVaccinationSchedule()
    if (!isVaccinationScheduleValid) {
        toast.error("Ngu vc.");
        return null;
    }
    if (!selectedDate && isComboSelected) {
      toast.error("Vui lòng chọn ngày đặt lịch.");
      return null;
    }
    const bookingDetails = [];
    console.log("test");
    
    selectedVaccines.forEach((item) => {
      if (isComboSelected && item.comboId) {
        bookingDetails.push({
          comboVaccineId: item.comboId,
          injectionDate: moment(
            selectedDate,
            "DD/MM/YYYY",
            true
          ).bookingDate.format("YYYY-MM-DD"),
        });
      } else if (item.vaccineId) {
        bookingDetails.push({
          vaccineId: item.vaccineId,
          injectionDate: item.injectionDate,
        });
      }
    });
    return {
      childId: selectedChild,
      bookingDate: bookingDetails[0].injectionDate,
      notes: "Đặt lịch tiêm chủng",
      bookingDetails: bookingDetails,
    };
  };

  const isValidSchedule = selectedVaccines.every((vaccineA, index, array) => {
    return array.every(vaccineB => {
        if (vaccineA !== vaccineB) {
            const dateA = new Date(vaccineA.injectionDate);
            const dateB = new Date(vaccineB.injectionDate);
            const diffMonths = Math.abs(dateA - dateB) / (1000 * 60 * 60 * 24 * 30); // Chuyển đổi sang tháng
            return diffMonths >= 2;
        }
        return true;
    });
});



  const handleBooking = async() => {
    const bookingData =  await createBookingData();
    console.log(bookingData);
    
    if (bookingData == null) return;

    addBooking.mutate(bookingData, {
      onSuccess: (response) => {
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
        const errorMessage =
          error?.response?.data?.errorMessages?.[0] ||
          "⚠️ Đặt lịch thất bại! Vui lòng thử lại.";
        toast.error(errorMessage);
      },
    });
  };
  const processWalletPayment = useProcessWalletPayment();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const handleValidationDate = () => {
    const invalidIndexes = [];

    selectedVaccines.forEach((vaccine, index) => {
      if (!vaccine.injectionDate) {
        invalidIndexes.push(index + 1); // +1 để người dùng thấy là số thứ tự
      }
    });

    if (invalidIndexes.length > 0) {
      const positions = invalidIndexes.join(", ");
      toast.error(
        `Vui lòng nhập ngày tiêm cho vaccine ở vị trí số: ${positions}`
      );
      return false;
    }

    return true;
  };

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
        if (!response?.result?.bookingId) {
          console.error("❌ Lỗi: Không lấy được bookingId!");
          toast.error("⚠️ Lỗi hệ thống. Vui lòng thử lại!");
          return;
        }

        const bookingId = response.result.bookingId;
        console.log(bookingId);

        processWalletPayment.mutate(bookingId, {
          onSuccess: () => {
            toast.success("💰 Thanh toán thành công bằng ví!");
            setSelectedVaccines([]);
            setSelectedChild(null);
            setSelectedDate(null);
            setVaccinationSchedule(null);
            refreshWalletBalance();
          },
          onError: () => {
            toast.error("⚠️ Thanh toán thất bại! Vui lòng kiểm tra số dư.");
          },
        });
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

  const handleCheckVaccine = async (item) => {
    if (!item.vaccineId) return false;

    const formData = new FormData();
    formData.append("VaccineIds", item.vaccineId);
    try {
      const result = await checkParentVaccine([item.vaccineId]);

      if (Array.isArray(result?.result) && result.result.length > 0) {
        return new Promise((resolve) => {
          toast(
            ({ closeToast }) => (
              <div
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Hiệu ứng nổi đẹp hơn
                  width: "420px", // Độ rộng hợp lý
                  textAlign: "center",
                  zIndex: 9999,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#333", // Màu chữ đậm hơn
                }}
              >
                <p style={{ marginBottom: "20px", lineHeight: "1.5" }}>
                  {result.result[0]}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={() => {
                      closeToast();
                      resolve(true); // ✅ Cho phép chọn vaccine
                    }}
                    style={{
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "none",
                      background: "#28a745", // Màu xanh đẹp hơn
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#218838")}
                    onMouseOut={(e) => (e.target.style.background = "#28a745")}
                  >
                    Tôi đã tiêm
                  </button>

                  <button
                    onClick={() => {
                      closeToast();
                      resolve(false); // ❌ Không cho phép chọn vaccine
                    }}
                    style={{
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "none",
                      background: "#dc3545", // Màu đỏ nổi bật
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#c82333")}
                    onMouseOut={(e) => (e.target.style.background = "#dc3545")}
                  >
                    Chưa tiêm
                  </button>
                </div>
              </div>
            ),
            { autoClose: false }
          );
        });
      } else {
        return true; // Không có cảnh báo thì cho phép chọn luôn
      }
    } catch {
      toast.error("⚠️ Lỗi kiểm tra vaccine. Vui lòng thử lại.");
      return false;
    }
  };

  const toggleSelection = async (item, isRemoving = false) => {
    if (item.comboId) {
      // Nếu là combo vaccine, không cần kiểm tra API
      setSelectedVaccines((prev) => {
        const isComboSelected = prev.some((v) => v.comboId === item.comboId);
        return isComboSelected
          ? prev.filter((v) => v.comboId !== item.comboId)
          : [...prev, item];
      });
    } else {
      if (isRemoving) {
        // 🛑 Khi "Bỏ chọn", không kiểm tra API
        setSelectedVaccines((prev) =>
          prev.filter((v) => v.vaccineId !== item.vaccineId)
        );
      } else {
        // ✅ Khi "Chọn", kiểm tra API trước
        const isAllowed = await handleCheckVaccine(item);
        if (!isAllowed) return; // Nếu chưa tiêm, không cho chọn

        setSelectedVaccines((prev) => [...prev, item]);
      }
    }
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
  const handleChangeDate = (vaccineId, newDate) => {
    if (!newDate) return;

    const formattedDate = newDate.format("YYYY-MM-DD");

    setSelectedVaccines((prev) =>
      prev.map((v) =>
        v.vaccineId === vaccineId ? { ...v, injectionDate: formattedDate } : v
      )
    );
  };

  const API_URL = "https://childvaccineapi-hwafapgbemhnaba7.southeastasia-01.azurewebsites.net/api/Booking/user/a282136c-8f74-4296-a4ed-4c1af37c5ab9";
  
  async function checkVaccinationSchedule() {
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
        
          if (!data.isSuccess) {
              return true;
          }
          console.log(data.result[0].childId);
          console.log(selectedChild);
          
          // Lọc booking theo selectedChild
          const filteredBookings = data.result.filter(booking => booking.childId == selectedChild);
          
          if (filteredBookings.length === 0) {
              console.log("Không có lịch tiêm nào cho trẻ có ID:", selectedChild);
              return;
          }
  
          // Lấy danh sách injectionDate từ các booking đã lọc
          const injectionDates = filteredBookings.flatMap(booking => 
              booking.bookingDetails.map(detail => new Date(detail.injectionDate))
          );
  
          if (injectionDates.length === 0) {
              console.log("Không có ngày tiêm hợp lệ.");
              return;
          }
  
          // Sắp xếp ngày tiêm theo thứ tự tăng dần
          injectionDates.sort((a, b) => a - b);
          const closestDate = injectionDates[0]; // Ngày gần nhất
  
          // Kiểm tra khoảng cách 2 tháng
          const isValid = injectionDates.every(date => {
              const diffMonths = Math.abs(date - closestDate) / (1000 * 60 * 60 * 24 * 30);
              return diffMonths >= 2;
          });
  
          console.log("Ngày tiêm gần nhất:", closestDate.toISOString().split("T")[0]);
          console.log(isValid ? "Lịch hợp lệ" : "Lịch không hợp lệ");
  
      } catch (error) {
          console.error("Lỗi khi gọi API:", error);
      }
  }
  
  

  return (
    <div className="flex flex-col md:px-20 sm:px-8 !px-4 !py-6 gap-6">
      <div className="max-w-full bg-[#252A6F] rounded-3xl">
        <h2 className="!m-3 text-4xl font-medium flex justify-center text-[#F9AA1A]">
          <span className="!mt-3">DỊCH VỤ CỦA CHÚNG TÔI</span>
        </h2>
        <div className="flex flex-row !mt-10 !mb-10 justify-around">
          <div
            onClick={
              selectedChild ? () => handleVaccineAndCombo("vaccine") : undefined
            }
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
            onClick={
              selectedChild ? () => handleVaccineAndCombo("combo") : undefined
            }
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
      </div>
      <AddChildModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddChild={handleAddChild}
      />
      <div className="flex flex-col md:flex-row !gap-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 !gap-10">
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
                    <p className="text-sm text-gray-600">
                      Số lượng: {vaccine.injectionsCount}
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
                    className={`cursor-pointer !p-4 text-white rounded-lg w-full font-semibold text-lg ${
                      selectedVaccines.some(
                        (v) => v.vaccineId === vaccine.vaccineId
                      )
                        ? "bg-[#35944A]"
                        : "bg-[#2A388F]"
                    }`}
                    onClick={
                      () =>
                        selectedVaccines.some(
                          (v) => v.vaccineId === vaccine.vaccineId
                        )
                          ? toggleSelection(vaccine, true)
                          : toggleSelection(vaccine) // ✅ Chọn cần kiểm tra API trước
                    }
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
                  className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg !min-h-[480px] !max-h-[720px] !w-full"
                >
                  {/* Hiển thị thông tin combo vaccine */}
                  <div className="flex flex-col gap-3 bg-[#E6F0FA] rounded-2xl !p-4 flex-grow">
                    <h3 className="text-[#234060] text-lg font-medium text-center">
                      {combo.comboName}
                    </h3>

                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Mô tả:</span>{" "}
                      {combo.description}
                    </p>

                    <div className="flex items-center !gap-3 text-[#2A388F] !mt-4 justify-center">
                      <SellIcon />
                      <p className="font-semibold text-2xl">
                        {combo.totalPrice
                          ? `${combo.totalPrice.toLocaleString("vi-VN")} VNĐ`
                          : "Liên hệ"}
                      </p>
                    </div>

                    {/* Danh sách các vaccine trong combo */}
                    <div className="!mt-4 flex-grow">
                      <h4 className="text-sm font-semibold text-gray-800 !mb-2">
                        📋 Danh sách vắc-xin:
                      </h4>
                      <div className="overflow-hidden rounded-lg border border-gray-300">
                        <table className="w-full text-sm text-gray-800">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="!py-3 !px-4 text-center border-b">
                                Thứ tự
                              </th>
                              <th className="!py-3 !px-4 text-left border-b">
                                Tên vắc-xin
                              </th>
                              <th className="!py-3 !px-4 text-center border-b">
                                Khoảng cách (ngày)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {combo.vaccines
                              .sort((a, b) => a.order - b.order)
                              .map((vaccine, index) => (
                                <tr
                                  key={index}
                                  className="border-b last:border-none hover:bg-gray-100 transition-all"
                                >
                                  <td className="!py-3 !px-4 !text-center font-semibold text-gray-900">
                                    {vaccine.order}
                                  </td>
                                  <td className="!py-3 !px-4 !text-left">
                                    {vaccine.vaccine.name}
                                  </td>
                                  <td className="!py-3 !px-4 !text-center">
                                    {vaccine.intervalDays} ngày
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Nút chọn - Luôn ở dưới cùng */}
                  <div className="!mt-auto">
                    <button
                      className={`cursor-pointer p-4 text-white rounded-lg w-full font-semibold text-lg ${
                        selectedVaccines.some(
                          (v) => v.comboId === combo.comboId
                        )
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

                    {/* 💥 Thêm DatePicker ở đây */}
                    {!vaccine.comboId && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          Ngày tiêm
                        </label>
                        <Form.Item name="date">
                          <DatePicker
                            format="DD/MM/YYYY"
                            value={
                              vaccine.injectionDate
                                ? moment(vaccine.injectionDate, "YYYY-MM-DD")
                                : null
                            }
                            onChange={(date) =>
                              handleChangeDate(vaccine.vaccineId, date)
                            }
                            disabledDate={(current) =>
                              current && current < moment().startOf("day")
                            }
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </div>
                    )}

                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      onClick={() => toggleSelection(vaccine, true)}
                    >
                      Bỏ chọn
                    </button>
                  </div>
                ))}

                {/* Chọn ngày */}
                {isComboSelected && (
                  <div className="flex items-center gap-4 mt-5">
                    <p className="font-semibold text-xl">Chọn ngày:</p>
                    <Form>
                      <Form.Item name="date" className="!pt-5">
                        <DatePicker
                          style={{ width: 300, height: 45 }}
                          format="DD/MM/YYYY"
                          value={
                            selectedDate
                              ? moment(selectedDate, "DD/MM/YYYY")
                              : null
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
                    </Form>
                  </div>
                )}

                {/* Nút thanh toán */}
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
