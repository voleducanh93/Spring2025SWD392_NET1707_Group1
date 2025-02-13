import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "../../components/Auth/AuthForm.module.css"; 

const SignInForm = ({ onFinish }) => {
  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      className={`${styles.signInForm} mx-auto`}
      onFinish={onFinish}
    >
      <h2 className="text-center text-2xl font-semibold">Đăng nhập</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email của bạn!",
          },
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
        ]}
      >
        <Input placeholder="user@example.com" prefix={<i className="fas fa-user"></i>} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu của bạn!",
          },
        ]}
      >
        <Input.Password
          placeholder="Mật khẩu"
          prefix={<i className="fas fa-lock"></i>}
          pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full mt-4">
        Đăng nhập
      </Button>

      <Link
        to="#"
        className="block text-center mt-4 text-blue-500 hover:text-blue-700 font-semibold transition duration-300"
      >
        Quên mật khẩu?
      </Link>

      <p className="text-center mt-4">Hoặc đăng nhập bằng các nền tảng xã hội</p>

      <div className="mt-4 flex items-center justify-center">
        <button
          type="button"
          className="w-full flex justify-center items-center gap-2 bg-white text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4"
            id="google"
          >
            <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z" />
            <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z" />
            <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z" />
            <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z" />
          </svg>
          Đăng nhập bằng Google
        </button>
      </div>
    </Form>
  );
};

export default SignInForm;
