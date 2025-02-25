import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { useChildren } from "../../hooks/useChildren";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/booking/bookingSlice";
import { notification } from "antd";
const vaccines = [
  {
    id: 1,
    name: "VẮC XIN CÚM TỨ GIÁ VAXIGRIP TETRA",
    origin: "Sanofi (Pháp)",
    price: 356000,
    disease: "Cúm",
  },
  {
    id: 2,
    name: "VẮC XIN CÚM TỨ GIÁ INFLUVAC TETRA",
    origin: "Abbott (Hà Lan)",
    price: 356000,
    disease: "Cúm",
  },
  {
    id: 3,
    name: "VẮC XIN IVACFLU-S 0,5ML (VIỆT NAM)",
    origin: "IVAC (Việt Nam)",
    price: 315000,
    disease: "Cúm (người lớn > 18 tuổi)",
  },
];

const filterOptions = {
  "Tất cả": [],
  Cúm: [
    {
      label: "Cúm mùa",
      children: [
        "VẮC XIN CÚM TỨ GIÁ VAXIGRIP TETRA",
        "VẮC XIN CÚM TỨ GIÁ INFLUVAC TETRA",
      ],
    },
    {
      label: "Cúm người lớn",
      children: ["VẮC XIN IVACFLU-S 0,5ML (VIỆT NAM)"],
    },
  ],
};

const BookingPage = () => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [filter, setFilter] = useState("Tất cả");
  const { vaccines: children, isLoading, isError } = useChildren();
  const [selectedChild, setSelectedChild] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.booking);


  const handleChangeChild = (e) => {
    setSelectedChild(e.target.value);
  };
  const toggleSelection = (vaccine) => {
    setSelectedVaccines((prev) => {
      if (prev.some((v) => v.id === vaccine.id)) {
        return prev.filter((v) => v.id !== vaccine.id);
      } else {
        return [...prev, vaccine];
      }
    });
  };
  // Dữ liệu mẫu
  const sampleBookingData = {
    childId: 1,
    bookingDate: "2025-09-28T18:05:24.111Z",
    notes: "This is a note for the booking",
    bookingDetails: [
      {
        vaccineId: 4, // Vaccine ID mẫu
      },
    ],
  };

  const handle = () => {
    // Gửi async action để tạo booking
    dispatch(createBooking(sampleBookingData)) // Gửi data mẫu
      .unwrap() // unwrap sẽ trả về response nếu thành công hoặc lỗi nếu thất bại
      .then(() => {
        console.log("Booking created successfully!")
      })
      .catch((error) => {
        console.error("Failed to create booking: ", error);
      });
  };

  return (
    <div className="flex flex-col md:px-20 sm:px-8 !px-4 !py-6 gap-6">
      <div className="flex gap-6 items-center flex-wrap">
        <div className="flex items-center gap-3 bg-[#FBA307] !p-4 rounded-xl text-amber-50 font-bold">
          <MenuIcon />
          <button>Danh mục</button>
        </div>
        <h1 className="text-[#2A389C] text-2xl font-bold">
          THÔNG TIN SẢN PHẨM VẮC XIN
        </h1>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-6 relative flex-wrap mt-6">
        <label className="font-semibold text-lg">Chọn trẻ:</label>
        <select
          className="border border-gray-300 p-3 rounded-md cursor-pointer sm:w-52"
          value={selectedChild}
          onChange={handleChangeChild}
          disabled={isLoading || isError}
        >
          <option value="">-- Chọn trẻ --</option>
          {isLoading ? (
            <option disabled>Đang tải danh sách...</option>
          ) : isError ? (
            <option disabled>Lỗi khi tải dữ liệu</option>
          ) : (
            children?.map((child) => (
              <option key={child.id} value={child.id}>
                {child.fullName}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Vaccine List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {vaccines
            .filter(
              (vaccine) =>
                filter === "Tất cả" ||
                filterOptions[filter].some((group) =>
                  group.children.includes(vaccine.name)
                )
            )
            .map((vaccine) => (
              <div
                key={vaccine.id}
                className="flex flex-col gap-6 !p-5 rounded-2xl shadow-lg max-h-[410px] overflow-hidden"
              >
                <div className="flex flex-col gap-3 bg-[#DDECF9] rounded-2xl !p-4">
                  <h3 className="text-[#234060] text-lg font-medium">
                    {vaccine.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Nguồn gốc: {vaccine.origin}
                  </p>
                  <div className="flex items-center gap-3 text-[#2A388F] !mt-6">
                    <SellIcon />
                    <p className="font-semibold text-2xl">
                      {vaccine.price.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>

                <div className="!p-4">
                  <p className="text-gray-600">Phòng bệnh:</p>
                  <p className="text-gray-600">{vaccine.disease}</p>
                </div>

                <div className="">
                  <button
                    className={`cursor-pointer !p-4 text-white rounded-lg w-full font-semibold text-lg ${
                      selectedVaccines.some((v) => v.id === vaccine.id)
                        ? "bg-[#35944A]"
                        : "bg-[#2A388F]"
                    }`}
                    onClick={() => handle()}
                  >
                    {selectedVaccines.some((v) => v.id === vaccine.id) ? (
                      <div className="flex justify-between">
                        ĐÃ CHỌN <DoneIcon />
                      </div>
                    ) : (
                      "CHỌN"
                    )}
                  </button>
                </div>
              </div>
            ))}
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
                    <h4 className="font-semibold">{vaccine.name}</h4>
                    <p className="text-sm">Phòng bệnh: {vaccine.disease}</p>
                    <p className="font-semibold text-blue-600">
                      {vaccine.price.toLocaleString()} VNĐ
                    </p>
                  </div>
                ))}
                <button className="!mt-5 w-full bg-orange-500 text-white !p-3 rounded-lg">
                  ĐĂNG KÝ MŨI TIÊM
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có vắc xin nào được chọn.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
