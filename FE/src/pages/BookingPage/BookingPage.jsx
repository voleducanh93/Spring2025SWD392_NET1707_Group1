import { useState } from "react";
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

const BookingPage = () => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);

  const { vaccines: children, addChildren } = useChildren();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinationSchedule, setVaccinationSchedule] = useState(null);
  const { addBooking } = useBooking();
  const { fetchPaymentUrl, isLoading: isPaymentLoading } = usePayment();
  const [selectedDate, setSelectedDate] = useState(null);
const [loading, setLoading] = useState(isPaymentLoading);
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
    try {
      const result = await getVaccinesAndCombo(value.childId);
      console.log("✅ API Response:", result);

      
      if (result && result.result && Array.isArray(result.result.vaccines)) {
          setVaccinationSchedule(result.result.vaccines);
      } else {
          console.warn("⚠️ Không có dữ liệu vaccine hợp lệ.");
          setVaccinationSchedule([]); 
      }
  } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      setVaccinationSchedule([]); 
  }
  };

  const handleBooking = () => {
   
    

    if (!selectedVaccines || selectedVaccines.length === 0){
      
        toast.error("Vui lòng chọn ít nhất một vaccine hoặc combo vaccine.");
        return;
    }
    if(!selectedDate){
     
      toast.error("Vui lòng chọn ngày đặt lịch.");
      return;
    }

    const bookingDetails = [];

    
    if (selectedVaccines && selectedVaccines.length > 0) {
        selectedVaccines.forEach(vaccine => {
            bookingDetails.push({
                vaccineId: vaccine.vaccineId,  
            });
        });
    }
   
    
    // // ✅ Xử lý danh sách Combo Vaccine
    // if (selectedComboVaccines && selectedComboVaccines.length > 0) {
    //     selectedComboVaccines.forEach(combo => {
    //         bookingDetails.push({
    //             vaccineId: null,  // Chỉ có combo vaccine
    //             comboVaccineId: combo.comboVaccineId
    //         });
    //     });
    // }

 

    
   
  
  const bookingDate = moment(selectedDate, "DD/MM/YYYY", true);
  if (!bookingDate.isValid()) {
      console.error("❌ Ngày không hợp lệ!");
      toast.error("⚠️ Ngày không hợp lệ, vui lòng chọn lại.");
      return;
  }
  
  const formattedDate = bookingDate.format("YYYY-MM-DD");
  
  
  
    const bookingData = {
        childId: selectedChild, 
        bookingDate: formattedDate,
        notes: "Đặt lịch tiêm chủng",
        bookingDetails: bookingDetails
    };

    

    addBooking.mutate(bookingData, {
      onSuccess: (response) => {
        console.log("✅ Booking Created:", response);
        if (!response || !response.result || !response.result.bookingId) {
          console.error("❌ Lỗi: Không lấy được bookingId!");
          toast.error("⚠️ Lỗi hệ thống. Vui lòng thử lại!");
          setLoading(false);
          return;
        }
    
        const bookingId = response.result.bookingId;
        console.log("📌 Booking ID:", bookingId);
    
        setSelectedVaccines([]);
        setSelectedChild(null);
        setSelectedDate(null);
        setVaccinationSchedule(null);
        fetchPaymentUrl(bookingId);
        setLoading(false);
      },
    
      onError: (error) => {
        console.error("❌ Lỗi khi tạo booking:", error);
    
        // ✅ Kiểm tra nếu có errorMessages từ API trả về
        if (error?.response?.data?.errorMessages?.length > 0) {
          const errorMessage = error.response.data.errorMessages[0]; // Lấy thông báo lỗi đầu tiên
          toast.error(`${errorMessage}`);
        } else {
          toast.error("⚠️ Đặt lịch thất bại! Vui lòng thử lại.");
        }
    
        setLoading(false);
      },
    });
};

  const toggleSelection = (vaccine) => {
    
    setSelectedVaccines((prev) => {
      const isSelected = prev.some((v) => v.vaccineId === vaccine.vaccineId);
      return isSelected
        ? prev.filter((v) => v.vaccineId !== vaccine.vaccineId)
        : [...prev, vaccine];
    });
    console.log(selectedVaccines);
    
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
              <div className="flex items-center justify-between w-full" onClick={() => handleSelectChild(child)}>
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
        <div>
        {selectedVaccines.length > 0 && (
      <div className="flex items-center gap-4">
        <label className="font-semibold text-xl mb-2">Chọn ngày:</label>
        <Form.Item name="date">
        <DatePicker
  style={{ width: 300, height: 50 }}
  format="DD/MM/YYYY" 
  value={selectedDate ? moment(selectedDate, "DD/MM/YYYY") : null} 
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
  {vaccinationSchedule && vaccinationSchedule.length > 0 ? (
    vaccinationSchedule.map((vaccine) => (
      <div key={vaccine.vaccineId} className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg max-h-[410px] overflow-hidden">
        <div className="flex flex-col gap-3 bg-[#DDECF9] rounded-2xl !p-4">
          <h3 className="text-[#234060] text-lg font-medium">{vaccine.name}</h3>
          <p className="text-sm text-gray-600">Nguồn gốc: {vaccine.manufacturer}</p>
          <p className="text-sm text-gray-600">Phòng bệnh: {vaccine.description}</p>
          <div className="flex items-center gap-3 text-[#2A388F] mt-6">
            <SellIcon />
            <p className="font-semibold text-2xl">
              {vaccine.price ? `${vaccine.price.toLocaleString("vi-VN")} VNĐ` : "Liên hệ"}
            </p>
          </div>
        </div>
        <button
          className={`cursor-pointer p-4 text-white rounded-lg w-full font-semibold text-lg ${
            selectedVaccines.some((v) => v.vaccineId === vaccine.vaccineId) ? "bg-[#35944A]" : "bg-[#2A388F]"
          }`}
          onClick={() => toggleSelection(vaccine)}
        >
          {selectedVaccines.some((v) => v.vaccineId === vaccine.vaccineId) ? "ĐÃ CHỌN" : "CHỌN"}
        </button>
      </div>
    ))) : ( <div className="flex items-center justify-center text-2xl font-semibold text-red-500">Không có dữ liệu vắc-xin</div>
  ) }
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
              <button className="!mt-5 w-full bg-orange-500 text-white !p-3 rounded-lg" onClick={handleBooking  }>
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
