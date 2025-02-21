import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, notification, Row, Col, Upload } from 'antd';
import { useVaccine } from '../../hooks/useVaccine'; // Sử dụng hook lấy dữ liệu vaccine
import { UploadOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { uploadFile } from '../../config/firebase';

const VaccineManagement = () => {
  const { vaccines, isLoading, addVaccine, editVaccine, removeVaccine } = useVaccine();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  
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

  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
    console.log(selectedFile);
     // Lưu file khi chọn
  };
  // Thêm hoặc cập nhật vaccine
 const handleOk = async () => {
  try {
    // Validate form fields
    await form.validateFields();
    console.log(selectedFile);

    // Ensure file is uploaded and get the URL
    let url = '';
    if (selectedFile) {
      url = await uploadFile(selectedFile);  // Wait for the file to upload and get the URL
      console.log("Uploaded Image URL:", url);
    }

    // Prepare the vaccine data
    const vaccineData = {
      ...form.getFieldsValue(),
      image: url,  // Store the uploaded image URL
      price: parseFloat(form.getFieldValue('price')),
      status: true,  // Default status is active
      isNecessary: true,  // Default to necessary for multiple injections
    };

    // If editing existing vaccine, update it
    if (editingVaccine) {
      const vaccineId = editingVaccine.vaccineId;
      editVaccine.mutate({ id: vaccineId, data: vaccineData }, {
        onSuccess: () => {
          toast.success('Vaccine updated successfully!');
        },
        onError: (error) => {
          toast.error(`Error updating vaccine: ${error.message}`);
        },
      });
    } else {
      // If adding new vaccine, create it
      addVaccine.mutate(vaccineData, {
        onSuccess: () => {
          toast.success('Vaccine added successfully!');
        },
        onError: (error) => {
          toast.error(`Error adding vaccine: ${error.message}`);
        },
      });
    }

    // Close modal and reset form
    setIsModalOpen(false);
    form.resetFields();
  } catch (error) {
    console.error("Error during file upload or form validation:", error);
    toast.error("Error during file upload or form validation.");
  }
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
      title={editingVaccine ? "Cập nhật vaccine" : "Thêm vaccine"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      width={800} // Tăng độ rộng modal
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          {/* Cột 1 */}
          <Col span={12}>
            <Form.Item name="name" label="Tên Vaccine" rules={[{ required: true, message: "Vui lòng nhập tên vaccine!" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="manufacturer" label="Nhà Sản Xuất" rules={[{ required: true, message: "Vui lòng nhập nhà sản xuất!" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="sideEffect" label="Tác Dụng Phụ" rules={[{ required: true, message: "Vui lòng nhập tác dụng phụ!" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="diseasePrevented" label="Bệnh Phòng Tránh" rules={[{ required: true, message: "Vui lòng nhập bệnh phòng tránh!" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* Cột 2 */}
          <Col span={12}>
          <Form.Item name="injectionsCount" label="Số Mũi Tiêm">
              <Input type="number" />
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
            <Form.Item label="Upload Image">
        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} showUploadList={true}>
          <Button icon={<UploadOutlined />} >
            Select File
          </Button>
        </Upload>
      </Form.Item>
            
          </Col>
        </Row>
      </Form>
    </Modal>
    </div>
  );
};

export default VaccineManagement;
``
