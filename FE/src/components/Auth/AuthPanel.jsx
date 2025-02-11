import { Button } from "antd";
import styles from "./AuthForm.module.css";

const AuthPanel = ({ isSignUpMode, setIsSignUpMode }) => {
  return (
    <div className={styles.panelsContainer}>
      <div className={`${styles.panel} ${styles.leftPanel}`}>
        <div className={styles.content}>
          <h3>Bạn là người mới?</h3>
          <p>Đăng ký ngay để nhận nhiều ưu đãi và trải nghiệm dịch vụ tốt nhất.</p>
          <Button className={styles.btn} onClick={() => setIsSignUpMode(true)}>
            Đăng ký
          </Button>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.rightPanel}`}>
        <div className={styles.content}>
          <h3>Đã có tài khoản?</h3>
          <p>Đăng nhập để tiếp tục sử dụng dịch vụ.</p>
          <Button className={styles.btn} onClick={() => setIsSignUpMode(false)}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
