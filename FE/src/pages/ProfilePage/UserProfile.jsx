import { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Upload, Avatar, Card, Typography, DatePicker, Select } from "antd";
import { UploadOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useLocationData } from "../AuthPage/useLocationData"; 
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
    {/* Bố cục flex để đặt 2 khối cạnh nhau trên màn hình lớn */}
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      
      {/* Thông tin cá nhân */}
      <Card className="w-full md:w-1/2">
        <Title level={4} className="text-center">Thông tin cá nhân</Title>
  
        <div className="text-center mb-4">
          <Avatar size={100} icon={<UserOutlined />} src={userData?.imageUrl || ""} className="border-2 border-gray-300" />
          <div className="mt-2">
            <Upload showUploadList={false} onChange={handleFileChange}>
              <Button icon={<UploadOutlined />}>Thay đổi hình</Button>
            </Upload>
          </div>
        </div>
  
        {/* Form Thông Tin Người Dùng */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Vui lòng nhập họ của bạn" }]}>
                <Input placeholder="Nhập họ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}>
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}>
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
  
          {/* Ô Địa Chỉ */}
          <Form.Item label="Địa chỉ">
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select className="w-full" value={selectedProvince} placeholder="Chọn tỉnh/thành phố" onChange={setSelectedProvince} size="large">
                  {provinceList.map((province) => (
                    <Option key={province.code} value={province.code}>
                      {province.name_with_type}
                    </Option>
                  ))}
                </Select>
  
                <Select className="w-full" value={selectedDistrict} placeholder="Chọn quận/huyện" onChange={setSelectedDistrict} size="large" disabled={!selectedProvince}>
                  {districtList.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name_with_type}
                    </Option>
                  ))}
                </Select>
  
                <Select className="w-full" value={selectedWard} placeholder="Chọn phường/xã" onChange={setSelectedWard} size="large" disabled={!selectedDistrict}>
                  {wardList.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name_with_type}
                    </Option>
                  ))}
                </Select>
              </div>
  
              <Input placeholder="Số nhà, tên đường" value={specificAddress} onChange={(e) => setSpecificAddress(e.target.value)} className="w-full mt-2" />
            </div>
          </Form.Item>
  
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
  
      {/* Đổi mật khẩu */}
      <Card className="w-full md:w-1/2">
        <Title level={4} className="text-center">Thay đổi mật khẩu</Title>
  
        <Form form={passwordForm} onFinish={handleChangePassword} layout="vertical">
          <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}>
            <Input.Password placeholder="Nhập mật khẩu hiện tại" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mật khẩu mới" name="newPassword" rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                { pattern: /[A-Z]/, message: "Phải chứa ít nhất một chữ cái in hoa!" },
                { pattern: /[0-9]/, message: "Phải chứa ít nhất một số!" },
                { pattern: /[^A-Za-z0-9]/, message: "Phải chứa ít nhất một ký tự đặc biệt!" },
              ]}>
                <Input.Password placeholder="Nhập mật khẩu mới" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Xác nhận mật khẩu mới" name="confirmPassword" dependencies={["newPassword"]} rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ]}>
                <Input.Password placeholder="Xác nhận mật khẩu mới" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" loading={loading}>Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
  
    </div>
  </div>
  
  );
};

export default UserProfile;
