import { Modal} from "antd";

const AuthModal = ({ isVerificationModalVisible, setIsVerificationModalVisible, verificationEmail, isResetPasswordModalVisible, setIsResetPasswordModalVisible, resetPasswordEmail }) => {
  return (
    <>
      <Modal title="Xác thực email" visible={isVerificationModalVisible} onOk={() => setIsVerificationModalVisible(false)}>
        <p>Một email xác thực đã được gửi đến {verificationEmail}. Vui lòng kiểm tra hộp thư!</p>
      </Modal>

      <Modal title="Quên mật khẩu" visible={isResetPasswordModalVisible} onOk={() => setIsResetPasswordModalVisible(false)}>
        <p>Chúng tôi đã gửi email đặt lại mật khẩu đến {resetPasswordEmail}. Kiểm tra hộp thư để tiếp tục!</p>
      </Modal>
    </>
  );
};

export default AuthModal;
