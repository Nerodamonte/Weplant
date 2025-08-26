import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center p-10 bg-white">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-3 rounded-xl mb-4">
              <span className="font-bold">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Weplant</h1>
            <p className="text-gray-500 mt-2 text-center">
              Kết nối bạn với đội ngũ thiết kế chuyên nghiệp
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="Logo"
              className="w-56 mt-10"
            />
          </div>
        </div>

        {/* Right Section */}
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
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
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
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
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
                />
                Ghi nhớ tôi
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
            >
              <span>Đăng Nhập</span>
            </button>

            {/* Or Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-2 text-gray-400 text-sm">hoặc</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Đăng nhập với Google
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
