import { useState, useEffect } from "react";
import { Button, Form, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../../components/Auth/AuthForm.module.css";
import { useRegister, useLogin, useForgotPassword } from "../../hooks/useAuth";
import { useLocationData } from "./useLocationData";
import SignInForm from "../../components/Auth/SignInForm";
import SignUpForm from "../../components/Auth/SignUpForm";

function AuthPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Manage loading state manually
  const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);
  const [verificationEmail] = useState("");
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);
  const [resetPasswordEmail] = useState("");

  const navigate = useNavigate();
  const [form] = Form.useForm();

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
    buildFullAddress,
  } = useLocationData();

  
  const { mutate: registerMutate, isSuccess: isRegisterSuccess, isError: isRegisterError } = useRegister();
  const { mutate: loginMutate, isSuccess: isLoginSuccess, isError: isLoginError } = useLogin();
  const { mutate: forgotPasswordMutate } = useForgotPassword();

  
  useEffect(() => {
    if (isRegisterSuccess) {
      setIsLoading(false);  
      form.resetFields();
      navigate("/auth"); 
    }

    if (isRegisterError) {
      setIsLoading(false);  
  
    }
  }, [isRegisterSuccess, isRegisterError, navigate, form]);

  useEffect(() => {
    if (isLoginSuccess) {
      setIsLoading(false);  
      navigate("/"); 
    }

    if (isLoginError) {
      setIsLoading(false); 
    
    }
  }, [isLoginSuccess, isLoginError, navigate]);

  const handleOnFinish = (values) => {
    setIsLoading(true);  

    if (isSignUpMode) {
      registerMutate({
        fullName: `${values["first-name"]} ${values["last-name"]}`,
        userName: values.email.split("@")[0],
        email: values.email,
        phoneNumber: values["phone-number"] || "",
        address: buildFullAddress(),
        dateOfBirth: values.dateOfBirth || new Date().toISOString(),
        password: values.password,
        role: "Customer",
      });
    } else {
      loginMutate({
        username: values.email,
        password: values.password,
      });
    }
  };
  const handleSubmitForgot = (email) => {
    
    forgotPasswordMutate({email: email}); 
    form.resetFields();
    //setIsResetPasswordModalVisible(true);
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles.signUpMode : ""}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* Add key prop to force re-render when switching between forms */}
              {!isSignUpMode && <SignInForm key="signInForm" onFinish={handleOnFinish} handleSubmitForgot={handleSubmitForgot} />}
              {isSignUpMode && (
                <SignUpForm
                  key="signUpForm"  // Force re-render when switching forms
                  form={form}
                  onFinish={handleOnFinish}
                  provinceList={provinceList}
                  districtList={districtList}
                  wardList={wardList}
                  selectedProvince={selectedProvince}
                  selectedDistrict={selectedDistrict}
                  selectedWard={selectedWard}
                  specificAddress={specificAddress}
                  setSelectedProvince={setSelectedProvince}
                  setSelectedDistrict={setSelectedDistrict}
                  setSelectedWard={setSelectedWard}
                  setSpecificAddress={setSpecificAddress}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h3>Bạn là người mới?</h3>
            <p>Hãy đăng ký tài khoản ngay để tham gia cộng đồng của chúng tôi.</p>
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => setIsSignUpMode(true)}
              loading={isLoading}
              disabled={isLoading}
            >
              Đăng ký
            </Button>
          </div>
          <img src="./log.svg" className={styles.image} alt="" />
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h3>Đã có tài khoản?</h3>
            <p>Hãy đăng nhập để tiếp tục hành trình của bạn.</p>
            <Button
              className={styles.btn}
              onClick={() => setIsSignUpMode(false)}
              loading={isLoading}
              disabled={isLoading}
            >
              Đăng nhập
            </Button>
          </div>
          <img src="./register.svg" className={styles.image} alt="" />
        </div>
      </div>

      {/* Modal xác thực email */}
      <Modal
        title="Yêu cầu xác thực email"
        visible={isVerificationModalVisible}
        onOk={() => setIsVerificationModalVisible(false)}
        onCancel={() => setIsVerificationModalVisible(false)}
        footer={[<Button key="ok" type="primary" onClick={() => setIsVerificationModalVisible(false)}>OK</Button>]} >
        <p>Email xác thực đã được gửi đến {verificationEmail}. Vui lòng kiểm tra hộp thư của bạn.</p>
      </Modal>

      {/* Modal cài lại mật khẩu */}
      <Modal
        title="Yêu cầu cài lại mật khẩu"
        visible={isResetPasswordModalVisible}
        onOk={() => setIsResetPasswordModalVisible(false)}
        onCancel={() => setIsResetPasswordModalVisible(false)}
        footer={[<Button key="ok" type="primary" onClick={() => setIsResetPasswordModalVisible(false)}>OK</Button>]} >
        <p>Chúng tôi đã gửi email đặt lại mật khẩu đến {resetPasswordEmail}. Hãy kiểm tra hộp thư!</p>
      </Modal>
    </div>
  );
}

export default AuthPage;
