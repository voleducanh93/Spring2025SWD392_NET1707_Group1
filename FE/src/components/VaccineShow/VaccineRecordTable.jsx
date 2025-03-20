import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "antd";
import { useVaccineRecordByBooking } from "../../hooks/useVaccineRecord";
import { components } from "../../pages/ManagerPage/ComboManagement";

const statusMapping = {
  1: "Pending",
  2: "Completed",
  3: "Cancelled",
};

const VaccineRecordTable = ({ bookingId, isVisible, onClose }) => {
  const { data, isLoading } = useVaccineRecordByBooking(bookingId);
  const [vaccineRecords, setVaccineRecords] = useState([]);

  useEffect(() => {
    if (data) {
      setVaccineRecords(data.vaccineRecords || []);
    }
  }, [data]);

  const columns = [
    { title: "Mã lô", dataIndex: "batchNumber", key: "batchNumber" },
    { title: "Liều lượng", dataIndex: "doseAmount", key: "doseAmount" },
    { title: "Ngày tiêm kế tiếp", dataIndex: "nextDoseDate", key: "nextDoseDate" },
    { title: "Ghi chú", dataIndex: "notes", key: "notes" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => statusMapping[status] || status,
    },
    { title: "Vaccine", dataIndex: "vaccineName", key: "vaccineName" },
  ];

  return (
    <Modal
      title="Lịch Sử Tiêm Chủng"
      open={isVisible}
      
      onCancel={() => {
        console.log("Modal đang đóng..."); // Debug
        onClose();
      }}
      footer={null}
      width={1000}
      maskClosable={true} // ✅ Cho phép click ngoài modal để đóng
  closable={true}
    >
      <Table columns={columns} components={components} dataSource={vaccineRecords} loading={isLoading} rowKey="vaccinationRecordId" />
    </Modal>
  );
};

VaccineRecordTable.propTypes = {
  bookingId: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VaccineRecordTable;
