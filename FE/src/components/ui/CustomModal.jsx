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
import { useState } from "react";
import dayjs from "dayjs";


const CustomModal = ({
  visible,
  onClose,
  onSubmit,
  formFields,
  form,
  setSelectedFile,
}) => {
  const role = useWatch("role", form); // Theo dõi giá trị vai trò
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("🔍 field:",   formFields);

  // Xử lý chọn file upload
  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
  };

  // Xử lý khi nhấn OK
  const handleOk = async () => {
    try {
      await form.validateFields();
      setIsSubmitting(true);
  
      const success = await onSubmit(form.getFieldsValue());
      console.log(success); // ✅ giờ sẽ là true/false đúng
  
      if (success) {
        form.resetFields();
        onClose();
      }
  
      return success; // ✅ TRẢ VỀ GIÁ TRỊ
    } catch (error) {
      console.error("❌ Validate lỗi hoặc onSubmit lỗi:", error);
      return false; // ✅ TRẢ VỀ FALSE KHI LỖI
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Modal
      title="Thông tin"
      open={visible}
      width={800}
      maskClosable={false} // ❌ Không cho click bên ngoài để đóng
      keyboard={false} // ❌ Không cho ESC đóng
      confirmLoading={isSubmitting}
      onCancel={() => {
        // ✅ Kiểm tra nếu form có lỗi thì không đóng
        const hasErrors = form
          .getFieldsError()
          .some((field) => field.errors.length > 0);
        if (hasErrors) return;

        onClose(); // ✅ Chỉ cho đóng nếu không lỗi
      }}
      footer={[
        <Button
          key="close"
          onClick={() => {
            const hasErrors = form
              .getFieldsError()
              .some((field) => field.errors.length > 0);
            if (hasErrors) return;
            onClose();
          }}
          disabled={isSubmitting} // Không cho click Close khi đang submit
        >
          Close
        </Button>,
        <Button
          key="ok"
          type="primary"
          loading={isSubmitting}
          onClick={handleOk}
        >
          {" "}
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
                  key={field.name}
                >
                  {field.type === "password" ? (
                    <Input.Password />
                  ) : field.type === "date" ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      disabledDate={(current) => current && current > dayjs().endOf("day")}
                      inputReadOnly
                    />
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
    getFieldsError: PropTypes.func.isRequired,
  }).isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default CustomModal;
