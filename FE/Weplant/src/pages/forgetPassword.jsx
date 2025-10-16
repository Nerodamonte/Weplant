import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://45.252.248.204:8080/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Không gửi được yêu cầu!");

      const result = await res.json();
      const token = result?.data; // 👈 nếu backend trả token trong data

      if (token) {
        // Nếu có token thì đi thẳng sang trang reset password
        navigate(`/reset-password?token=${token}`);
      } else {
        // Nếu chỉ trả message thì hiển thị thông báo
        setMessage(result?.message || "Đã gửi link reset mật khẩu đến email của bạn!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Quên mật khẩu
        </h1>
        <p className="text-gray-500 mb-6">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {loading ? "Đang gửi..." : "Gửi link đặt lại"}
        </button>
      </form>
    </div>
  );
}
