import  { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { uploadFile } from '../../config/firebase'; // Assuming you have a function to upload to Firebase

const { Option } = Select;

const AddChildModal = ({ visible, onClose, onAddChild }) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 
  const [fileList, setFileList] = useState();
  const handleFileChange = ({file}) => {
    setSelectedFile(file)// Cập nhật danh sách tệp đã chọ
    //setSelectedFile(fileList[0]);
    console.log(file);
    
    
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
      };

      

      if (selectedFile) {
        setIsUploading(true); 
        const url = await uploadFile(selectedFile); 
        formData.imageUrl = url; 
       
        setIsUploading(false); 
        console.log("Uploaded Image URL:", url);
      }
      console.log(formData.imageUrl);
      
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
    setFileList([]);
    setSelectedFile(null);
    form.resetFields();
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
        disabled: isUploading, // Disable OK button when uploading
        loading: isUploading, // Show loading spinner on OK button while uploading
      }}
    >
      <Form form={form} layout="vertical" name="createChildForm">
        {/* Full Name Input */}
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter the full name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter full name" />
        </Form.Item>

        {/* Date of Birth with Time */}
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please select the date of birth!' }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: '100%' }}
            placeholder="Select date and time"
          />
        </Form.Item>

        {/* Gender Select */}
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select the gender!' }]}
        >
          <Select placeholder="Select gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        {/* Medical History Input */}
        <Form.Item
          label="Medical History"
          name="medicalHistory"
        >
          <Input placeholder="Enter medical history (optional)" />
        </Form.Item>

        {/* Relation to User Select */}
        <Form.Item
          label="Relation to User"
          name="relationToUser"
          rules={[{ required: true, message: 'Please select the relation!' }]}
        >
          <Select placeholder="Select relation to user">
            <Option value="Son">Son</Option>
            <Option value="Daughter">Daughter</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        {/* Height Input */}
        <Form.Item
          label="Height"
          name="height"
        >
          <Input type="number" placeholder="Enter height (optional)" />
        </Form.Item>

        {/* Weight Input */}
        <Form.Item
          label="Weight"
          name="weight"
        >
          <Input type="number" placeholder="Enter weight (optional)" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="Upload Image">
          <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} showUploadList={true}>
            <Button icon={<UploadOutlined />} >Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChildModal;
