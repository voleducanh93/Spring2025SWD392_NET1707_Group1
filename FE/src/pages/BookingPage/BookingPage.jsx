import { useState } from "react";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { useChildren } from "../../hooks/useChildren";
import { Avatar, Button, Divider, Select, Space } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import AddChildModal from "../../components/ChildrenInput/CreateChildren";
import moment from "moment";
import axios from "axios";

const BookingPage = () => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [filter, setFilter] = useState("Tất cả");
  const { vaccines: children, addChildren } = useChildren();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinationSchedule, setVaccinationSchedule] = useState(null);

  const addItem = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

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
    const child = children.find((c) => c.fullName === value);
    setSelectedChild(child);

    if (child && child.childId) {
      fetchVaccinationSchedule(child.childId); // Gọi API lấy lịch tiêm chủng
    }
  };

  // Gọi API lấy lịch tiêm chủng
  const fetchVaccinationSchedule = async (childId) => {
    try {
      const response = await axios.get(
        `https://localhost:7134/api/VaccinationSchedule/${childId}`
      );

      if (response.data.isSuccess && response.data.result) {
        const schedule = response.data.result;

        // Gọi API lấy thông tin cho từng vắc-xin
        const vaccinesWithDetails = await Promise.all(
          schedule.vaccineScheduleDetails.map(async (vaccine) => {
            const { price, manufacturer, diseasePrevented } =
              await fetchVaccine(vaccine.vaccineId);
            return { ...vaccine, price, manufacturer, diseasePrevented };
          })
        );

        setVaccinationSchedule({
          ...schedule,
          vaccineScheduleDetails: vaccinesWithDetails,
        });
      } else {
        console.warn("API không trả về danh sách vắc-xin!");
        setVaccinationSchedule(null);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch tiêm chủng:", error);
      setVaccinationSchedule(null);
    }
  };

  const fetchVaccine = async (vaccineId) => {
    try {
      const response = await axios.get(
        `https://localhost:7134/api/Vaccine/${vaccineId}`
      );

      if (response.data.isSuccess && response.data.result) {
        const { price, manufacturer, diseasePrevented } = response.data.result;
        return { price, manufacturer, diseasePrevented }; // Trả về object chứa 3 giá trị
      }
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin vắc-xin (ID: ${vaccineId}):`, error);
    }
    return {
      price: "Liên hệ",
      manufacturer: "Không xác định",
      diseasePrevented: "Không xác định",
    };
  };

  const editItem = (child) => {
    // Ensure dateOfBirth is a moment object
    const formattedChild = {
      ...child,
      dateOfBirth: child.dateOfBirth ? moment(child.dateOfBirth) : null,
    };
    setSelectedChild(formattedChild);
    //setIsModalVisible(true); // Open the modal for editing
  };

  const toggleSelection = (vaccine) => {
    if (!selectedChild) {
      alert("Vui lòng chọn trẻ trước khi chọn dịch vụ!");
      return;
    }

    setSelectedVaccines((prev) => {
      const isSelected = prev.some((v) => v.vaccineId === vaccine.vaccineId);
      return isSelected
        ? prev.filter((v) => v.vaccineId !== vaccine.vaccineId)
        : [...prev, vaccine];
    });
  };

  const calculateAgeInYears = (dob) => {
    const birthDate = moment(dob);
    if (!birthDate.isValid()) return "Không xác định";

    const years = moment().diff(birthDate, "years"); // Lấy số năm

    return `${years} tuổi`;
  };

  return (
    <div className="flex flex-col md:px-20 sm:px-8 !px-4 !py-6 gap-6">
      {/* Filter Dropdown */}
      <div className="flex items-center gap-6 relative flex-wrap !mt-6 !mb-6">
        <label className="font-semibold text-xl">Chọn trẻ:</label>
        <Select
          style={{ width: 300, height: 50 }}
          placeholder="Chọn trẻ"
          onChange={handleSelectChild}
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
              <div className="flex items-center justify-between w-full">
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
                <span className="ml-2 text-right" style={{ minWidth: "50px" }}>
                  {calculateAgeInYears(child.dateOfBirth)}
                </span>
              </div>
            ),
            value: child.fullName,
          }))}
        />
      </div>
      {/* Hiển thị Lịch Tiêm Chủng */}
      {vaccinationSchedule && (
        <div className="p-5 border rounded-lg shadow-lg bg-gray-100">
          <h3 className="text-lg font-semibold text-blue-700">
            Lịch Tiêm Chủng
          </h3>
          <p className="text-gray-600">{vaccinationSchedule.notes}</p>
          <ul className="mt-3 list-disc pl-5">
            {vaccinationSchedule.vaccineScheduleDetails.map((vaccine) => (
              <li key={vaccine.vaccineId} className="text-gray-800">
                {vaccine.vaccineName}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <div className="max-w-full bg-[#252A6F] rounded-3xl">
        <h2 className="!m-3 text-4xl font-medium flex justify-center text-[#F9AA1A]">
          <span>CÁC DỊCH VỤ CỦA CHÚNG TÔI</span>
        </h2>
        <div className="flex flex-row !mt-10 !mb-10 justify-around">
          <div className="flex flex-col bg-white col-sm-2 col-xs-6 justify-center items-center !p-10 rounded-3xl shadow-xl !space-y-10 w-[350px] cursor-pointer hover:">
            <img
              src="https://vnvc.vn/wp-content/uploads/2025/02/tiem-chung-tai-trung-tam-vnvc.png"
              alt=""
            />
            <h4 className="text-[#252A6F] text-xl font-medium">
              <span>VACCCINE</span>
            </h4>
          </div>
          <div className="flex flex-col bg-white col-sm-2 col-xs-6 justify-center items-center !p-10 rounded-3xl shadow-xl !space-y-10 w-[350px] cursor-pointer">
            <img
              src="https://vnvc.vn/wp-content/uploads/2025/02/tiem-chung-goi-uu-tien.png"
              alt=""
            />
            <h4 className="text-[#252A6F] text-xl font-medium">
              <span>COMBO VACCINE</span>
            </h4>
          </div>
        </div>
      </div> */}

      <AddChildModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddChild={handleAddChild} // Pass the function to handle new child data
        //initialValues={selectedChild} // Pass selected child data to pre-fill (for edit)
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Danh sách Vắc-xin */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {vaccinationSchedule?.vaccineScheduleDetails?.length > 0 ? (
            vaccinationSchedule.vaccineScheduleDetails.map((vaccine) => (
              <div
                key={vaccine.vaccineId}
                className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg max-h-[410px] overflow-hidden"
              >
                <div className="flex flex-col gap-3 bg-[#DDECF9] rounded-2xl !p-4">
                  <h3 className="text-[#234060] text-lg font-medium">
                    {vaccine.vaccineName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Nguồn gốc: {vaccine.manufacturer}
                  </p>
                  <p className="text-sm text-gray-600">
                    {vaccine.diseasePrevented}
                  </p>
                  <div className="flex items-center gap-3 text-[#2A388F] mt-6">
                    <SellIcon />
                    <p className="font-semibold text-2xl">
                      {vaccine.price !== "Liên hệ"
                        ? `${vaccine.price.toLocaleString("vi-VN")} VNĐ`
                        : "Liên hệ"}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">Phòng bệnh:</p>
                  <p className="text-gray-600">{vaccine.diseasePrevented}</p>
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
                  ) ? (
                    <div className="flex justify-between">
                      ĐÃ CHỌN <DoneIcon />
                    </div>
                  ) : (
                    "CHỌN"
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có lịch tiêm chủng nào.</p>
          )}
        </div>

        {/* Selected Vaccines List */}
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
                    <p className="text-sm">Phòng bệnh: {vaccine.disease}</p>
                    <p className="font-semibold text-blue-600">
                      {vaccine.price?.toLocaleString()} VNĐ
                    </p>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      onClick={() => toggleSelection(vaccine)}
                    >
                      Bỏ chọn
                    </button>
                  </div>
                ))}
                <button className="!mt-5 w-full bg-orange-500 text-white !p-3 rounded-lg">
                  ĐĂNG KÝ MŨI TIÊM
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
