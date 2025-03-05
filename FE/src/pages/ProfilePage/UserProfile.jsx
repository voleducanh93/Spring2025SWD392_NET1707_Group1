import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Upload, Avatar, Card, Typography } from "antd";
import { UploadOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Dữ liệu từ API
    const userApiData = {
      fullName: "Nguyễn Đức",
      userName: "nguyenbaminhduc2019",
      email: "nguyenbaminhduc2019@gmail.com",
      phoneNumber: "0707511398",
      address: "Xã Bình Ba, Huyện Châu Đức, Tỉnh Bà Rịa - Vũng Tàu",
      dateOfBirth: "2025-03-04",
      imageUrl: null, // Nếu null thì sẽ hiển thị avatar mặc định
    };

    setUserData(userApiData);
    form.setFieldsValue(userApiData);
  }, [form]);

  const handleFormSubmit = (values) => {
    console.log("User Profile Updated:", values);
  };

  const handleChangePassword = (values) => {
    console.log("Password Change Request:", values);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Giả lập API call
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={4} className="card-header">User Profile</Title>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* Avatar Hình Tròn */}
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userData?.imageUrl || ""}
            style={{ border: "2px solid #ddd" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Upload showUploadList={false}>
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </div>
        </div>

        {/* Form Thông Tin Người Dùng */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Please enter your full name" }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Username" name="userName">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter a valid email" }]}>
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Form Đổi Mật Khẩu */}
      <Card className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={4} className="card-header">Change Password</Title>
        <Form form={passwordForm} onFinish={handleChangePassword} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: "Please input your current password!" }]}
              >
                <Input.Password placeholder="Enter current password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please input your new password!" },
                  { min: 8, message: "Password must be at least 8 characters long!" },
                  { max: 30, message: "Password must not exceed 30 characters!" },
                  { pattern: /[A-Z]/, message: "Must contain at least one uppercase letter!" },
                  { pattern: /[0-9]/, message: "Must contain at least one number!" },
                  { pattern: /[^A-Za-z0-9]/, message: "Must contain at least one special character!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value === getFieldValue("currentPassword")) {
                        return Promise.reject(new Error("New password must not be the same as the current password!"));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Enter new password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>
          </Row>

          <div className="col-12 mb-4">
            <Title level={6}>Password Requirements:</Title>
            <ul className="ps-3 mb-0">
              <li className="mb-1">Minimum 8 characters long</li>
              <li className="mb-1">At least one uppercase letter</li>
              <li className="mb-1">At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="me-2">
              Save changes
            </Button>
            <Button type="default" htmlType="reset">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;
