// src/pages/TemplateDetail3.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TemplateDetail3() {
  return (
    <div className="min-h-screen bg-black text-gray-100 antialiased">
      {/* ---------- Header ---------- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-black font-bold">
              WP
            </div>
            <Link to="/" className="text-lg font-semibold text-white">
              Weplant
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/templates" className="text-sm text-green-200 hover:text-white">
              Templates
            </Link>
            <a href="#features" className="text-sm text-green-200 hover:text-white">
              Tính năng
            </a>
            <a href="#pricing" className="text-sm text-green-200 hover:text-white">
              Giá & Gói
            </a>
            <Link
              to="/login"
              className="ml-2 px-4 py-2 bg-green-400 text-black rounded-md font-medium hover:opacity-95"
            >
              Đăng Nhập
            </Link>
          </nav>

          <div className="md:hidden">
            <Link to="/templates" className="px-3 py-2 bg-green-600 rounded-md text-black text-sm font-medium">
              Templates
            </Link>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <main className="pt-28">
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-400">
                Template Tech — Công nghệ cao
              </h1>
              <p className="mt-4 text-gray-300 text-lg max-w-xl">
                Giao diện chuyên cho startup, SaaS, AI và công ty công nghệ. Thiết kế
                tối giản, trải nghiệm tối ưu trên mobile và desktop, tốc độ cao và SEO-ready.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#preview"
                  className="px-5 py-3 bg-black border border-green-700 text-green-200 rounded-md hover:bg-green-900/20 transition"
                >
                  Xem bản demo
                </a>
                <a
                  href="#pricing"
                  className="px-5 py-3 bg-green-400 text-black rounded-md font-medium hover:opacity-95"
                >
                  Bắt đầu với 1 click
                </a>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                <li>• Thiết kế tối giản, tập trung chuyển đổi</li>
                <li>• Tương thích SSR / SSG / Headless CMS</li>
                <li>• Component-driven, dễ tuỳ biến</li>
                <li>• Tối ưu hình ảnh & lazy-load</li>
              </ul>
            </div>

            <div className="w-full md:w-auto">
              <div className="bg-gradient-to-br from-green-800 to-green-600 border border-green-700 rounded-2xl p-4 shadow-lg">
                <div className="h-56 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1526378720049-01f3d1c6b7f4?auto=format&fit=crop&w=1600&q=60"
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white">Template Tech</h3>
                  <p className="text-sm text-gray-200 mt-1">Giao diện cho sản phẩm công nghệ và SaaS.</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="px-3 py-1 bg-black text-xs rounded-full border border-green-700">Dark</span>
                    <span className="px-3 py-1 bg-black text-xs rounded-full border border-green-700">Responsive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Preview / Gallery ---------- */}
        <section id="preview" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white">Ảnh minh họa</h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Một vài màn hình demo từ template — click để xem lớn hơn.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60",
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=60",
                "https://images.unsplash.com/photo-1508385082359-f0b3d8a33a1b?auto=format&fit=crop&w=1400&q=60",
                "https://images.unsplash.com/photo-1517148815978-75f6acaaff06?auto=format&fit=crop&w=1400&q=60",
                "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=60",
                "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?auto=format&fit=crop&w=1400&q=60",
              ].map((src, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                  <img src={src} alt={`preview-${idx}`} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section id="features" className="py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Tại sao chọn template này?</h3>
              <p className="text-gray-400 mt-3">
                Template được tối ưu cho sản phẩm công nghệ: layout rõ ràng, CTA mạnh, tốc độ và SEO.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-green-700 rounded-md flex items-center justify-center text-black font-bold">A</div>
                  <div>
                    <div className="font-medium text-white">Thiết kế hiện đại</div>
                    <div className="text-sm text-gray-400">Hệ thống component, dễ tuỳ chỉnh, dark-mode-ready.</div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-green-700 rounded-md flex items-center justify-center text-black font-bold">B</div>
                  <div>
                    <div className="font-medium text-white">Tối ưu hiệu suất</div>
                    <div className="text-sm text-gray-400">Code sạch, lazy-load, tree-shaking và critical CSS.</div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-green-700 rounded-md flex items-center justify-center text-black font-bold">C</div>
                  <div>
                    <div className="font-medium text-white">SEO & Accessibility</div>
                    <div className="text-sm text-gray-400">Semantic HTML, meta tags và keyboard-friendly.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white">Thông số kỹ thuật</h4>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300">
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-xs text-gray-400">Framework</div>
                  <div className="font-medium">React + Tailwind</div>
                </div>
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-xs text-gray-400">Tích hợp</div>
                  <div className="font-medium">Supabase / Headless CMS</div>
                </div>
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-xs text-gray-400">Độ phản hồi</div>
                  <div className="font-medium">Desktop / Mobile / Tablet</div>
                </div>
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-xs text-gray-400">Ảnh mẫu</div>
                  <div className="font-medium">Unsplash / Supabase</div>
                </div>
              </div>

              <div className="mt-6">
                <a href="#pricing" className="inline-block px-4 py-3 bg-green-400 text-black rounded-md font-medium">
                  Mua ngay / Bắt đầu
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Long Content (scrollable) ---------- */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            <article className="prose prose-invert max-w-none">
              <h3 className="text-white text-2xl font-bold">Thiết kế & triết lý</h3>
              <p className="text-gray-300">
                Template được xây dựng theo triết lý “Less is more” — tập trung vào nội dung và CTA.
                Sử dụng tông màu xanh lá (green) làm màu nhận diện kết hợp nền tối để tạo cảm giác công nghệ, chuyên nghiệp.
              </p>

              <h4 className="text-white mt-6">Các component chính</h4>
              <ul className="text-gray-300">
                <li>Hero động với illustration / screenshot</li>
                <li>Section tính năng (features) có icon và mô tả</li>
                <li>Grid templates / portfolio</li>
                <li>Pricing card rõ ràng</li>
                <li>FAQ & Contact</li>
              </ul>

              <h4 className="text-white mt-6">Hướng dẫn tùy chỉnh nhanh</h4>
              <p className="text-gray-300">
                - Thay đổi màu chủ đạo trong Tailwind config (green-600 / green-400).<br/>
                - Thay logo / font-face để phù hợp thương hiệu.<br/>
                - Kết nối CMS để quản lý nội dung động.
              </p>

              <div className="h-96 bg-gradient-to-r from-green-900 to-black rounded-xl flex items-center justify-center text-white">
                <div className="text-center px-6">
                  <h5 className="text-xl font-semibold">Ví dụ khu vực dài để cuộn</h5>
                  <p className="mt-2 text-gray-300 max-w-xl">
                    Đây là vùng nội dung dài mô phỏng nhiều đoạn văn giúp kiểm thử độ dài trang và hành vi scroll. Bạn có thể paste nhiều nội dung hơn nếu cần.
                  </p>
                </div>
              </div>

              {/* lặp nhiều đoạn để đảm bảo cuộn */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-900/40 p-6 rounded-lg">
                  <h6 className="text-white font-semibold">Section chi tiết #{i + 1}</h6>
                  <p className="text-gray-300 mt-2">
                    Mô tả chi tiết về tính năng, case-study hoặc hướng dẫn tích hợp. Dùng vùng này để mô tả kỹ thuật hoặc hướng dẫn cấu hình.
                  </p>
                </div>
              ))}
            </article>
          </div>
        </section>

        {/* ---------- Pricing ---------- */}
        <section id="pricing" className="py-16 bg-black border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-white">Bảng giá</h3>
            <p className="text-gray-400 mt-2">Chọn gói phù hợp cho dự án của bạn.</p>

            <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-sm text-gray-400">Starter</div>
                <div className="text-3xl font-bold mt-2 text-white">0 VNĐ</div>
                <p className="text-gray-400 mt-2 text-sm">Dùng thử, watermark, hỗ trợ community.</p>
                <ul className="text-sm text-gray-300 mt-4 space-y-2">
                  <li>• 1 template demo</li>
                  <li>• Basic support</li>
                  <li>• Limited updates</li>
                </ul>
                <button className="mt-6 w-full px-4 py-2 bg-green-600 text-black rounded-md font-medium">Chọn gói</button>
              </div>

              <div className="bg-green-400 text-black rounded-xl p-6 shadow-lg transform scale-100">
                <div className="text-sm text-black/70">Pro</div>
                <div className="text-4xl font-extrabold mt-2">2.500.000 VNĐ</div>
                <p className="text-black/80 mt-2 text-sm">Gói phổ biến: full features, 6 tháng support.</p>
                <ul className="text-sm text-black mt-4 space-y-2">
                  <li>• Source code (React + Tailwind)</li>
                  <li>• 1 year updates</li>
                  <li>• Priority support</li>
                  <li>• 1 customization call</li>
                </ul>
                <button className="mt-6 w-full px-4 py-2 bg-black text-green-400 rounded-md font-medium">Mua ngay</button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-sm text-gray-400">Enterprise</div>
                <div className="text-2xl font-bold mt-2 text-white">Liên hệ</div>
                <p className="text-gray-400 mt-2 text-sm">Tùy chỉnh theo nhu cầu doanh nghiệp, SLA và tích hợp sâu.</p>
                <ul className="text-sm text-gray-300 mt-4 space-y-2">
                  <li>• Multi-site support</li>
                  <li>• Dedicated dev hours</li>
                  <li>• Custom integrations</li>
                </ul>
                <button className="mt-6 w-full px-4 py-2 bg-green-600 text-black rounded-md font-medium">Liên hệ</button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-white">Câu hỏi thường gặp</h3>
            <div className="mt-6 grid gap-4">
              {[
                {
                  q: "Template có hỗ trợ đa ngôn ngữ không?",
                  a: "Có — template xây dựng theo component, hỗ trợ i18n khi kết hợp với thư viện như react-intl hoặc next-i18next."
                },
                {
                  q: "Tôi có thể đổi màu chủ đạo không?",
                  a: "Dễ dàng — chỉnh Tailwind config hoặc CSS variables để đổi theme."
                },
                {
                  q: "Có hướng dẫn cài đặt không?",
                  a: "Có file README chi tiết kèm example để deploy trên Vercel / Netlify / Render."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                  <div className="font-medium text-white">{item.q}</div>
                  <div className="text-gray-300 mt-2 text-sm">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA Footer Invite ---------- */}
        <section className="py-12 bg-gradient-to-tr from-green-800 to-black">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-white">Sẵn sàng bắt đầu?</h3>
            <p className="text-gray-200 mt-2">Mua gói Pro ngay hoặc liên hệ để được tư vấn & tùy chỉnh.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a href="#pricing" className="px-6 py-3 bg-green-400 text-black rounded-lg font-medium">Mua ngay</a>
              <a href="/contact" className="px-6 py-3 border border-green-400 text-green-200 rounded-lg">Liên hệ tư vấn</a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="mt-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-black font-bold">
                WP
              </div>
              <div>
                <div className="font-bold text-white">Weplant</div>
                <div className="text-sm text-gray-400">Template & thiết kế cho startup</div>
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
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>support@weplant.com</li>
              <li>+84 324 456 789</li>
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
