import  { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import { useVaccineSchedule } from "../../hooks/useVaccineSchedule";

const VaccineByAge = () => {
  const { vaccines, isLoading, addVaccine, editVaccine, removeVaccine } = useVaccineSchedule();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [form] = Form.useForm();

  // Mở modal thêm/sửa vaccine
  const showModal = (record = null) => {
    setEditingVaccine(record);
    form.setFieldsValue(record || { ageRangeStart: "", ageRangeEnd: "", recommendedDose: "", notes: "" });
    setIsModalOpen(true);
  };

  // Xóa vaccine
  const handleDelete = (id) => {
    removeVaccine.mutate(id);
  };

  // Thêm hoặc cập nhật vaccine
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingVaccine) {
        editVaccine.mutate({ id: editingVaccine.scheduleId, data: values });
      } else {
        addVaccine.mutate(values);
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "scheduleId",
      key: "scheduleId",
    },
    {
      title: "Tuổi Bắt Đầu",
      dataIndex: "ageRangeStart",
      key: "ageRangeStart",
    },
    {
      title: "Tuổi Kết Thúc",
      dataIndex: "ageRangeEnd",
      key: "ageRangeEnd",
    },
    {
      title: "Liều Lượng",
      dataIndex: "recommendedDose",
      key: "recommendedDose",
    },
    {
      title: "Ghi Chú",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.scheduleId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Button type="primary" onClick={() => showModal()} className="mb-3">
        Thêm Vaccine
      </Button>
      <Table columns={columns} dataSource={vaccines} loading={isLoading} rowKey="scheduleId" />

      {/* Modal thêm/sửa vaccine */}
      <Modal title={editingVaccine ? "Cập nhật vaccine" : "Thêm vaccine"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="ageRangeStart" label="Tuổi Bắt Đầu" rules={[{ required: true, message: "Vui lòng nhập tuổi bắt đầu!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="ageRangeEnd" label="Tuổi Kết Thúc" rules={[{ required: true, message: "Vui lòng nhập tuổi kết thúc!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="recommendedDose" label="Liều Lượng" rules={[{ required: true, message: "Vui lòng nhập liều lượng!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="notes" label="Ghi Chú">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VaccineByAge;
