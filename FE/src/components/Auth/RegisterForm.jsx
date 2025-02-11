import { Form, Input, Button } from "antd";
import styles from "./AuthForm.module.css";

const RegisterForm = ({ setIsSignUpMode, setVerificationEmail, setIsVerificationModalVisible }) => {
  const handleOnFinish = (values) => {
    console.log("Đăng ký với:", values);
    setVerificationEmail(values.email);
    setIsVerificationModalVisible(true);
  };

  return (
    <Form onFinish={handleOnFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 600 }}>
      <h2 className={`${styles.title} text-center`}>Đăng ký</h2>

      <Form.Item label="Họ" name="last-name" rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
        <Input placeholder="Họ" />
      </Form.Item>

      <Form.Item label="Tên" name="first-name" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
        <Input placeholder="Tên" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
        <Input placeholder="user@example.com" />
      </Form.Item>

      <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full mt-4">
        Đăng ký
      </Button>

      <p className="text-center mt-4">
        Đã có tài khoản?{" "}
        <a onClick={() => setIsSignUpMode(false)} className="text-blue-500">
          Đăng nhập
        </a>
      </p>
    </Form>
  );
};

export default RegisterForm;
