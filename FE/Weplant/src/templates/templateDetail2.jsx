import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Template3Page() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Weplant Logo" className="h-16 w-auto object-contain" />
            <span className="font-bold text-blue-600 text-xl">Weplant</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-gray-700">
            <Link to="/" className="hover:text-blue-600">Trang Chủ</Link>
            <Link to="/templates" className="hover:text-blue-600">Templates</Link>
            <Link to="/about" className="hover:text-blue-600">Về Chúng Tôi</Link>
            <Link to="/contact" className="hover:text-blue-600">Liên Hệ</Link>
          </nav>
          <Link to="/create-project" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
            Tạo Dự Án
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Xanh Biển Thơ Mộng</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Template website với gam màu xanh dương dịu nhẹ, tạo cảm giác thư thái và chuyên nghiệp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-project" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Sử Dụng Ngay
            </Link>
            <Link to="/templates" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Xem Thêm Templates
            </Link>
          </div>
        </div>
        {/* Ocean wave background */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDUwQzIwIDQwIDQwIDMwIDYwIDIwQzgwIDEwIDEwMCAwIDEwMCAwTDk2IDUwSDB6IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div>
      </section>

      {/* Template Preview - Centered, no image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Thiết Kế Tối Giản & Hiện Đại</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Với gam màu xanh dương mát mẻ lấy cảm hứng từ đại dương, template này mang đến sự thư thái cho người dùng. Phù hợp cho blog cá nhân, portfolio nghệ sĩ, hoặc website du lịch biển.
              </p>
              <ul className="space-y-2 mb-6 max-w-md mx-auto text-left">
                <li className="flex items-center gap-2 text-teal-600">• Tối ưu responsive trên mobile</li>
                <li className="flex items-center gap-2 text-teal-600">• Tích hợp dễ dàng với CMS</li>
                <li className="flex items-center gap-2 text-teal-600">• Tốc độ load nhanh dưới 2s</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Tùy Chỉnh</button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">Tải Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Tính Năng Nổi Bật</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giao Diện Thư Thái</h3>
              <p className="text-gray-600">Màu xanh dương dịu nhẹ giúp người dùng cảm thấy thoải mái khi duyệt web.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hình Ảnh Chất Lượng Cao</h3>
              <p className="text-gray-600">Tích hợp gallery ảnh biển xanh sống động, dễ dàng tùy chỉnh.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tốc Độ Tối Ưu</h3>
              <p className="text-gray-600">Code nhẹ, load nhanh, phù hợp cho mọi thiết bị.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Gallery Preview</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src={`https://via.placeholder.com/400x300/87CEEB/4682B4?text=Ocean+Image+${i+1}`}
                alt={`Gallery ${i+1}`}
                className="rounded-lg shadow-md hover:shadow-lg transition w-full h-48 object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Phản Hồi Từ Khách Hàng</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600 mb-4">"Template này mang đến cảm giác biển cả tuyệt vời cho blog du lịch của tôi!"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                <span className="font-semibold">Lan Nguyen</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600 mb-4">"Màu sắc mát mẻ, dễ tùy chỉnh. Rất hài lòng!"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                <span className="font-semibold">Minh Tran</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-gray-600 mb-4">"Hoàn hảo cho portfolio nhiếp ảnh biển."</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                <span className="font-semibold">Hoa Le</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Giá Cả</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">500.000 VNĐ</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li>• Template cơ bản</li>
                <li>• 1 năm hỗ trợ</li>
                <li>• Tùy chỉnh màu</li>
              </ul>
              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">Mua Ngay</button>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-cyan-200 p-6 rounded-xl text-center border-2 border-teal-500">
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">1.200.000 VNĐ</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li>• Tất cả Basic</li>
                <li>• Hỗ trợ vô hạn</li>
                <li>• Tích hợp CMS</li>
              </ul>
              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">Mua Ngay</button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">2.500.000 VNĐ</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li>• Tất cả Premium</li>
                <li>• Tùy chỉnh full</li>
                <li>• Đào tạo team</li>
              </ul>
              <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">Mua Ngay</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Bắt Đầu?</h2>
          <p className="text-xl mb-8">Hãy tạo dự án với template biển xanh này và biến ý tưởng thành hiện thực.</p>
          <Link to="/create-project" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Tạo Dự Án Ngay
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-bold text-white text-2xl mb-4">Weplant</h3>
          <p className="mb-6">© 2025 Weplant. Tất cả quyền được bảo lưu.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/privacy" className="hover:text-white">Chính Sách Bảo Mật</Link>
            <Link to="/terms" className="hover:text-white">Điều Khoản Dịch Vụ</Link>
            <Link to="/contact" className="hover:text-white">Liên Hệ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}