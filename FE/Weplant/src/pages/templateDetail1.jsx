import { Link } from "react-router-dom";

export default function Template2Page() {
  return (
    <div className="min-h-screen bg-yellow-50 text-yellow-900 font-serif antialiased">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-900/90 backdrop-blur-sm border-b border-yellow-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-800 to-yellow-700 flex items-center justify-center text-white font-bold">
              WP
            </div>
            <Link to="/" className="text-lg font-semibold text-yellow-50">
              Weplant
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/templates" className="text-sm text-yellow-200 hover:text-white">
              Templates
            </Link>
            <a href="#features" className="text-sm text-yellow-200 hover:text-white">
              Tính năng
            </a>
            <a href="#pricing" className="text-sm text-yellow-200 hover:text-white">
              Giá & Gói
            </a>
            <Link
              to="/login"
              className="ml-2 px-4 py-2 bg-yellow-100 text-yellow-900 rounded-md font-medium hover:bg-yellow-200"
            >
              Đăng Nhập
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-yellow-900">
              Thiết kế cổ trang
            </h1>
            <p className="mt-4 text-yellow-800 text-lg max-w-xl">
              Đưa người dùng trở về thập niên 80, 90 với phong cách hoài cổ, sang
              trọng và đầy cảm xúc. Thích hợp cho các dự án nghệ thuật, bảo tàng,
              và website mang dấu ấn thời gian.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#preview"
                className="px-5 py-3 bg-yellow-800/80 border border-yellow-700 text-yellow-50 rounded-md hover:bg-yellow-900"
              >
                Xem bản demo
              </a>
              <a
                href="#pricing"
                className="px-5 py-3 bg-yellow-100 text-yellow-900 rounded-md font-medium hover:bg-yellow-200"
              >
                Bắt đầu ngay
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-yellow-700">
              <li>• Giao diện mang hơi hướng hoài cổ</li>
              <li>• Tông màu vàng nâu sang trọng</li>
              <li>• Tùy chỉnh linh hoạt cho nghệ thuật</li>
              <li>• Tối ưu trải nghiệm thị giác</li>
            </ul>
          </div>

          {/* Right: preview card */}
          <div className="w-full md:w-96 bg-gradient-to-b from-yellow-200 to-yellow-100 border border-yellow-300 rounded-2xl p-4 shadow-lg">
            <div className="h-48 rounded-lg overflow-hidden bg-yellow-50">
              <p className="w-full h-full flex items-center justify-center text-yellow-600 italic">
                Chưa có ảnh minh họa
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Thiết kế cổ trang</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Mang đậm chất nghệ thuật truyền thống và dấu ấn lịch sử.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="px-3 py-1 bg-yellow-300 text-xs rounded-full">Retro</span>
                <span className="px-3 py-1 bg-yellow-300 text-xs rounded-full">Classic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Preview */}
      <section id="preview" className="py-12 border-t border-yellow-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold">Ảnh minh họa</h2>
          <p className="text-yellow-700 mt-2 max-w-2xl">
            Một vài màn hình demo (chưa có hình chính thức).
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden bg-yellow-100 border border-yellow-300 h-56 flex items-center justify-center text-yellow-500 italic"
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
            <h3 className="text-2xl font-bold">Điểm nổi bật</h3>
            <p className="text-yellow-800 mt-3">
              Template này được thiết kế với cảm hứng từ văn hóa truyền thống,
              giúp khơi gợi cảm xúc và tăng tính nghệ thuật cho website.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-yellow-200 rounded-md flex items-center justify-center text-sm">
                  🎨
                </span>
                <div>
                  <div className="font-medium">Phong cách hoài cổ</div>
                  <div className="text-sm text-yellow-700">
                    Tông màu vàng nâu, typography retro.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-yellow-200 rounded-md flex items-center justify-center text-sm">
                  🏛️
                </span>
                <div>
                  <div className="font-medium">Mang dấu ấn lịch sử</div>
                  <div className="text-sm text-yellow-700">
                    Gợi nhớ không khí hoài niệm của thế kỷ trước.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-yellow-200 rounded-md flex items-center justify-center text-sm">
                  📜
                </span>
                <div>
                  <div className="font-medium">Thích hợp cho nghệ thuật</div>
                  <div className="text-sm text-yellow-700">
                    Phù hợp cho bảo tàng, nghệ sĩ, triển lãm.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
            <h4 className="text-lg font-semibold">Thông số kỹ thuật</h4>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-yellow-900">
              <div className="p-3 bg-yellow-200 rounded">
                <div className="text-xs text-yellow-700">Layout</div>
                <div className="font-medium">Grid / Flex</div>
              </div>
              <div className="p-3 bg-yellow-200 rounded">
                <div className="text-xs text-yellow-700">Ngôn ngữ</div>
                <div className="font-medium">React + Tailwind</div>
              </div>
              <div className="p-3 bg-yellow-200 rounded">
                <div className="text-xs text-yellow-700">Tương thích</div>
                <div className="font-medium">Chrome, Safari, Edge</div>
              </div>
              <div className="p-3 bg-yellow-200 rounded">
                <div className="text-xs text-yellow-700">Hình ảnh</div>
                <div className="font-medium">Custom / Retro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 border-t border-yellow-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">Bắt đầu</h3>
          <p className="text-yellow-700 mt-2">Chọn gói phù hợp cho dự án của bạn.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
              <div className="text-sm text-yellow-600">Starter</div>
              <div className="text-2xl font-bold mt-2">Miễn phí</div>
              <p className="text-yellow-700 mt-2 text-sm">Bản dùng thử cơ bản.</p>
              <button className="mt-4 w-full px-4 py-2 bg-yellow-800 text-white rounded-md">
                Chọn
              </button>
            </div>
            <div className="bg-yellow-900 text-yellow-50 rounded-xl p-6 shadow-lg">
              <div className="text-sm">Pro</div>
              <div className="text-2xl font-bold mt-2">2.000.000 VNĐ</div>
              <p className="mt-2 text-sm">Full features + hỗ trợ 24/7.</p>
              <button className="mt-4 w-full px-4 py-2 bg-yellow-100 text-yellow-900 rounded-md">
                Chọn
              </button>
            </div>
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
              <div className="text-sm text-yellow-600">Enterprise</div>
              <div className="text-2xl font-bold mt-2">Liên hệ</div>
              <p className="text-yellow-700 mt-2 text-sm">Tùy chỉnh theo yêu cầu.</p>
              <button className="mt-4 w-full px-4 py-2 bg-yellow-800 text-white rounded-md">
                Liên hệ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-yellow-900 text-yellow-50 border-t border-yellow-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-800 to-yellow-700 flex items-center justify-center text-white font-bold">
                WP
              </div>
              <div>
                <div className="font-bold">Weplant</div>
                <div className="text-sm text-yellow-200">
                  Thiết kế & template phong cách cổ trang
                </div>
              </div>
            </div>

            <p className="text-yellow-200 mt-4 text-sm">
              Địa chỉ: 45 Tràng Tiền, Hà Nội
            </p>
          </div>

          <div>
            <div className="font-semibold">Liên kết</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/templates" className="text-yellow-200 hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <a href="#features" className="text-yellow-200 hover:text-white">
                  Tính năng
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-yellow-200 hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Hỗ trợ</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-yellow-200">support@weplant.com</li>
              <li className="text-yellow-200">+84 123 456 789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-800 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-yellow-300">
            <div>© {new Date().getFullYear()} Weplant. All rights reserved.</div>
            <div className="mt-2 md:mt-0">
              <a href="#" className="mr-4 hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
