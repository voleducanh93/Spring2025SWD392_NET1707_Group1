import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Row,
  Col,
  Upload,
  Popconfirm,
} from "antd";
import { useVaccine } from "../../hooks/useVaccine"; // Sử dụng hook lấy dữ liệu vaccine
import { UploadOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { uploadFile } from "../../config/firebase";
import VaccineDetailModal from "../../components/VaccineShow/VaccineDetailModal";
import { components } from "./ComboManagement";
const VaccineManagement = () => {
  const { vaccines, isLoading, addVaccine, editVaccine, removeVaccine } =
    useVaccine();
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

  const showModal = (record = null) => {
    setSelectedVaccine(null);

    setEditingVaccine(record);
    form.setFieldsValue(
      record || {
        name: "",
        description: "",
        manufacturer: "",
        sideEffect: "",
        diseasePrevented: "",
        price: 0,
        status: true,
        isNecessary: true,
        image: "",
        injectionSite: "",
        notes: "",
        vaccineInteractions: "",
        undesirableEffects: "",
        preserve: "",
        injectionsCount: 0,
      }
    );

    setIsModalOpen(true);
  };

  // Xóa vaccine
  const handleDelete = (vaccineId) => {
    console.log(vaccineId);

    removeVaccine.mutate(vaccineId);
  };

  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
    console.log(selectedFile);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      console.log(selectedFile);

      let url = "";
      if (selectedFile) {
        url = await uploadFile(selectedFile);
        console.log("Uploaded Image URL:", url);
      }

      const vaccineData = {
        ...form.getFieldsValue(),
        image: url,
        price: parseFloat(form.getFieldValue("price")),
        status: true,
        isNecessary: true,
      };

      if (editingVaccine) {
        const vaccineId = editingVaccine.vaccineId;
        editVaccine.mutate(
          { id: vaccineId, data: vaccineData },
          {
            onSuccess: () => {
              toast.success("Vaccine updated successfully!");
            },
            onError: (error) => {
              toast.error(`Error updating vaccine: ${error.message}`);
            },
          }
        );
      } else {
        // If adding new vaccine, create it
        addVaccine.mutate(vaccineData, {
          onSuccess: () => {
            toast.success("Vaccine added successfully!");
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
    { title: "Tên Vaccine", dataIndex: "name", key: "name" },
    { title: "Mô Tả", dataIndex: "description", key: "description" },
    { title: "Nhà Sản Xuất", dataIndex: "manufacturer", key: "manufacturer" },
    { title: "Tác Dụng Phụ", dataIndex: "sideEffect", key: "sideEffect" },
    {
      title: "Bệnh Phòng Tránh",
      dataIndex: "diseasePrevented",
      key: "diseasePrevented",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => showDetailModal(record)}
            className="border border-green-500 text-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition flex items-center gap-1"
          >
            🔍 chi tiết
          </Button>
          <Button
            onClick={() => showModal(record)}
            className="border border-green-500 text-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition flex items-center gap-1"
          >
            📝 Chỉnh sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa vaccine này?"
            onConfirm={() => handleDelete(record.vaccineId)}
            okText="Có"
            cancelText="Không"
          >
            <Button className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition flex items-center gap-1">
              🗑️ Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Tiêu đề & nút thêm */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quản Lý Vaccine</h1>
        <Button
          type="primary"
          onClick={() => showModal()}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          ➕ Thêm Vaccine
        </Button>
      </div>
      <Table
        columns={columns}
        components={components}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        dataSource={vaccines}
        loading={isLoading}
        rowKey="scheduleId"
        onRow={() => ({})}
      />

      {/* Modal thêm/sửa vaccine */}
      <Modal
        title={editingVaccine ? "Cập nhật vaccine" : "Thêm vaccine"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        height={1100}
        width={1300} // Tăng độ rộng modal
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            {/* Cột 1 */}
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên Vaccine"
                rules={[
                  { required: true, message: "Vui lòng nhập tên vaccine!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô Tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              >
                <Input.TextArea rows={3} maxLength={500} />
              </Form.Item>

              <Form.Item
                name="manufacturer"
                label="Nhà Sản Xuất"
                rules={[
                  { required: true, message: "Vui lòng nhập nhà sản xuất!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="sideEffect"
                label="Tác Dụng Phụ"
                rules={[
                  { required: true, message: "Vui lòng nhập tác dụng phụ!" },
                ]}
              >
                <Input.TextArea rows={2} maxLength={300} />
              </Form.Item>

              <Form.Item
                name="diseasePrevented"
                label="Bệnh Phòng Tránh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập bệnh phòng tránh!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá"
                rules={[
                  { required: true, message: "Vui lòng nhập giá!" },
                  () => ({
                    validator(_, value) {
                      if (!value || parseFloat(value) > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("⚠️ Giá phải lớn hơn 0!")
                      );
                    },
                  }),
                ]}
              >
                <Input type="number" min="1" />
              </Form.Item>
            </Col>

            {/* Cột 2 */}
            <Col span={12}>
              {/* Số mũi tiêm - Không cho phép nhập số âm hoặc 0 */}
              <Form.Item
                name="injectionsCount"
                label="Số Mũi Tiêm"
                rules={[
                  { required: true, message: "⚠️ Vui lòng nhập số mũi tiêm!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || parseInt(value) > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("⚠️ Số mũi tiêm phải lớn hơn 0!")
                      );
                    },
                  }),
                ]}
              >
                <Input type="number" min="1" />
              </Form.Item>

              {/* Vị trí tiêm */}
              <Form.Item
                name="injectionSite"
                label="Vị Trí Tiêm"
                rules={[
                  { required: true, message: "⚠️ Vui lòng nhập vị trí tiêm!" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Ghi chú */}
              <Form.Item
                name="notes"
                label="Ghi Chú"
                rules={[
                  { required: true, message: "⚠️ Vui lòng nhập ghi chú!" },
                ]}
              >
                <Input.TextArea rows={3} maxLength={500} />
              </Form.Item>

              {/* Tương tác với vắc-xin khác */}
              <Form.Item
                name="vaccineInteractions"
                label="Tương Tác Vắc-xin"
                rules={[
                  { required: true, message: "⚠️ Vui lòng nhập thông tin!" },
                ]}
              >
                <Input.TextArea rows={2} maxLength={300} />
              </Form.Item>

              {/* Phản ứng không mong muốn */}
              <Form.Item
                name="undesirableEffects"
                label="Phản Ứng Không Mong Muốn"
                rules={[
                  { required: true, message: "⚠️ Vui lòng nhập thông tin!" },
                ]}
              >
                <Input.TextArea rows={2} maxLength={300} />
              </Form.Item>

              {/* Cách bảo quản */}
              <Form.Item
                name="preserve"
                label="Bảo Quản"
                rules={[
                  {
                    required: true,
                    message: "⚠️ Vui lòng nhập cách bảo quản!",
                  },
                ]}
              >
                <Input.TextArea rows={2} maxLength={300} />
              </Form.Item>

              {/* Upload hình ảnh */}
              <Form.Item label="Upload Image">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  maxCount={1}
                  showUploadList={true}
                >
                  <Button icon={<UploadOutlined />}>Chọn Tệp</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <VaccineDetailModal
        isOpen={isDetailModalOpen}
        handleClose={handleDetailCancel}
        selectedVaccine={selectedVaccine}
      />
    </div>
  );
};

export default VaccineManagement;
