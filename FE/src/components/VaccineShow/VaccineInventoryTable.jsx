import { Table } from "antd";
import { useVaccineinvetoryById } from "../../hooks/useInventory";

const VaccineInventoryTable = ({ vaccineId }) => {
  const { data: inventory, isLoading, isError } = useVaccineinvetoryById(vaccineId);

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError || !inventory) return <p>Không có dữ liệu kho vaccine.</p>;

  const columns = [
    {
      title: "Số hiệu lô",
      dataIndex: "batchNumber",
      key: "batchNumber",
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Số lượng ban đầu",
      dataIndex: "initialQuantity",
      key: "initialQuantity",
    },
    {
      title: "Số hàng trong kho",
      dataIndex: "quantityInStock",
      key: "quantityInStock",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold">Thông Tin Kho Vaccine - {inventory[0]?.name}</h3>
      <Table columns={columns}  dataSource={inventory} rowKey="vaccineInventoryId" pagination={false} />
    </div>
  );
};

export default VaccineInventoryTable;
