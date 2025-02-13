import { Form, Input, Button, Select } from "antd";
import styles from "../../components/Auth/AuthForm.module.css"; 

const { Option } = Select;

const SignUpForm = ({
  form,
  onFinish,
  onValuesChange,
  formValues,
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
}) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600, margin: "0 auto" }}
      className={`${styles.signUpForm}`}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={formValues}
      preserve={true}
    >
      <h2 className="text-center text-2xl font-semibold">Đăng ký</h2>

      {/* Họ và Tên */}
      <div className="flex gap-1">
        <Form.Item
          label="Họ"
          name="last-name"
          rules={[
            { required: true, message: "Vui lòng nhập họ của bạn!" },
            { pattern: /^[a-zA-ZÀ-ỹ]+$/, message: "Họ chỉ được chứa chữ cái!" },
            { min: 2, message: "Họ phải có ít nhất 2 ký tự!" },
          ]}
          className="flex-1"
        >
          <Input placeholder="Họ" prefix={<i className="fas fa-user"></i>} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="first-name"
          rules={[
            { required: true, message: "Vui lòng nhập tên của bạn!" },
            { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: "Tên chỉ được chứa chữ cái và khoảng trắng!" },
            { min: 2, message: "Tên phải có ít nhất 2 ký tự!" },
          ]}
          className="flex-1"
        >
          <Input placeholder="Tên" prefix={<i className="fas fa-user"></i>} className="w-full" />
        </Form.Item>
      </div>

      {/* Email và Số điện thoại */}
      <div className="flex gap-1">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email của bạn!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
          className="flex-1"
        >
          <Input placeholder="Email" prefix={<i className="fas fa-envelope"></i>} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone-number"
          rules={[
            {
              pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ! (VD: 0912345678)",
            },
          ]}
          className="flex-1"
        >
          <Input placeholder="Số điện thoại" prefix={<i className="fas fa-phone"></i>} className="w-full" />
        </Form.Item>
      </div>

      {/* Mật khẩu và Xác nhận mật khẩu */}
      <div className="flex gap-4">
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            {
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
            },
          ]}
          className="flex-1"
        >
          <Input.Password placeholder="Mật khẩu" prefix={<i className="fas fa-lock"></i>} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm-password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu của bạn!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu không khớp!");
              },
            }),
          ]}
          className="flex-1"
        >
          <Input.Password placeholder="Xác nhận mật khẩu" prefix={<i className="fas fa-lock"></i>} className="w-full" />
        </Form.Item>
      </div>

      {/* Địa chỉ */}
      <Form.Item label="Địa chỉ">
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-4">
            <Select
              className="w-full"
              value={selectedProvince || undefined}
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
              value={selectedDistrict || undefined}
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
              value={selectedWard || undefined}
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
          <Form.Item name="address" hidden>
            <Input />
          </Form.Item>
        </div>
      </Form.Item>

      {/* Nút Đăng ký */}
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
          Tạo tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
