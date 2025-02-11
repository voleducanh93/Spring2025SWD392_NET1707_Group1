import { useState } from "react";
import { Modal } from "antd";
import styles from "./AuthForm.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthPanel from "./AuthPanel";
import AuthModal from "./AuthModal";

function AuthPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles.signUpMode : ""}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          {isSignUpMode ? (
            <RegisterForm setIsSignUpMode={setIsSignUpMode} setVerificationEmail={setVerificationEmail} setIsVerificationModalVisible={setIsVerificationModalVisible} />
          ) : (
            <LoginForm setIsSignUpMode={setIsSignUpMode} setIsResetPasswordModalVisible={setIsResetPasswordModalVisible} setResetPasswordEmail={setResetPasswordEmail} />
          )}
        </div>
      </div>

      <AuthPanel isSignUpMode={isSignUpMode} setIsSignUpMode={setIsSignUpMode} />

      <AuthModal
        isVerificationModalVisible={isVerificationModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        verificationEmail={verificationEmail}
        isResetPasswordModalVisible={isResetPasswordModalVisible}
        setIsResetPasswordModalVisible={setIsResetPasswordModalVisible}
        resetPasswordEmail={resetPasswordEmail}
      />
    </div>
  );
}

export default AuthPage;
