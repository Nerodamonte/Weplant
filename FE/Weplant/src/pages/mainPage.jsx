import { useState } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Layers, LifeBuoy } from "lucide-react";
import "../App.css";
export default function App() {
  const [active, setActive] = useState("Trang Chủ");

  return (
    <div className="font-sans bg-white min-h-screen">
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

          {/* Login */}
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-20 py-20 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-snug mr-28.5 text-center ">
            Thiết Kế Web Theo <br />
            <span className="text-blue-600">Ý Tưởng Của Bạn</span>
          </h1>
          <p className="text-gray-600 text-center mt-4 max-w-lg">
            Weplant giúp bạn biến ý tưởng thành hiện thực với các giải pháp
            thiết kế website tuỳ chỉnh và template sẵn có. Bắt đầu dự án của bạn
            ngay hôm nay!
          </p>
          <div className="flex gap-4 mt-6 ml-22.5">
            <Button className="bg-blue-600 text-white rounded-xl px-6 py-3 shadow">
              Bắt Đầu Dự Án
            </Button>
            <Button className="bg-gray-100 text-gray-700 rounded-xl px-6 py-3 shadow">
              Khám Phá Template
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://img.freepik.com/free-vector/website-creator-concept-illustration_114360-2799.jpg"
            alt="hero"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Services */}
      <section className="px-8 py-16 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Chúng tôi cung cấp đầy đủ các giải pháp thiết kế website để đáp ứng
          mọi nhu cầu của bạn
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20">
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Home className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Thiết Kế Theo Yêu Cầu</h3>
              <p className="text-gray-600 text-sm">
                Đội ngũ thiết kế chuyên nghiệp của chúng tôi sẽ tạo ra website
                đặc thù theo đúng yêu cầu và thương hiệu của bạn.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Layers className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Template Sẵn Có</h3>
              <p className="text-gray-600 text-sm">
                Tiết kiệm thời gian với bộ sưu tập template chất lượng cao, dễ
                dàng tuỳ chỉnh cho nhu cầu của bạn.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <LifeBuoy className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Tư Vấn & Hỗ Trợ</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn từ giai đoạn lên ý tưởng đến
                khi website hoàn thiện và vận hành.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Work Process */}
      <section className="px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Quy Trình Làm Việc</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Chỉ với 4 bước đơn giản, bạn sẽ có website như mong muốn
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Trao Đổi Ý Tưởng", "Thiết Kế Mẫu", "Phát Triển", "Ra Mắt"].map(
            (step, i) => (
              <Card
                key={i}
                className="rounded-xl shadow-md hover:shadow-lg transition"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Featured Templates */}
      <section className="px-8 py-16 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Template Nổi Bật</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Khám phá bộ sưu tập template đa dạng và chuyên nghiệp của chúng tôi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Design with Templates",
              desc: "Template chuyên nghiệp dành cho doanh nghiệp và dịch vụ tài chính.",
              price: "2.500.000 VNĐ",
            },
            {
              title: "Custom Design",
              desc: "Giải pháp lý tưởng cho nghệ sĩ và nhà sáng tạo muốn trưng bày tác phẩm.",
              price: "1.500.000 VNĐ",
            },
          ].map((tpl, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <CardContent className="p-6 text-left">
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <h3 className="font-semibold text-lg mb-2">{tpl.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tpl.desc}</p>
                <p className="text-blue-600 font-bold mb-2">{tpl.price}</p>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Xem Chi Tiết →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="mt-10 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl shadow">
          Xem Tất Cả Template
        </Button>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-gray-600 italic mb-4">
              “Weplant đã giúp chúng tôi có một website chuyên nghiệp, khách
              hàng dễ dàng tìm kiếm sản phẩm hơn.”
            </p>
            <h3 className="font-semibold">Nguyễn Văn An</h3>
            <p className="text-sm text-gray-500">CEO, Tech Solutions</p>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-gray-600 italic mb-4">
              “Template Shop Master của Weplant dễ sử dụng, thiết kế đẹp mắt và
              rất hữu ích cho việc bán hàng trực tuyến.”
            </p>
            <h3 className="font-semibold">Trần Thị Minh</h3>
            <p className="text-sm text-gray-500">Chủ Shop, Minh Beauty</p>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-gray-600 italic mb-4">
              “Với sự hỗ trợ nhiệt tình, đội ngũ Weplant đã tạo ra một website
              tuyệt vời giúp tôi mở rộng kinh doanh.”
            </p>
            <h3 className="font-semibold">Lê Quang Huy</h3>
            <p className="text-sm text-gray-500">Nhà sáng lập, HuyStore</p>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Sẵn Sàng Để Bắt Đầu Dự Án Của Bạn?
        </h2>
        <p className="mb-8">
          Hãy để chúng tôi giúp bạn xây dựng website ấn tượng phù hợp với thương
          hiệu và mục tiêu kinh doanh.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100">
            Liên Hệ Ngay
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Tìm Hiểu Thêm
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300">
        {/* Grid chia 4 cột */}
        <div className="grid md:grid-cols-4 gap-8 px-10 lg:px-20 py-12">
          <div>
            <h3 className="font-bold text-white mb-4">weplant</h3>
            <p>
              Chúng tôi giúp bạn biến ý tưởng thành hiện thực với các giải pháp
              thiết kế website tùy chỉnh.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
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
              <li>📧 support@weplant.com</li>
              <li>📞 0123 456 789</li>
              <li>📍 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        {/* Dòng cuối */}
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
