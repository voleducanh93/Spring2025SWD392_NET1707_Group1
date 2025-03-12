import { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Upload, Avatar, Card, Typography, DatePicker, Select } from "antd";
import { UploadOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useLocationData } from "../AuthPage/useLocationData"; // Import hook lấy địa chỉ
import { useChangePassword, useGetProfile, useUpdateProfile } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { uploadFile } from "../../config/firebase";

const { Title } = Typography;
const { Option } = Select;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [url,setUrl ] = useState(null);
 
  const {
    provinceList,
    districtList,
    wardList,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    specificAddress,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
    setSpecificAddress,
    buildFullAddress
  } = useLocationData();
  const { data: userProfile} = useGetProfile();
  
  useEffect(() => {
    if (userProfile) {
      console.log("User Profile API Data:", userProfile);
  
     
      const nameParts = userProfile.fullName ? userProfile.fullName.split(" ") : [];
      const firstName = nameParts.slice(0, -1).join(" ") || "";
      const lastName = nameParts.slice(-1).join(" ") || ""; 
 
  
      const formattedData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: userProfile.phoneNumber || "",
        dateOfBirth: userProfile.dateOfBirth ? moment(userProfile.dateOfBirth) : null,
        address: userProfile.address || "",
        imageUrl: userProfile.imageUrl || "",
      };
  
      setUserData(formattedData);
      form.setFieldsValue(formattedData);
  
     
      if (userProfile.address) {
        const addressParts = userProfile.address.split(", ");
        if (addressParts.length === 4) {
          setSpecificAddress(addressParts[0]);
          setSelectedWard(wardList.find((w) => w.name_with_type === addressParts[1])?.code || null);
          setSelectedDistrict(districtList.find((d) => d.name_with_type === addressParts[2])?.code || null);
          setSelectedProvince(provinceList.find((p) => p.name_with_type === addressParts[3])?.code || null);
        }
      }
    }
  }, [form, userProfile, provinceList, districtList, wardList]);
  
  const updateProfileMutation = useUpdateProfile(); 

  const handleFormSubmit = (values) => {
    setLoading(true);
  
    const updatedData = {
      id: userProfile?.id, 
      fullName: values.firstName + " " +values.lastName ,
      userName: userProfile?.userName,      
      phoneNumber: values.phoneNumber,
      address: buildFullAddress() || userProfile?.address, 
      imageUrl: url? url : "",
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
    };
    
  
  
  
    updateProfileMutation.mutate(updatedData, {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };
  
const changePasswordMutation = useChangePassword();
  const handleChangePassword = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("❌ Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
      return;
    }
  
    setLoading(true);
  
    const passwordData = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
  
    console.log("Dữ liệu gửi lên API:", passwordData);
    changePasswordMutation.mutate(passwordData, {
      onSuccess: () => {
        setLoading(false);
        console.log("✅ Đổi mật khẩu thành công!");
        passwordForm.resetFields(); // ✅ Xóa input sau khi đổi thành công
      },
      onError: (error) => {
        setLoading(false);
        console.error("❌ Lỗi đổi mật khẩu:", error);
      },
    });
  };
  const handleFileChange = async ({ file }) => {
    try {
     
      const url = await uploadFile(file); 
      setUrl(url);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };
  
  

  return (
    <div className="p-6">
      <Card className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Title level={4} className="text-center">User Profile</Title>

        <div className="text-center mb-4">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userData?.imageUrl || ""}
            style={{ border: "2px solid #ddd" }}
          />
          <div className="mt-2">
            <Upload showUploadList={false} onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </div>
        </div>

        {/* Form Thông Tin Người Dùng */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter your full name" }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter your full name" }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
            <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: "Please select your date of birth!" }]}>
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          {/* Ô Địa Chỉ */}
          <Form.Item label="Địa chỉ">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <Select
                  className="w-full"
                  value={selectedProvince}
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={setSelectedProvince}
                  size="large"
                >
                  {provinceList.map((province) => (
                    <Option key={province.code} value={province.code}>
                      {province.name_with_type}
                    </Option>
                  ))}
                </Select>

                <Select
                  className="w-full"
                  value={selectedDistrict}
                  placeholder="Chọn quận/huyện"
                  onChange={setSelectedDistrict}
                  size="large"
                  disabled={!selectedProvince}
                >
                  {districtList.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name_with_type}
                    </Option>
                  ))}
                </Select>

                <Select
                  className="w-full"
                  value={selectedWard}
                  placeholder="Chọn phường/xã"
                  onChange={setSelectedWard}
                  size="large"
                  disabled={!selectedDistrict}
                >
                  {wardList.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name_with_type}
                    </Option>
                  ))}
                </Select>
              </div>

              <Input
                placeholder="Số nhà, tên đường"
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
                className="w-full mt-2"
              />
            </div>
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">Save Changes</Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Form Đổi Mật Khẩu */}
      <Card className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
  <Title level={4} className="text-center">Change Password</Title>

  <Form form={passwordForm} onFinish={handleChangePassword} layout="vertical">
    {/* Current Password */}
    <Form.Item
      label="Current Password"
      name="currentPassword"
      rules={[
        { required: true, message: "Please enter your current password!" },
      ]}
    >
      <Input.Password
        placeholder="Enter current password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Form.Item>

    {/* New Password & Confirm New Password (Cùng hàng) */}
    <Row gutter={16}>
  <Col span={12}>
    <Form.Item
      label="New Password"
      name="newPassword"
      rules={[
        { required: true, message: "Please enter your new password!" },
        { min: 8, message: "Password must be at least 8 characters long!" },
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

<Form.Item className="text-center">
  <Button type="primary" htmlType="submit" loading={loading}>
    Save changes
  </Button>
</Form.Item>

  </Form>
</Card>


    </div>
  );
};

export default UserProfile;
