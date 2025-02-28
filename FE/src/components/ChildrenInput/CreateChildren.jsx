import { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Upload } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { uploadFile } from "../../config/firebase"; // Giả định có hàm upload lên Firebase

const { Option } = Select;

const AddChildModal = ({ visible, onClose, onAddChild }) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Xử lý khi chọn file
  const handleFileChange = ({ file }) => {
    setSelectedFile(file); 
    console.log("📂 File Selected:", file);
  };

  // ✅ Xử lý khi nhấn OK
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

        // Xóa dữ liệu sau khi thêm thành công
        form.resetFields();
        setSelectedFile(null);
        
        onClose();

    } catch {
        toast.error('Please fill all required fields!');
    } finally {
        setIsUploading(false);
    }
};


  // ✅ Đóng Modal và reset dữ liệu
  const handleCancel = () => {
    form.resetFields();
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      title="Create New Child"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add"
      cancelText="Cancel"
      width={600}
      okButtonProps={{
        disabled: isUploading, // Vô hiệu hóa khi đang tải ảnh
        loading: isUploading, // Hiển thị spinner khi tải ảnh
      }}
    >
      <Form form={form} layout="vertical" name="createChildForm">
        {/* Full Name */}
        <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Please enter the full name!" }]}>
          <Input prefix={<UserOutlined />} placeholder="Enter full name" />
        </Form.Item>

        {/* Date of Birth */}
        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: "Please select the date of birth!" }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Select date" />
        </Form.Item>

        {/* Gender */}
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select the gender!" }]}>
          <Select placeholder="Select gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        {/* Medical History */}
        <Form.Item label="Medical History" name="medicalHistory">
          <Input placeholder="Enter medical history (optional)" />
        </Form.Item>

        {/* Relation to User */}
        <Form.Item label="Relation to User" name="relationToUser" rules={[{ required: true, message: "Please select the relation!" }]}>
          <Select placeholder="Select relation to user">
            <Option value="Son">Son</Option>
            <Option value="Daughter">Daughter</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        {/* Height */}
        <Form.Item label="Height" name="height">
          <Input type="number" placeholder="Enter height (optional)" />
        </Form.Item>

        {/* Weight */}
        <Form.Item label="Weight" name="weight">
          <Input type="number" placeholder="Enter weight (optional)" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Upload Image"
          rules={[{ required: true, message: "Please upload an image!" }]} // 🔴 Bắt buộc chọn ảnh
        >
          <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} showUploadList={true}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          {/* {selectedFile && <p>📂 Selected: {selectedFile.name}</p>} */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChildModal;
