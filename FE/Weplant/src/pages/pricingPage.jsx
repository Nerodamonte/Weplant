import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Check, X, Zap } from "lucide-react";

export default function PricingPage() {
  const [active, setActive] = useState("Dịch Vụ");

  // ==== NAV helpers ====
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [homePath, setHomePath] = useState("/");

  useEffect(() => {
    const refreshHome = () => {
      const hasToken = !!localStorage.getItem("authToken");
      setHomePath(hasToken ? "/authen" : "/");
    };
    refreshHome();
    window.addEventListener("storage", refreshHome);
    return () => window.removeEventListener("storage", refreshHome);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    const hasToken = !!localStorage.getItem("authToken");
    navigate(hasToken ? "/authen" : "/");
  };

  const isActive = (path) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  // ==== CTA buttons ====
  const handleSelectPackage = () => {
    const hasToken = !!localStorage.getItem("authToken");
    navigate(hasToken ? "/create-project" : "/login");
  };

  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      {/* Navbar (đã sửa) */}
      <nav className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">W</span>
            </div>
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

          {/* Menu */}
          <div className="flex gap-6 md:gap-8">
            <Link
              to={homePath}
              onClick={handleHomeClick}
              className={`text-sm font-medium transition ${
                isActive("/authen") || isActive("/")
                  ? "text-blue-600"
                  : "text-gray-700"
              } hover:text-blue-600`}
            >
              Trang Chủ
            </Link>

            <Link
              to="/pricing"
              onClick={() => setActive("Dịch Vụ")}
              className={`text-sm font-medium transition ${
                isActive("/pricing") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Dịch Vụ
            </Link>

            <Link
              to="/templates"
              className={`text-sm font-medium transition ${
                isActive("/templates") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Template
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition ${
                isActive("/about") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Về Chúng Tôi
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition ${
                isActive("/contact") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Liên Hệ
            </Link>
          </div>

          {/* User Avatar (giữ nguyên) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
            <span className="text-sm text-gray-600">Xin chào</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Chọn Gói Dịch Vụ Của Bạn
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Chọn gói dịch vụ phù hợp để tạo website hoàn hảo cho bạn: template sẵn
          có hoặc thiết kế tùy chỉnh.
        </p>
      </section>

      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* 2 Gói dịch vụ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Gói Template */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Template Có Sẵn</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                1.500.000 <span className="text-base text-gray-500">VND</span>
              </p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6 text-left">
                <li>✔️ Truy cập toàn bộ thư viện template</li>
                <li>✔️ Hỗ trợ tùy chỉnh cơ bản</li>
                <li>✔️ Thời gian hoàn thành: 1-3 tuần</li>
                <li>✔️ Hỗ trợ kỹ thuật qua email</li>
              </ul>
              <button
                onClick={handleSelectPackage}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Chọn Gói Template
              </button>
            </div>

            {/* Gói Custom */}
            <div className="bg-white border border-blue-300 rounded-2xl shadow-md p-8 text-center relative">
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Phổ Biến
              </span>
              <h3 className="text-lg font-semibold mb-2">Custom Trang Web</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                2.500.000 <span className="text-base text-gray-500">VND</span>
              </p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6 text-left">
                <li>✔️ Thiết kế tùy chỉnh theo yêu cầu</li>
                <li>✔️ Hỗ trợ gửi link tham khảo</li>
                <li>✔️ Thời gian hoàn thành: 20-30 ngày</li>
                <li>✔️ Hỗ trợ email & điện thoại</li>
              </ul>
              <button
                onClick={handleSelectPackage}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Chọn Gói Custom
              </button>
            </div>
          </div>

          {/* Bảng So Sánh */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-center mb-6">
              So Sánh Gói Dịch Vụ
            </h3>
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="text-gray-600 text-sm border-b">
                  <th className="py-3">Tính năng</th>
                  <th className="py-3">Template</th>
                  <th className="py-3">Custom</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b">
                  <td className="py-3">Thời gian hoàn thành</td>
                  <td>1-3 Tuần</td>
                  <td>20-30 ngày</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Mức độ tùy chỉnh</td>
                  <td>Cơ bản</td>
                  <td>Hoàn toàn</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Hỗ trợ kỹ thuật</td>
                  <td>Email</td>
                  <td>Email & Điện thoại</td>
                </tr>
                <tr>
                  <td className="py-3">Gửi link tham khảo</td>
                  <td>❌</td>
                  <td>✔️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mx-6 md:mx-auto md:max-w-4xl">
        <h3 className="text-center font-semibold mb-2 text-gray-800">
          Chưa chắc chắn về lựa chọn?
        </h3>
        <p className="text-center mb-6">
          Khám phá bộ sưu tập template của chúng tôi để có cái nhìn tổng quan
          trước khi quyết định.
        </p>
        <Link
          to="/templates"
          className="px-6 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition flex items-center gap-2 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Xem Thêm Template
        </Link>
      </div>

      {/* Footer (giữ nguyên layout) */}
      <footer className="bg-slate-800 text-gray-300 py-16 px-6 mt-auto">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <span className="text-white font-bold text-xl">weplant</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Tạo website chuyên nghiệp với đội ngũ nhiệt tình, hỗ trợ bạn mọi
              lúc mọi nơi.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Liên Hệ Hỗ Trợ</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contact.weplant@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>094 7722102</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Cần Hỗ Trợ?</h4>
            <p className="text-gray-400 leading-relaxed">
              Chúng tôi sẵn sàng hỗ trợ bạn 24/7 để giúp bạn giải quyết vấn đề
              nhanh chóng và hiệu quả nhất.
            </p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-700">
          © 2025 weplant. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
}
