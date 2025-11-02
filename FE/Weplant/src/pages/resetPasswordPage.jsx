import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API = "/api";
//const API = "http://45.252.248.204:8080/api";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  // ✅ Kiểm tra token có tồn tại
  useEffect(() => {
    if (!token || token.trim() === "") {
      setError("❌ Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn!");
      setIsValidToken(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValidToken) {
      setError("Token không hợp lệ hoặc đã hết hạn!");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Không thể đặt lại mật khẩu!");
      }

      setMessage(result?.message || "✅ Đặt lại mật khẩu thành công!");
      setError("");

      // ⏳ Chuyển về login sau 3 giây
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          🔒 Đặt lại mật khẩu
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Nhập mật khẩu mới để truy cập lại tài khoản của bạn.
        </p>

        {error && (
          <p className="text-red-500 mb-3 text-center font-medium">{error}</p>
        )}
        {message && (
          <p className="text-green-600 mb-3 text-center font-medium">
            {message}
          </p>
        )}

        {isValidToken && (
          <>
            <input
              type="password"
              placeholder="🔑 Mật khẩu mới"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="✅ Xác nhận mật khẩu mới"
              className="w-full border rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
            >
              {loading ? "🔄 Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
