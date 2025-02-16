import { useState } from "react";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
    const {mutate: resetPassword} = useResetPassword();
  const handleSubmit = (e) => {
    console.log("Lỗi");
    
    e.preventDefault();
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    setError("");
    //alert("Mật khẩu đã được đặt lại thành công!");
    resetPassword({ newPassword: password });
    // Gửi API để cập nhật mật khẩu mới
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Đặt lại mật khẩu
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
