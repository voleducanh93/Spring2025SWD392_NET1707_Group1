import React, { useState } from "react";

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
  "Cúm": [
    {
      label: "Cúm mùa",
      children: ["VẮC XIN CÚM TỨ GIÁ VAXIGRIP TETRA", "VẮC XIN CÚM TỨ GIÁ INFLUVAC TETRA"]
    },
    {
      label: "Cúm người lớn",
      children: ["VẮC XIN IVACFLU-S 0,5ML (VIỆT NAM)"]
    }
  ]
};

const BookingPage = () => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [filter, setFilter] = useState("Tất cả");

  const toggleSelection = (vaccine) => {
    setSelectedVaccines((prev) => {
      if (prev.some((v) => v.id === vaccine.id)) {
        return prev.filter((v) => v.id !== vaccine.id);
      } else {
        return [...prev, vaccine];
      }
    });
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* Filter Dropdown */}
      <div className="flex items-center gap-2 relative">
        <label className="font-bold">Hiển thị theo</label>
        <div className="relative">
          <select
            className="border p-2 rounded-md cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {Object.keys(filterOptions).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {filter !== "Tất cả" && (
            <div className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10">
              {filterOptions[filter].map((group, index) => (
                <div key={index} className="p-2">
                  <strong>{group.label}</strong>
                  {group.children.map((item, idx) => (
                    <div key={idx} className="p-1 hover:bg-gray-200 cursor-pointer">{item}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Vaccine List */}
        <div className="w-2/3 grid grid-cols-3 gap-4">
          {vaccines
            .filter((vaccine) =>
              filter === "Tất cả" ||
              filterOptions[filter].some((group) => group.children.includes(vaccine.name))
            )
            .map((vaccine) => (
              <div key={vaccine.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="font-bold">{vaccine.name}</h3>
                <p className="text-sm text-gray-500">Nguồn gốc: {vaccine.origin}</p>
                <p className="text-blue-600 font-bold">{vaccine.price.toLocaleString()} VNĐ</p>
                <p className="text-gray-600">Phòng bệnh: {vaccine.disease}</p>
                <button
                  className={`mt-2 px-4 py-2 text-white rounded-lg w-full ${
                    selectedVaccines.some((v) => v.id === vaccine.id)
                      ? "bg-green-500"
                      : "bg-blue-600"
                  }`}
                  onClick={() => toggleSelection(vaccine)}
                >
                  {selectedVaccines.some((v) => v.id === vaccine.id) ? "ĐÃ CHỌN" : "CHỌN"}
                </button>
              </div>
            ))}
        </div>

        {/* Selected Vaccines List */}
        <div className="w-1/3 p-4 border rounded-lg shadow-md">
          <h2 className="font-bold text-xl">DANH SÁCH VẮC XIN CHỌN MUA</h2>
          {selectedVaccines.length > 0 ? (
            <div>
              {selectedVaccines.map((vaccine) => (
                <div key={vaccine.id} className="mt-2 p-2 border rounded-lg">
                  <h4 className="font-bold">{vaccine.name}</h4>
                  <p className="text-sm">Phòng bệnh: {vaccine.disease}</p>
                  <p className="font-bold text-blue-600">{vaccine.price.toLocaleString()} VNĐ</p>
                </div>
              ))}
              <button className="mt-4 w-full bg-orange-500 text-white p-2 rounded-lg">
                ĐĂNG KÝ MŨI TIÊM
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Chưa có vắc xin nào được chọn.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;