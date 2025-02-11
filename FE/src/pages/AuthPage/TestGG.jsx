import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = "1058847290464-88jobdnatpad800g702ebskbbo8p1fau.apps.googleusercontent.co"; // 🔥 Thay bằng Client ID của bạn

function AuthPageTest() {
  const navigate = useNavigate();

  // 🛠 Xử lý đăng nhập Google
  const handleGoogleLoginSuccess = async (response) => {
    const idToken = response.credential;
    try {
      // 🔥 Gọi API Google Login
      const res = await axios.post("https://localhost:7256/api/Auth/loginGG", { idToken });

      if (res.data.isSuccess) {
        const { token, refreshToken } = res.data.result;

        // Lưu vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        toast.success("Đăng nhập Google thành công!");

        // Chuyển hướng đến trang chính
        navigate("/home");
      } else {
        toast.error("Đăng nhập Google thất bại!");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Lỗi khi đăng nhập Google!");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <button
        type="button"
        className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200"
      >
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => toast.error("Đăng nhập Google thất bại!")} />
      </button>
    </GoogleOAuthProvider>
  );
}

export default AuthPageTest;
