import { Link } from "react-router-dom";
import { useState } from "react";

export default function Template2Page() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`min-h-screen font-serif antialiased ${theme === "dark" ? "bg-green-900 text-green-100" : "bg-green-50 text-green-900"}`} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme === "dark" ? "bg-green-900/90 border-green-800" : "bg-green-50/90 border-green-200"} backdrop-blur-sm border-b`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${theme === "dark" ? "bg-gradient-to-br from-green-800 to-green-700" : "bg-gradient-to-br from-green-200 to-green-300"}`}>
              WP
            </div>
            <Link to="/" className={`text-lg font-semibold ${theme === "dark" ? "text-green-50" : "text-green-900"}`}>
              Weplant
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/templates" className={`text-sm ${theme === "dark" ? "text-green-200 hover:text-white" : "text-green-600 hover:text-green-900"}`}>
              Templates
            </Link>
            <a href="#features" className={`text-sm ${theme === "dark" ? "text-green-200 hover:text-white" : "text-green-600 hover:text-green-900"}`}>
              Tính năng
            </a>
            <a href="#pricing" className={`text-sm ${theme === "dark" ? "text-green-200 hover:text-white" : "text-green-600 hover:text-green-900"}`}>
              Giá & Gói
            </a>
            <Link
              to="/login"
              className={`ml-2 px-4 py-2 rounded-md font-medium ${theme === "dark" ? "bg-green-100 text-green-900 hover:bg-green-200" : "bg-green-600 text-white hover:bg-green-700"}`}
            >
              Đăng Nhập
            </Link>
            <button
              onClick={toggleTheme}
              className={`ml-2 px-4 py-2 rounded-md font-medium ${theme === "dark" ? "bg-green-700 text-white" : "bg-green-200 text-green-900"}`}
            >
              {theme === "dark" ? "Sáng" : "Tối"}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>
              Thiết kế cổ trang
            </h1>
            <p className={`mt-4 text-lg max-w-xl ${theme === "dark" ? "text-green-200" : "text-green-700"}`}>
              Đưa người dùng trở về thập niên 80, 90 với phong cách hoài cổ, sang
              trọng và đầy cảm xúc. Thích hợp cho các dự án nghệ thuật, bảo tàng,
              và website mang dấu ấn thời gian.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#preview"
                className={`px-5 py-3 rounded-md ${theme === "dark" ? "bg-green-800/80 border border-green-700 text-green-50 hover:bg-green-900" : "bg-green-100 border border-green-300 text-green-900 hover:bg-green-200"}`}
              >
                Xem bản demo
              </a>
              <a
                href="#pricing"
                className={`px-5 py-3 rounded-md font-medium ${theme === "dark" ? "bg-green-100 text-green-900 hover:bg-green-200" : "bg-green-600 text-white hover:bg-green-700"}`}
              >
                Bắt đầu ngay
              </a>
            </div>

            <ul className={`mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
              <li>• Giao diện mang hơi hướng hoài cổ</li>
              <li>• Tông màu xanh lá nhạt sang trọng</li>
              <li>• Tùy chỉnh linh hoạt cho nghệ thuật</li>
              <li>• Tối ưu trải nghiệm thị giác</li>
            </ul>
          </div>

          {/* Right: preview card */}
          <div className={`w-full md:w-96 rounded-2xl p-4 shadow-lg ${theme === "dark" ? "bg-gradient-to-b from-green-800 to-green-700 border-green-600" : "bg-gradient-to-b from-green-100 to-green-200 border-green-300"} border`}>
            <div className={`h-48 rounded-lg overflow-hidden ${theme === "dark" ? "bg-green-900" : "bg-green-50"}`}>
              <p className={`w-full h-full flex items-center justify-center italic ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                Chưa có ảnh minh họa
              </p>
            </div>
            <div className="mt-4">
              <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Thiết kế cổ trang</h3>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
                Mang đậm chất nghệ thuật truyền thống và dấu ấn lịch sử.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>Retro</span>
                <span className={`px-3 py-1 text-xs rounded-full ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>Classic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Preview */}
      <section id="preview" className={`py-12 ${theme === "dark" ? "border-t border-green-800" : "border-t border-green-200"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Ảnh minh họa</h2>
          <p className={`mt-2 max-w-2xl ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
            Một vài màn hình demo (chưa có hình chính thức).
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden h-56 flex items-center justify-center italic ${theme === "dark" ? "bg-green-800 border-green-700 text-green-400" : "bg-green-100 border-green-300 text-green-600"} border`}
              >
                Hình demo {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Điểm nổi bật</h3>
            <p className={`mt-3 ${theme === "dark" ? "text-green-200" : "text-green-700"}`}>
              Template này được thiết kế với cảm hứng từ văn hóa truyền thống,
              giúp khơi gợi cảm xúc và tăng tính nghệ thuật cho website.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>🎨</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Phong cách hoài cổ</div>
                  <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Tông màu xanh lá nhạt, typography retro.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>🏛️</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Mang dấu ấn lịch sử</div>
                  <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Gợi nhớ không khí hoài niệm của thế kỷ trước.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>📜</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Thích hợp cho nghệ thuật</div>
                  <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Phù hợp cho bảo tàng, nghệ sĩ, triển lãm.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-green-800 border-green-700" : "bg-green-100 border-green-300"} border`}>
            <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Thông số kỹ thuật</h4>
            <div className={`mt-4 grid grid-cols-2 gap-3 text-sm ${theme === "dark" ? "text-green-200" : "text-green-700"}`}>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Layout</div>
                <div className="font-medium">Grid / Flex</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Ngôn ngữ</div>
                <div className="font-medium">React + Tailwind</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Tương thích</div>
                <div className="font-medium">Chrome, Safari, Edge</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-green-700" : "bg-green-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Hình ảnh</div>
                <div className="font-medium">Custom / Retro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-12 ${theme === "dark" ? "border-t border-green-800" : "border-t border-green-200"}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Bắt đầu</h3>
          <p className={`mt-2 ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Chọn gói phù hợp cho dự án của bạn.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-green-800 border-green-700" : "bg-green-100 border-green-300"} border`}>
              <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Starter</div>
              <div className="text-2xl font-bold mt-2">Miễn phí</div>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Bản dùng thử cơ bản.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-green-100 text-green-900" : "bg-green-600 text-white"}`}>Chọn</button>
            </div>
            <div className={`rounded-xl p-6 shadow-lg ${theme === "dark" ? "bg-green-700 text-green-50" : "bg-green-600 text-white"}`}>
              <div className="text-sm">Pro</div>
              <div className="text-2xl font-bold mt-2">2.000.000 VNĐ</div>
              <p className="mt-2 text-sm">Full features + hỗ trợ 24/7.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-green-100 text-green-900" : "bg-green-100 text-green-900"}`}>Chọn</button>
            </div>
            <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-green-800 border-green-700" : "bg-green-100 border-green-300"} border`}>
              <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Enterprise</div>
              <div className="text-2xl font-bold mt-2">Liên hệ</div>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Tùy chỉnh theo yêu cầu.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-green-100 text-green-900" : "bg-green-600 text-white"}`}>Liên hệ</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`mt-16 ${theme === "dark" ? "bg-green-900 border-green-800" : "bg-green-50 border-green-200"} border-t`}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${theme === "dark" ? "bg-gradient-to-br from-green-800 to-green-700" : "bg-gradient-to-br from-green-200 to-green-300"}`}>
                WP
              </div>
              <div>
                <div className={`font-bold ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Weplant</div>
                <div className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Thiết kế & template phong cách cổ trang</div>
              </div>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>Địa chỉ: 45 Tràng Tiền, Hà Nội</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className={`font-semibold mb-4 ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Liên kết</h4>
            <ul className="space-y-3">
              <li><Link to="/templates" className={`${theme === "dark" ? "text-green-200 hover:text-green-50" : "text-green-600 hover:text-green-900"}`}>Templates</Link></li>
              <li><a href="#features" className={`${theme === "dark" ? "text-green-200 hover:text-green-50" : "text-green-600 hover:text-green-900"}`}>Tính năng</a></li>
              <li><Link to="/contact" className={`${theme === "dark" ? "text-green-200 hover:text-green-50" : "text-green-600 hover:text-green-900"}`}>Liên hệ</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className={`font-semibold mb-4 ${theme === "dark" ? "text-green-100" : "text-green-900"}`}>Hỗ trợ</h4>
            <ul className="space-y-3">
              <li className={`${theme === "dark" ? "text-green-200" : "text-green-600"}`}>contact.weplant@gmail.com</li>
              <li className={`${theme === "dark" ? "text-green-200" : "text-green-600"}`}>+94 772 2102</li>
            </ul>
          </div>
        </div>

        <div className={`mt-6 pt-4 border-t ${theme === "dark" ? "border-green-800 text-green-300" : "border-green-200 text-green-600"} text-center`}>
          <p>© {new Date().getFullYear()} Weplant. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className={`${theme === "dark" ? "text-green-300 hover:text-green-50" : "text-green-600 hover:text-green-900"} hover:underline`}>Terms</a>
            <a href="#" className={`${theme === "dark" ? "text-green-300 hover:text-green-50" : "text-green-600 hover:text-green-900"} hover:underline`}>Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}