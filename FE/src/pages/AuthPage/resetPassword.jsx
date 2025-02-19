import { useState } from "react";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: resetPassword } = useResetPassword();

  const handleSubmit = (e) => {
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
    resetPassword({ newPassword: password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#1E90FF" }}>
      <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Đặt lại mật khẩu
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Password Input */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-600">Mật khẩu mới</label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-10 py-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
