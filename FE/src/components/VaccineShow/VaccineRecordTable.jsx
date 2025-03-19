import { useEffect, useState } from "react";
import PropTypes from "prop-types";


import CustomTable from "../ui/tableCustom";
import { useVaccineRecordByBooking } from "../../hooks/useVaccineRecord";

const statusMapping = {
  1: "Pending",
  2: "Completed",
  3: "Cancelled",
};

const VaccineRecordTable = ({ bookingId }) => {
  const { data, isLoading } = useVaccineRecordByBooking(bookingId);
  const [vaccineRecords, setVaccineRecords] = useState([]);

  useEffect(() => {
    if (data) {
      setVaccineRecords(data.vaccineRecords || []);
    }
  }, [data]);

  const columns = [
    {
      title: "Mã lô",
      dataIndex: "batchNumber",
      key: "batchNumber",
    },
    {
      title: "Liều lượng",
      dataIndex: "doseAmount",
      key: "doseAmount",
    },
    {
      title: "Ngày tiêm kế tiếp",
      dataIndex: "nextDoseDate",
      key: "nextDoseDate",
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
    },
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
      render: (status) => statusMapping[status] || status, // Dùng statusMapping nếu có
    },
    {
      title: "Vaccine",
      dataIndex: "vaccineName",
      key: "vaccineName",
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={vaccineRecords}
      loading={isLoading}
      rowKey="vaccinationRecordId"
    />
  );
};

VaccineRecordTable.propTypes = {
  bookingId: PropTypes.number.isRequired,
};

export default VaccineRecordTable;
