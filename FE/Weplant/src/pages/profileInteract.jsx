import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function ProfileEditPage() {
  const [profile, setProfile] = useState({
    avatar: "",
    fullName: "Nguyễn Văn A",
    email: "user@weplant.com",
    companyName: "",
    phone: "",
    accountType: "Cá nhân",
    bio: "",
  });

  // Thêm state cho menu đang active
  const [active, setActive] = useState("Profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // TODO: gọi API cập nhật profile ở đây
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png" // đổi thành đường dẫn logo của bạn
              alt="weplant logo"
              className="w-6 h-6"
            />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

          {/* Menu */}
          <div className="flex gap-8">
            {[
              { label: "Trang Chủ", path: "/" },
              { label: "Dịch Vụ", path: "/services" },
              { label: "Template", path: "/templates" },
              { label: "Về Chúng Tôi", path: "/about" },
              { label: "Liên Hệ", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setActive(item.label)}
                className={`text-sm font-medium transition ${
                  active === item.label ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-8 mt-24">
        {/* thêm mt-24 để tránh bị navbar che */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Chỉnh Sửa Thông Tin Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-6"
        >
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar || "https://i.pravatar.cc/80"}
              alt="avatar"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <label className="block mb-2 text-sm text-gray-600">
                Ảnh đại diện
              </label>
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    avatar: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên người dùng
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
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
              value={profile.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              disabled
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên doanh nghiệp (nếu có)
            </label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại tài khoản
            </label>
            <select
              name="accountType"
              value={profile.accountType}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value="Cá nhân">Cá nhân</option>
              <option value="Doanh nghiệp">Doanh nghiệp</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giới thiệu bản thân
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              maxLength="250"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              {profile.bio.length}/250 ký tự
            </p>
          </div>

          {/* Change Password */}
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Đổi mật khẩu
          </button>

          {/* Save/Cancel */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lưu Thay Đổi
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-center text-sm text-gray-500 py-4 border-t mt-10">
        <p>
          Cần hỗ trợ? Gửi email{" "}
          <a href="mailto:support@weplant.com" className="text-blue-600">
            support@weplant.com
          </a>{" "}
          hoặc gọi{" "}
          <a href="tel:0123456789" className="text-blue-600">
            0123 456 789
          </a>
        </p>
        <p className="mt-2">
          © 2024 Weplant. Kết nối khách hàng với đội ngũ thiết kế chuyên nghiệp
        </p>
      </footer>
    </div>
  );
}
