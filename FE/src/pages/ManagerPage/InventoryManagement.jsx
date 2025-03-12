import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, DatePicker } from "antd";
import { useVaccine } from "../../hooks/useVaccine";
import VaccineInventoryModal from "../../components/VaccineShow/VaccineInventoryModal";
import { getInventoryByVaccineId, createInventory } from "../../api/VaccineInventory.api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const InventoryManagement = () => {
  const { vaccines, isLoading } = useVaccine();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [vaccineStock, setVaccineStock] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVaccineForAdd, setSelectedVaccineForAdd] = useState(null);
  const [form] = Form.useForm();

  // 🏷️ Lấy dữ liệu tồn kho cho từng vaccine
  useEffect(() => {
    if (!vaccines) return;

    const fetchStockData = async () => {
      const stockData = await Promise.all(
        vaccines.map(async (vaccine) => {
          try {
            const inventoryData = await getInventoryByVaccineId(vaccine.vaccineId);
            const totalStock = inventoryData?.reduce((sum, item) => sum + item.quantityInStock, 0) || 0;
            return { vaccineId: vaccine.vaccineId, totalStock };
          } catch (error) {
            console.error(`Lỗi lấy dữ liệu tồn kho vaccine ID ${vaccine.vaccineId}:`, error);
            return { vaccineId: vaccine.vaccineId, totalStock: 0 };
          }
        })
      );

      const stockMap = stockData.reduce((acc, item) => {
        acc[item.vaccineId] = item.totalStock;
        return acc;
      }, {});

      setVaccineStock(stockMap);
    };

    fetchStockData();
  }, [vaccines]);

  // 📝 Xem chi tiết lô vaccine
  const showDetailModal = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsModalOpen(true);
  };

  const handleDetailCancel = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null);
  };

  // ➕ Mở modal thêm lô vaccine
  const showAddModal = (vaccine) => {
    setSelectedVaccineForAdd(vaccine);
    form.setFieldsValue({
      vaccineId: vaccine.vaccineId,
      batchNumber: "",
      manufacturingDate: null,
      expiryDate: null,
      initialQuantity: 0,
      supplier: "",
    });
    setIsAddModalOpen(true);
  };

  // 🏷️ Đóng modal thêm
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

  // ✅ Thêm vaccine mới
  const handleAddOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const manufacturingDate = dayjs(values.manufacturingDate);
      const expiryDate = dayjs(values.expiryDate);
      const today = dayjs();

      // 🛑 Kiểm tra ngày hợp lệ
      if (manufacturingDate.isBefore(today, "day")) {
        return toast.error("⚠️ Ngày sản xuất không thể trong quá khứ!");
      }
      if (expiryDate.isBefore(manufacturingDate, "day")) {
        return toast.error("⚠️ Ngày hết hạn phải sau ngày sản xuất!");
      }

      const newInventoryData = {
        vaccineId: selectedVaccineForAdd.vaccineId,
        batchNumber: values.batchNumber,
        manufacturingDate: manufacturingDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        initialQuantity: values.initialQuantity,
        supplier: values.supplier,
      };

      await createInventory(newInventoryData);
      toast.success("✅ Thêm lô vaccine thành công!");

      // 🔄 Cập nhật số lượng tồn kho ngay
      setVaccineStock((prev) => ({
        ...prev,
        [selectedVaccineForAdd.vaccineId]:
          (prev[selectedVaccineForAdd.vaccineId] || 0) + newInventoryData.initialQuantity,
      }));

      setIsAddModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi thêm lô vaccine:", error);
      toast.error("⚠️ Không thể thêm lô vaccine. Vui lòng kiểm tra lại!");
    }
  };

  // 📌 Cấu hình cột danh sách vaccine
  const columns = [
    { title: "Tên Vaccine", dataIndex: "name", key: "name" },
    { title: "Nhà Sản Xuất", dataIndex: "manufacturer", key: "manufacturer" },
    {
      title: "Còn hàng",
      key: "stock",
      render: (_, record) => (vaccineStock[record.vaccineId] > 0 ? `${vaccineStock[record.vaccineId]} liều` : "Hết hàng"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showDetailModal(record)}>
            Chi tiết
          </Button>
          <Button type="default" onClick={() => showAddModal(record)}>
            Thêm lô vaccine
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý tồn kho Vaccine</h2>
      <Table columns={columns} pagination={{ pageSize: 8, showSizeChanger: false }} dataSource={vaccines} loading={isLoading} rowKey="vaccineId" />

      {/* ✅ Modal Chi Tiết Kho Vaccine */}
      <VaccineInventoryModal isOpen={isModalOpen} handleClose={handleDetailCancel} selectedVaccine={selectedVaccine} />

      {/* ✅ Modal Thêm Lô Vaccine */}
      <Modal title="Thêm Lô Vaccine" open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="batchNumber" label="Số Hiệu Lô" rules={[{ required: true, message: "Vui lòng nhập số hiệu lô!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="manufacturingDate" label="Ngày Sản Xuất" rules={[{ required: true, message: "Vui lòng chọn ngày sản xuất!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ngày Hết Hạn" rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="initialQuantity" label="Số Lượng Ban Đầu" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="supplier" label="Nhà Cung Cấp" rules={[{ required: true, message: "Vui lòng nhập nhà cung cấp!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagement;
