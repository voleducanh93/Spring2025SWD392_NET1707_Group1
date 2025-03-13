import { useState } from "react";
import DoctorList from "./DoctorList";
import VaccinationRecord from "./VaccinationRecord";

const VaccinationHandler = () => {
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleProceedVaccination = (childId, booking) => {
    setSelectedChildId(childId);
    setSelectedBooking(booking);
  };

  const handleBackToList = () => {
    setSelectedChildId(null);
    setSelectedBooking(null);
  };

  return (
    <div>
      {!selectedChildId ? (
        <DoctorList onProceedVaccination={handleProceedVaccination} />
      ) : (
        <VaccinationRecord childId={selectedChildId} booking={selectedBooking} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default VaccinationHandler;
