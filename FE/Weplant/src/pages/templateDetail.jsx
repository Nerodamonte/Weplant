import { Link } from "react-router-dom";
import { useState } from "react";

export default function Template1Page() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`min-h-screen antialiased ${theme === "dark" ? "bg-black text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme === "dark" ? "bg-black/80 border-gray-800" : "bg-white/80 border-gray-200"} backdrop-blur-sm border-b`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-600" : "bg-gradient-to-br from-gray-200 to-gray-400"}`}>
              WP
            </div>
            <Link to="/" className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Weplant
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/templates" className={`text-sm ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
              Templates
            </Link>
            <a href="#features" className={`text-sm ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
              Tính năng
            </a>
            <a href="#pricing" className={`text-sm ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
              Giá & Gói
            </a>
            <Link
              className={`ml-2 px-4 py-2 rounded-md font-medium ${theme === "dark" ? "bg-white text-black hover:opacity-90" : "bg-gray-900 text-white hover:opacity-90"}`}
            >
              Đăng Nhập
            </Link>
            <button
              onClick={toggleTheme}
              className={`ml-2 px-4 py-2 rounded-md font-medium ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
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
            <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Thiết kế hiện đại
            </h1>
            <p className={`mt-4 text-lg max-w-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Thiết kế mang phong cách hiện đại, tối giản và cực kỳ thân thiện
              với người dùng — tối ưu chuyển đổi, tốc độ tải nhanh và trải nghiệm
              mobile-first. Phù hợp cho startups, công ty công nghệ và agency.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#preview"
                className={`px-5 py-3 rounded-md ${theme === "dark" ? "bg-gray-900/70 border border-gray-700 text-gray-100 hover:bg-gray-800" : "bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200"}`}
              >
                Xem bản demo
              </a>
              <a
                href="#pricing"
                className={`px-5 py-3 rounded-md font-medium ${theme === "dark" ? "bg-white text-black hover:opacity-95" : "bg-gray-900 text-white hover:opacity-95"}`}
              >
                Bắt đầu với 1 click
              </a>
            </div>

            <ul className={`mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              <li>• Responsive & Mobile-first</li>
              <li>• Tối ưu SEO & performance</li>
              <li>• Tích hợp CMS / Headless-ready</li>
              <li>• Tùy chỉnh dễ dàng (color, font, layout)</li>
            </ul>
          </div>

          {/* Right: preview card */}
          <div className={`w-full md:w-96 rounded-2xl p-4 shadow-lg ${theme === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300"} border`}>
            <div className={`h-48 rounded-lg overflow-hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}>
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954108875-64046358-7187-499d-a706-b928df77e312.png"
                alt="Thiết kế hiện đại preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Thiết kế hiện đại</h3>
              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Giao diện sạch, tối giản, tối ưu UX cho sản phẩm công nghệ.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>Demo</span>
                <span className={`px-3 py-1 text-xs rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Preview */}
      <section id="preview" className={`py-12 ${theme === "dark" ? "border-t border-gray-800" : "border-t border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Ảnh minh họa</h2>
          <p className={`text mt-2 max-w-2xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Một vài màn hình demo từ template — click để xem lớn hơn.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`rounded-lg overflow-hidden border ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954108875-64046358-7187-499d-a706-b928df77e312.png"
                alt="preview-1"
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className={`rounded-lg overflow-hidden border ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954111026-0148155e-e0f5-4850-ba1f-d426e9bb351b.png"
                alt="preview-2"
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className={`rounded-lg overflow-hidden border ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954111279-a0cc5380-89c5-4fe6-8dbd-bd28d5e88b29.png"
                alt="preview-3"
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Tại sao chọn template này?</h3>
            <p className={`text mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Template được thiết kế tập trung vào hiệu suất và chuyển đổi. Phù hợp
              cho đội ngũ kỹ thuật và marketing, dễ chỉnh sửa và mở rộng.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>⚡</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Tốc độ cao</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Tối ưu hình ảnh, lazy load và CSS tối giản.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>🔒</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Bảo mật</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Tương thích với hệ thống auth, JWT-ready.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className={`inline-block mt-1 w-8 h-8 rounded-md flex items-center justify-center text-sm ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>📱</span>
                <div>
                  <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Responsive</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Trải nghiệm mượt trên mobile và tablet.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"} border`}>
            <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Thông số kỹ thuật</h4>
            <div className={`mt-4 grid grid-cols-2 gap-3 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Layout</div>
                <div className="font-medium">Grid / Flex</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Ngôn ngữ</div>
                <div className="font-medium">React + Tailwind</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Tương thích</div>
                <div className="font-medium">Chrome, Safari, Edge</div>
              </div>
              <div className={`p-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Ảnh</div>
                <div className="font-medium">Supabase storage</div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#pricing"
                className={`inline-block px-4 py-3 rounded-md font-medium ${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
              >
                Mua ngay / Tải về
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className={`py-12 ${theme === "dark" ? "border-t border-gray-800" : "border-t border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Bắt đầu</h3>
          <p className={`text mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Chọn gói phù hợp cho dự án của bạn.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"} border`}>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Starter</div>
              <div className="text-2xl font-bold mt-2">0 VNĐ</div>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Dùng thử cơ bản, có watermark.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>Chọn</button>
            </div>
            <div className={`rounded-xl p-6 shadow-lg ${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
              <div className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>Pro</div>
              <div className="text-2xl font-bold mt-2">2.500.000 VNĐ</div>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>Gói phổ biến: full features, support.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>Chọn</button>
            </div>
            <div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"} border`}>
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Enterprise</div>
              <div className="text-2xl font-bold mt-2">Liên hệ</div>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Tùy chỉnh theo nhu cầu doanh nghiệp.</p>
              <button className={`mt-4 w-full px-4 py-2 rounded-md ${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"}`}>Liên hệ</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="site-footer" className={`mt-16 ${theme === "dark" ? "bg-black border-gray-900" : "bg-white border-gray-200"} border-t`}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-600" : "bg-gradient-to-br from-gray-200 to-gray-400"}`}>
                WP
              </div>
              <div>
                <div className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Weplant</div>
                <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Thiết kế & template cho startup</div>
              </div>
            </div>

            <p className={`text-sm mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. HCM
            </p>
          </div>

          <div>
            <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Liên kết</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/templates" className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Templates</Link></li>
              <li><a href="#features" className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Tính năng</a></li>
              <li><Link to="/contact" className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Hỗ trợ</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>support@weplant.com</li>
              <li className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>+84 324 456 789</li>
            </ul>
          </div>
        </div>

        <div className={`border-t py-4 ${theme === "dark" ? "border-gray-900" : "border-gray-200"}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
            <div className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>© {new Date().getFullYear()} Weplant. All rights reserved.</div>
            <div className="mt-2 md:mt-0">
              <a href="#" className={`mr-4 hover:underline ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Terms</a>
              <a href="#" className={`hover:underline ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}