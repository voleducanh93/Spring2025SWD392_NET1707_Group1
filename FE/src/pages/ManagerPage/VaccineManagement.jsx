import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, notification } from 'antd';
import { useVaccine } from '../../hooks/useVaccine'; // Sử dụng hook lấy dữ liệu vaccine

const VaccineManagement = () => {
  const { vaccines, isLoading, addVaccine, editVaccine, removeVaccine } = useVaccine();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [form] = Form.useForm();

  // Mở modal chi tiết vaccine
  const showDetailModal = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsDetailModalOpen(true);
  };

  // Đóng modal chi tiết
  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
    setSelectedVaccine(null);
  };

  // Mở modal thêm/sửa vaccine
  const showModal = (record = null) => {
    setIsDetailModalOpen(false);
    setEditingVaccine(record);
    form.setFieldsValue(record || {
      name: '',
      description: '',
      manufacturer: '',
      sideEffect: '',
      diseasePrevented: '',
      price: 0,
      status: true,
      isNecessary: true,
      image: '',
      injectionSite: '',
      notes: '',
      vaccineInteractions: '',
      undesirableEffects: '',
      preserve: '',
      injectionsCount: 0
    });
    setIsModalOpen(true);
  };

  // Xóa vaccine
  const handleDelete = (vaccineId) => {
    setIsDetailModalOpen(false);
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa vaccine này?',
      onOk: () => {
        // Gọi hàm xóa vaccine bằng `vaccineId`
        removeVaccine.mutate(vaccineId);
        notification.success({ message: 'Vaccine đã được xóa thành công!' });
      }
    });
  };

  // Thêm hoặc cập nhật vaccine
  const handleOk = () => {
    form.validateFields().then((values) => {
      const vaccineData = {
        ...values,
        price: parseFloat(values.price),
        status: true, // Chắc chắn vaccine mới sẽ có status = true
        isNecessary: true, // Cần tiêm nhiều mũi mặc định là true
      };

      if (editingVaccine) {
        // Cập nhật vaccine
        const vaccineId = editingVaccine.vaccineId;
        console.log(vaccineId);
        
        editVaccine.mutate({ id: vaccineId, data: vaccineData });
        notification.success({ message: 'Vaccine đã được cập nhật thành công!' });
      } else {
        // Thêm vaccine mới
        addVaccine.mutate(vaccineData);
        notification.success({ message: 'Vaccine đã được thêm thành công!' });
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // Cấu hình cột cho bảng
  const columns = [
    { title: 'Tên Vaccine', dataIndex: 'name', key: 'name' },
    { title: 'Mô Tả', dataIndex: 'description', key: 'description' },
    { title: 'Nhà Sản Xuất', dataIndex: 'manufacturer', key: 'manufacturer' },
    { title: 'Tác Dụng Phụ', dataIndex: 'sideEffect', key: 'sideEffect' },
    { title: 'Bệnh Phòng Tránh', dataIndex: 'diseasePrevented', key: 'diseasePrevented' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (text) => `${text.toLocaleString()} VND` },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.vaccineId)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý Vaccine</h2>
      <Button type="primary" onClick={() => showModal()} className="mb-3">
        Thêm Vaccine
      </Button>
      <Table columns={columns} dataSource={vaccines} loading={isLoading} rowKey="scheduleId" onRow={(record) => ({
        onClick: () => showDetailModal(record),
      })} />

      {/* Modal chi tiết vaccine */}
      <Modal
        title="Chi Tiết Vaccine"
        visible={isDetailModalOpen}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="back" onClick={handleDetailCancel}>
            Đóng
          </Button>,
        ]}
      >
        {selectedVaccine && (
          <div>
            <p><strong>Tên Vaccine:</strong> {selectedVaccine.name}</p>
            <p><strong>Mô Tả:</strong> {selectedVaccine.description}</p>
            <p><strong>Nhà Sản Xuất:</strong> {selectedVaccine.manufacturer}</p>
            <p><strong>Tác Dụng Phụ:</strong> {selectedVaccine.sideEffect}</p>
            <p><strong>Bệnh Phòng Tránh:</strong> {selectedVaccine.diseasePrevented}</p>
            <p><strong>Giá:</strong> {selectedVaccine.price.toLocaleString()} VND</p>
            <p><strong>Trạng Thái:</strong> {selectedVaccine.status ? 'Hoạt động' : 'Không hoạt động'}</p>
            <p><strong>Cần Tiêm Nhiều Mũi:</strong> {selectedVaccine.isNecessary ? 'Có' : 'Không'}</p>
            <p><strong>Vị Trí Tiêm:</strong> {selectedVaccine.injectionSite}</p>
            <p><strong>Ghi Chú:</strong> {selectedVaccine.notes}</p>
            <p><strong>Phản Ứng Không Mong Muốn:</strong> {selectedVaccine.undesirableEffects}</p>
            <p><strong>Cách Bảo Quản:</strong> {selectedVaccine.preserve}</p>
            <p><strong>Số Mũi Tiêm:</strong> {selectedVaccine.injectionsCount}</p>
            <img src={`/path_to_images/${selectedVaccine.image}`} alt="Vaccine" style={{ width: '100px' }} />
          </div>
        )}
      </Modal>

      {/* Modal thêm/sửa vaccine */}
      <Modal
        title={editingVaccine ? 'Cập nhật vaccine' : 'Thêm vaccine'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên Vaccine" rules={[{ required: true, message: 'Vui lòng nhập tên vaccine!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="manufacturer" label="Nhà Sản Xuất" rules={[{ required: true, message: 'Vui lòng nhập nhà sản xuất!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="sideEffect" label="Tác Dụng Phụ" rules={[{ required: true, message: 'Vui lòng nhập tác dụng phụ!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="diseasePrevented" label="Bệnh Phòng Tránh" rules={[{ required: true, message: 'Vui lòng nhập bệnh phòng tránh!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="image" label="Hình Ảnh">
            <Input />
          </Form.Item>

          <Form.Item name="injectionSite" label="Vị Trí Tiêm">
            <Input />
          </Form.Item>

          <Form.Item name="notes" label="Ghi Chú">
            <Input />
          </Form.Item>

          <Form.Item name="vaccineInteractions" label="Tương Tác Vắc-xin">
            <Input />
          </Form.Item>

          <Form.Item name="undesirableEffects" label="Phản Ứng Không Mong Muốn">
            <Input />
          </Form.Item>

          <Form.Item name="preserve" label="Bảo Quản">
            <Input />
          </Form.Item>

          <Form.Item name="injectionsCount" label="Số Mũi Tiêm">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VaccineManagement;
``
