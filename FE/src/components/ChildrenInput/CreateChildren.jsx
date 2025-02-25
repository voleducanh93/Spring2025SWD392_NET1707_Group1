import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Upload, message } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';


const { Option } = Select;

const AddChildModal = ({ visible, onClose, onAddChild  }) => {
  const [form] = Form.useForm();

  

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null, // Ensure date format is correct
      };

      // Pass the data back to the parent
      onAddChild(formData);
      console.log("hhhh");

      // Reset form and close modal
      form.resetFields();
      onClose();
      toast.success('Child added successfully!');
    } catch  {
      message.error('Please fill all required fields!');
    }
  };

  const handleCancel = () => {
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
    >
      <Form form={form} layout="vertical" name="createChildForm" >
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
   // defaultValue={initialValues?.dateOfBirth ? moment(initialValues.dateOfBirth) : null} // Use moment() to parse the date correctly
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
        <Form.Item
          label="Upload Image"
          name="imageUrl"
          valuePropName="fileList"
          getValueFromEvent={({ fileList }) => fileList || []} // Ensure fileList is always an array
        >
          <Upload
            name="image"
            action="/upload" // Use your image upload API endpoint
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('You can only upload image files!');
              }
              return isImage;
            }}
            showUploadList={false}
          >
            <Button icon={<PlusOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChildModal;
