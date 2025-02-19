import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    birthDate: "",
    city: "",
    district: "",
    street: "",
    height: "",
    weight: "",
    relationship: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Cung Cấp Thông Tin Của Trẻ</h2>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chọn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ tên người tiêm</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tỉnh thành</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chọn</option>
                <option value="TP HCM">TP HCM</option>
                <option value="Hà Nội">Hà Nội</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quận huyện</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chọn</option>
                <option value="Quận 1">Quận 1</option>
                <option value="Quận 2">Quận 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phường xã</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chọn</option>
                <option value="Phường 1">Phường 1</option>
                <option value="Phường 2">Phường 2</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số nhà, tên đường</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Chiều Cao</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cân Nặng</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mối quan hệ với người tiêm</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Hoàn Thành Cập Nhật Thông Tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
