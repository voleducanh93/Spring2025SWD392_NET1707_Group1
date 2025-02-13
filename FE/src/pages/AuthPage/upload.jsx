import  { useState } from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../../config/firebase"; // Import đúng từ Firebase

const UploadForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Lưu file vào state

  // Hàm lấy file khi chọn
  const handleFileChange = ({ file }) => {
    setSelectedFile(file); // Lưu file khi chọn
  };

  // Xử lý khi submit form
  const handleSubmit = async () => {
    if (!selectedFile) {
      message.error("Please select a file first!");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadFile(selectedFile);
      console.log("Uploaded Image URL:", url); // ✅ Log đường link file
      message.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Upload Image">
        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} showUploadList={true}>
          <Button icon={<UploadOutlined />} loading={loading}>
            Select File
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadForm;
