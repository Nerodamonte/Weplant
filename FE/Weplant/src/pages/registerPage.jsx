import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const API = "http://45.252.248.204:8080/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    agree: false,
  });

  const [message, setMessage] = useState({ text: "", type: "" });  // {text, type: 'success' | 'error'}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Mật khẩu xác nhận không khớp!", type: "error" });
      return;
    }

    if (!formData.agree) {
      setMessage({ text: "Vui lòng đồng ý với điều khoản!", type: "error" });
      return;
    }

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        console.warn("Không parse được JSON:", err);
      }

      if (response.ok) {
        setMessage({ 
          text: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.", 
          type: "success" 
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);  // Tăng thời gian để user đọc
      } else {
        setMessage({ text: data?.message || "Đăng ký thất bại!", type: "error" });
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setMessage({ text: "Không kết nối được đến server!", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed top-0">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Weplant Logo" className="h-16 w-auto object-contain" />
          <span className="font-bold text-lg text-gray-700">Weplant</span>
        </div>
        <nav className="flex gap-6 text-gray-600 font-medium">
          <a href="/">Trang chủ</a>
          <a href="/templates">Templates</a>
          <a href="#">Dịch vụ</a>
          <a href="#">Liên hệ</a>
        </nav>
      </header>

      {/* Form */}
      <div className="mt-24 w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A9 9 0 1118.364 4.56 9 9 0 015.121 17.804z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Đăng Ký Tài Khoản Weplant
          </h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Tạo tài khoản để bắt đầu thiết kế website hoặc khám phá các template
            sẵn có của Weplant
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên người dùng
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nguyen Van A"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nhap@email.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0123456789"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Agree Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 rounded"
              required
            />
            <label className="text-sm text-gray-600">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-500">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-500">
                Chính sách bảo mật
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
          >
            Đăng Ký
          </button>

          {/* Message */}
          {message.text && (
            <p 
              className={`text-center text-sm mt-2 ${
                message.type === "success" 
                  ? "text-green-600" 
                  : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-500 font-medium">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full text-center mt-12 text-white text-sm">
        <div className="mt-8">
          <p>Cần hỗ trợ?</p>
          <p>
            <a href="mailto:support@weplant.com" className="text-white">
            contact.weplant@gmail.com
            </a>{" "}
            | 094 7722102
          </p>
        </div>
        <div className="mt-6 py-6 bg-gray-900 text-white">
          <p className="font-bold text-lg">Weplant</p>
          <p className="text-sm mt-2">
            © 2024 Weplant. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}