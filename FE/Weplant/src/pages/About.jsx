import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Users, Target, Rocket } from "lucide-react";
import { Card, CardContent } from "../components/Card";

export default function About() {
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

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">W</span>
            </div>
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

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
        </div>
      </nav>

      {/* nội dung */}
      <div className="pt-20 flex-grow">
        {/* Hero */}
        <section className="px-8 py-16 text-center bg-gray-50">
          <h1 className="text-3xl font-bold mb-4">Về Chúng Tôi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Weplant là đội ngũ chuyên gia thiết kế và phát triển website, mang
            đến giải pháp sáng tạo giúp thương hiệu của bạn tỏa sáng trên môi
            trường số.
          </p>
        </section>

        {/* Mission, Vision, Values */}
        <section className="px-8 py-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Đội Ngũ</h3>
                <p className="text-gray-600 text-sm">
                  Gồm những nhà thiết kế, lập trình viên và chuyên gia UI/UX tận
                  tâm, sáng tạo.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <Target className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Sứ Mệnh</h3>
                <p className="text-gray-600 text-sm">
                  Giúp doanh nghiệp xây dựng hình ảnh thương hiệu ấn tượng trên
                  internet.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-6">
                <Rocket className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Tầm Nhìn</h3>
                <p className="text-gray-600 text-sm">
                  Trở thành đơn vị tiên phong trong lĩnh vực thiết kế web sáng
                  tạo tại Việt Nam.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
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
