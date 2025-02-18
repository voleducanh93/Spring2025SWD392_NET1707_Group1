import React from 'react';
import StaffManagement from './StaffManagement';
import DoctorManagement from './DoctorManagement';
import VaccineInventoryManagement from './VaccineInventoryManagement';
import VaccineManagement from './VaccineManagement';

const ManagerPage = () => {
  return (
    <div>
      <h1>Trang Quản Lý</h1>
      <div>
        <StaffManagement />
        <DoctorManagement />
        <VaccineInventoryManagement />
        <VaccineManagement />
      </div>
    </div>
  );
};

export default ManagerPage;
