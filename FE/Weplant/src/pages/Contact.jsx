import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

export default function Contact() {
  // xác định đường dẫn Trang Chủ theo token
  const [homePath, setHomePath] = useState("/");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setHomePath(token ? "/authen" : "/");
  }, []);

  const { pathname } = useLocation();
  const isActive = (path) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* NAVBAR inline */}
      <nav className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="weplant logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

          <div className="flex gap-6 md:gap-8">
            {[
              { label: "Trang Chủ", path: homePath },
              { label: "Dịch Vụ", path: "/pricing" },
              { label: "Template", path: "/templates" },
              { label: "Về Chúng Tôi", path: "/about" },
              { label: "Liên Hệ", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition ${
                  isActive(item.path) ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* giữ khoảng cho navbar fixed */}
      <div className="pt-20">
        {/* Hero */}
        <section className="px-8 py-16 text-center bg-gray-50">
          <h1 className="text-3xl font-bold mb-4">Liên Hệ</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Bạn có ý tưởng hoặc câu hỏi? Hãy liên hệ ngay với chúng tôi qua
            email hoặc số điện thoại dưới đây.
          </p>
        </section>

        {/* Contact Info */}
        <section className="px-8 py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Mail className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">
                <a
                  href="mailto:contact.weplant@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  contact.weplant@gmail.com
                </a>
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Phone className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Điện Thoại</h3>
              <p className="text-gray-600">📞 0123 456 789</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <MapPin className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Địa Chỉ</h3>
              <p className="text-gray-600">
                📍 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER inline */}
      <footer className="w-full bg-gray-900 text-gray-300">
        <div className="grid md:grid-cols-4 gap-8 px-10 lg:px-20 py-12 max-w-7xl mx-auto">
          <div>
            <h3 className="font-bold text-white mb-4">weplant</h3>
            <p>
              Chúng tôi giúp bạn biến ý tưởng thành hiện thực với các giải pháp
              thiết kế website tùy chỉnh.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#">
                <i className="fab fa-facebook" />
              </a>
              <a href="#">
                <i className="fab fa-linkedin" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Dịch Vụ</h4>
            <ul className="space-y-2">
              <li>Thiết Kế Website</li>
              <li>Template Có Sẵn</li>
              <li>Tư Vấn UI/UX</li>
              <li>Bảo Trì Website</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>Trung Tâm Hỗ Trợ</li>
              <li>Câu Hỏi Thường Gặp</li>
              <li>Hướng Dẫn Sử Dụng</li>
              <li>Liên Hệ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-2">
              <li>📧 contact.weplant@gmail.com</li>
              <li>📞 094 7722102</li>
              <li>📍 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 px-10 lg:px-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Weplant. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Điều Khoản Sử Dụng</a>
            <a href="#">Chính Sách Bảo Mật</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
