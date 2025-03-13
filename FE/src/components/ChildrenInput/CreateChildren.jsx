import { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Upload, Checkbox } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { uploadFile } from "../../config/firebase"; 
import moment from "moment";

const { Option } = Select;

const AddChildModal = ({ visible, onClose, onAddChild }) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  
  const handleFileChange = ({ file }) => {
    setSelectedFile(file); 
    console.log("📂 File Selected:", file);
  };


  const handleOk = async () => {
    try {
        const values = await form.validateFields();

        if (!selectedFile) {
            toast.error("Please upload an image!");
            return;
        }

        const formData = {
            ...values,
            dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
        };

        setIsUploading(true);
        const url = await uploadFile(selectedFile);
        formData.imageUrl = url;
        console.log("Uploaded Image URL:", url);

        onAddChild(formData);

        
        form.resetFields();
        setSelectedFile(null);
        
        onClose();

    } catch {
        toast.error('Please fill all required fields!');
    } finally {
        setIsUploading(false);
    }
};


  
  const handleCancel = () => {
    form.resetFields();
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
    title="Thêm Trẻ Em"
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="Thêm"
    cancelText="Hủy"
    width={600}
    okButtonProps={{
      disabled: isUploading,
      loading: isUploading,
    }}
  >
    <Form form={form} layout="vertical" name="createChildForm">
      
      <Form.Item
        label="Tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nhập tên" />
      </Form.Item>
  
      <Form.Item
        label="Ngày sinh"
        name="dateOfBirth"
        rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          style={{ width: "100%" }}
          placeholder="Chọn ngày sinh"
          disabledDate={(current) => current && current >= moment().endOf('day')}
        />
      </Form.Item>
  
      <Form.Item
        label="Giới tính"
        name="gender"
        rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
      >
        <Select placeholder="Chọn giới tính">
          <Option value="Male">Nam</Option>
          <Option value="Female">Nữ</Option>
        </Select>
      </Form.Item>
  
      <Form.Item label="Tiền sử bệnh" name="medicalHistory" valuePropName="checked">
        <Checkbox
          onChange={(e) => {
            form.setFieldsValue({ medicalHistory: e.target.checked ? "Có" : "Không" });
          }}
        >
          Có tiền sử bệnh
        </Checkbox>
      </Form.Item>
  
      <Form.Item
        label="Mối quan hệ với người dùng"
        name="relationToUser"
        rules={[{ required: true, message: "Vui lòng chọn mối quan hệ!" }]}
      >
        <Select placeholder="Chọn mối quan hệ">
          <Option value={0}>Con</Option>
          <Option value={1}>Cháu</Option>
          <Option value={2}>Anh/Chị/Em</Option>
          <Option value={3}>Người thân</Option>
          <Option value={4}>Khác</Option>
        </Select>
      </Form.Item>
  
      <Form.Item
        label="Chiều cao (cm)"
        name="height"
        rules={[
          { required: true, message: "Vui lòng nhập chiều cao!" },
          {
            validator: (_, value) => {
              if (!value) return Promise.reject("Chiều cao không hợp lệ!");
              const numberValue = Number(value);
              if (isNaN(numberValue) || numberValue < 1) {
                return Promise.reject("Chiều cao phải lớn hơn 0!");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input type="number" placeholder="Nhập chiều cao" min={1} />
      </Form.Item>
  
      <Form.Item
        label="Cân nặng (kg)"
        name="weight"
        rules={[
          { required: true, message: "Vui lòng nhập cân nặng!" },
          {
            validator: (_, value) => {
              if (!value) return Promise.reject("Cân nặng không hợp lệ!");
              const numberValue = Number(value);
              if (isNaN(numberValue) || numberValue < 1) {
                return Promise.reject("Cân nặng phải lớn hơn 0!");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input type="number" placeholder="Nhập cân nặng" min={1} />
      </Form.Item>
  
      <Form.Item
        label="Tải ảnh lên"
        rules={[{ required: true, message: "Vui lòng tải lên một ảnh!" }]}
      >
        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} showUploadList={true}>
          <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        </Upload>
      </Form.Item>
  
    </Form>
  </Modal>
  
  );
};

export default AddChildModal;
