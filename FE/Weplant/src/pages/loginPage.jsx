import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const API = "http://45.252.248.204:8080/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Email hoặc mật khẩu không đúng!");

      const result = await response.json();
      const token = result?.data?.token;
      const userEmail = result?.data?.email;
      const userRole = result?.data?.role;

      if (token && userRole) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", userEmail || email);
        localStorage.setItem("userRole", userRole);

        if (remember) localStorage.setItem("rememberMe", "true");

        navigate(userRole === "ADMIN" ? "/admin" : "/authen");
      } else {
        setError("Không nhận được token hoặc role từ server!");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi đăng nhập!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="flex flex-col items-center justify-center p-10 bg-white">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-3 rounded-xl mb-4">
              <span className="font-bold">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Weplant</h1>
            <p className="text-gray-500 mt-2 text-center">
              Kết nối bạn với đội ngũ thiết kế chuyên nghiệp
            </p>
            <img src={logo} alt="Weplant Logo" className="w-56 mt-10" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-10 bg-white">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Đăng Nhập Vào Weplant
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Đăng nhập để bắt đầu tạo website hoặc khám phá các template của
              bạn
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhap@email.com"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Remember + Forgot Password */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mr-2"
                  disabled={isLoading}
                />
                Ghi nhớ tôi
              </label>

              {/* 👇 Nút chuyển hướng sang trang forgot-password */}
              <button
                type="button"
                onClick={() => navigate("/forget-password")}
                className="text-blue-500 hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <span>Đăng Nhập</span>
              )}
            </button>

            {/* Register */}
            <p className="text-sm text-gray-500 text-center mt-6">
              Chưa có tài khoản?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Đăng ký ngay
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
