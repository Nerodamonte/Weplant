import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Link } from "react-router-dom";
import { Home, Layers, LifeBuoy } from "lucide-react";
import "../App.css";

export default function AuthenticatedPage() {
  const [active, setActive] = useState("Trang Chủ");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    if (!token || !userEmail) {
      setError("Bạn chưa đăng nhập!");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/getAll`, // backend không có getByEmail nên fetch tất cả
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Lấy thông tin người dùng thất bại!");
        }

        const result = await response.json();
        const allUsers = result?.data || [];
        const currentUser = allUsers.find((u) => u.email === userEmail);

        if (!currentUser) {
          throw new Error("Không tìm thấy người dùng!");
        }

        setUser(currentUser);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra!");
      }
    };

    fetchUser();
  }, []);

  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="font-sans bg-white max-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="weplant logo" className="w-6 h-6" />
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 leading-snug">
              Chào Mừng Bạn Đến <br /> Với{" "}
              <span className="text-blue-600">Weplant</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Khám phá các giải pháp thiết kế website tùy chỉnh và template sẵn
              có của Weplant. Quản lý dự án của bạn ngay hôm nay!
            </p>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Bắt Đầu Dự Án Mới
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition">
                Khám Phá Template
              </button>
            </div>
          </div>

          {/* Right Profile Card */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200"></div>
              <h2 className="mt-4 font-semibold text-lg text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              {user.phoneNumber && <p className="text-gray-500">{user.phoneNumber}</p>}

              <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                <div className="flex justify-between">
                  <span>Loại tài khoản:</span>
                  <span className="font-medium">{user.role}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 w-full">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Chỉnh Sửa Profile
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
                  Dự Án Của Tôi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Các section khác giữ nguyên như Services, Work Process, Templates, Testimonials, CTA, Footer */}
    </div>
  );
}
