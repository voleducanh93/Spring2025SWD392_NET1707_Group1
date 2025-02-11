import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";

const LoginForm = ({ setIsSignUpMode, setIsResetPasswordModalVisible, setResetPasswordEmail }) => {
  const handleOnFinish = (values) => {
    console.log("Đăng nhập với:", values);
  };

  return (
    <Form onFinish={handleOnFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ maxWidth: 600 }}>
      <h2 className={`${styles.title} text-center`}>Đăng nhập</h2>

      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
        <Input placeholder="user@example.com" />
      </Form.Item>

      <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full mt-4">
        Đăng nhập
      </Button>

      <Link onClick={() => setIsResetPasswordModalVisible(true)} className="text-blue-500 text-center block mt-4">
        Quên mật khẩu?
      </Link>

      <p className="text-center mt-4">
        Chưa có tài khoản?{" "}
        <Link onClick={() => setIsSignUpMode(true)} className="text-blue-500">
          Đăng ký
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
