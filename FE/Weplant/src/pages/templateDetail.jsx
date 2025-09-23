import { Link } from "react-router-dom";

export default function Template1Page() {
  return (
    <div className="min-h-screen bg-black text-gray-100 antialiased">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold">
              WP
            </div>
            <Link to="/" className="text-lg font-semibold text-white">
              Weplant
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/templates" className="text-sm text-gray-300 hover:text-white">
              Templates
            </Link>
            <a href="#features" className="text-sm text-gray-300 hover:text-white">
              Tính năng
            </a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white">
              Giá & Gói
            </a>
            <Link
              to="/login"
              className="ml-2 px-4 py-2 bg-white text-black rounded-md font-medium hover:opacity-90"
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
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Thiết kế hiện đại
            </h1>
            <p className="mt-4 text-gray-300 text-lg max-w-xl">
              Thiết kế mang phong cách hiện đại, tối giản và cực kỳ thân thiện
              với người dùng — tối ưu chuyển đổi, tốc độ tải nhanh và trải nghiệm
              mobile-first. Phù hợp cho startups, công ty công nghệ và agency.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#preview"
                className="px-5 py-3 bg-gray-900/70 border border-gray-700 text-gray-100 rounded-md hover:bg-gray-800"
              >
                Xem bản demo
              </a>
              <a
                href="#pricing"
                className="px-5 py-3 bg-white text-black rounded-md font-medium hover:opacity-95"
              >
                Bắt đầu với 1 click
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
              <li>• Responsive & Mobile-first</li>
              <li>• Tối ưu SEO & performance</li>
              <li>• Tích hợp CMS / Headless-ready</li>
              <li>• Tùy chỉnh dễ dàng (color, font, layout)</li>
            </ul>
          </div>

          {/* Right: preview card */}
          <div className="w-full md:w-96 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-4 shadow-lg">
            <div className="h-48 rounded-lg overflow-hidden bg-black">
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954108875-64046358-7187-499d-a706-b928df77e312.png"
                alt="Thiết kế hiện đại preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white">Thiết kế hiện đại</h3>
              <p className="text-sm text-gray-400 mt-1">
                Giao diện sạch, tối giản, tối ưu UX cho sản phẩm công nghệ.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-800 text-xs rounded-full">Demo</span>
                <span className="px-3 py-1 bg-gray-800 text-xs rounded-full">Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Preview */}
      <section id="preview" className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white">Ảnh minh họa</h2>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Một vài màn hình demo từ template — click để xem lớn hơn.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954108875-64046358-7187-499d-a706-b928df77e312.png"
                alt="preview-1"
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
              <img
                src="https://ufdixqatifrwwcofjxlx.supabase.co/storage/v1/object/public/WeplantStorage/images/1/1757954111026-0148155e-e0f5-4850-ba1f-d426e9bb351b.png"
                alt="preview-2"
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
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
            <h3 className="text-2xl font-bold text-white">Tại sao chọn template này?</h3>
            <p className="text-gray-400 mt-3">
              Template được thiết kế tập trung vào hiệu suất và chuyển đổi. Phù hợp
              cho đội ngũ kỹ thuật và marketing, dễ chỉnh sửa và mở rộng.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-sm">⚡</span>
                <div>
                  <div className="font-medium text-white">Tốc độ cao</div>
                  <div className="text-sm text-gray-400">Tối ưu hình ảnh, lazy load và CSS tối giản.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-sm">🔒</span>
                <div>
                  <div className="font-medium text-white">Bảo mật</div>
                  <div className="text-sm text-gray-400">Tương thích với hệ thống auth, JWT-ready.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block mt-1 w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-sm">📱</span>
                <div>
                  <div className="font-medium text-white">Responsive</div>
                  <div className="text-sm text-gray-400">Trải nghiệm mượt trên mobile và tablet.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white">Thông số kỹ thuật</h4>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="p-3 bg-gray-800 rounded">
                <div className="text-xs text-gray-400">Layout</div>
                <div className="font-medium">Grid / Flex</div>
              </div>
              <div className="p-3 bg-gray-800 rounded">
                <div className="text-xs text-gray-400">Ngôn ngữ</div>
                <div className="font-medium">React + Tailwind</div>
              </div>
              <div className="p-3 bg-gray-800 rounded">
                <div className="text-xs text-gray-400">Tương thích</div>
                <div className="font-medium">Chrome, Safari, Edge</div>
              </div>
              <div className="p-3 bg-gray-800 rounded">
                <div className="text-xs text-gray-400">Ảnh</div>
                <div className="font-medium">Supabase storage</div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#pricing"
                className="inline-block px-4 py-3 bg-white text-black rounded-md font-medium"
              >
                Mua ngay / Tải về
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-white">Bắt đầu</h3>
          <p className="text-gray-400 mt-2">Chọn gói phù hợp cho dự án của bạn.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-sm text-gray-400">Starter</div>
              <div className="text-2xl font-bold mt-2">0 VNĐ</div>
              <p className="text-gray-400 mt-2 text-sm">Dùng thử cơ bản, có watermark.</p>
              <button className="mt-4 w-full px-4 py-2 bg-white text-black rounded-md">Chọn</button>
            </div>
            <div className="bg-white text-black rounded-xl p-6 shadow-lg">
              <div className="text-sm text-gray-600">Pro</div>
              <div className="text-2xl font-bold mt-2">2.500.000 VNĐ</div>
              <p className="text-gray-600 mt-2 text-sm">Gói phổ biến: full features, support.</p>
              <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-md">Chọn</button>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-sm text-gray-400">Enterprise</div>
              <div className="text-2xl font-bold mt-2">Liên hệ</div>
              <p className="text-gray-400 mt-2 text-sm">Tùy chỉnh theo nhu cầu doanh nghiệp.</p>
              <button className="mt-4 w-full px-4 py-2 bg-white text-black rounded-md">Liên hệ</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="site-footer" className="mt-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold">
                WP
              </div>
              <div>
                <div className="font-bold text-white">Weplant</div>
                <div className="text-sm text-gray-400">Thiết kế & template cho startup</div>
              </div>
            </div>

            <p className="text-gray-400 mt-4 text-sm">
              Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. HCM
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">Liên kết</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
              <li><a href="#features" className="text-gray-400 hover:text-white">Tính năng</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">Hỗ trợ</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-gray-400">support@weplant.com</li>
              <li className="text-gray-400">+84 324 456 789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div>© {new Date().getFullYear()} Weplant. All rights reserved.</div>
            <div className="mt-2 md:mt-0">
              <a href="#" className="mr-4 hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
