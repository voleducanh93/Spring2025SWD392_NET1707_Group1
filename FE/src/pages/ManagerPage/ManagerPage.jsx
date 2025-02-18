import React from 'react';
import StaffManagement from './StaffManagement';
import DoctorManagement from './DoctorManagement';
import VaccineSchedule from './VaccineSchedule';
import VaccineManagement from './VaccineManagement';

const ManagerPage = () => {
  return (
    <div>
      <h1>Trang Quản Lý</h1>
      <div>
        <StaffManagement />
        <DoctorManagement />
        <VaccineSchedule />
        <VaccineManagement />
      </div>
    </div>
  );
};

export default ManagerPage;
