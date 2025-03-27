import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useWatch } from "antd/es/form/Form";

const CustomModal = ({
  visible,
  onClose,
  onSubmit,
  formFields,
  form,
  setSelectedFile,
}) => {
  const role = useWatch("role", form); // Theo dõi giá trị vai trò

  // Xử lý chọn file upload
  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
  };

  // Xử lý khi nhấn OK
  const handleOk = async () => {
    try {
      await form.validateFields();
      onSubmit(form.getFieldsValue());
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
    }
  };

  return (
    <Modal
      title="Thông tin"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          {formFields.map((field, index) => {
            // Bỏ qua field upload để xử lý riêng
            if (field.type === "file") return null;

            return (
              <Col span={12} key={index} style={{ marginBottom: "16px" }}>
                <Form.Item
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                >
                  {field.type === "password" ? (
                    <Input.Password />
                  ) : field.type === "date" ? (
                    <DatePicker style={{ width: "100%" }} />
                  ) : field.type === "select" ? (
                    <Select placeholder={`Chọn ${field.label}`}>
                      {field.options.map((option) => (
                        <Select.Option key={option} value={option}>
                          {typeof option === "boolean"
                            ? option
                              ? "✅ Hoạt động"
                              : "⛔ Bị khóa"
                            : option}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    <Input type={field.type || "text"} />
                  )}
                </Form.Item>
              </Col>
            );
          })}

          {/* ✅ Trường Upload chỉ hiển thị nếu role là Doctor */}
          {role === "Doctor" && (
            <Col span={12} style={{ marginBottom: "16px" }}>
              <Form.Item
                name="imageUpload"
                label="Ảnh bác sĩ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng tải ảnh lên!",
                  },
                ]}
              >
                <Upload
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  maxCount={1}
                  showUploadList={true}
                >
                  <Button icon={<UploadOutlined />}>Chọn File</Button>
                </Upload>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldsValue: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default CustomModal;
