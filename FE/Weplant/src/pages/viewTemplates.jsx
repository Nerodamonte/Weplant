import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function TemplatesPage() {
  const [active, setActive] = useState("Template");
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API = "https://weplant-r8hj.onrender.com/api";

  // Hàm fetch kèm token
  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("authToken") || "";
    return fetch(`${API}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await authFetch("/templates/getAll", { method: "GET" });
        if (!res.ok) throw new Error("Không thể lấy danh sách templates!");
        const result = await res.json();
        setTemplates(result?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="font-sans bg-white">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="weplant logo" className="w-6 h-6" />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

          {/* Menu */}
          <div className="flex gap-8">
            {[
              { label: "Trang Chủ", path: "/" },
              { label: "Dịch Vụ", path: "/services" },
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
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 text-center py-20 mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Khám Phá Các Template Website
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Duyệt qua bộ sưu tập template chuyên nghiệp của Weplant và chọn mẫu
          phù hợp để bắt đầu dự án của bạn!
        </p>
       
      </section>

      {/* Search + Filter */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm website hoặc lĩnh vực..."
            className="flex-grow border rounded-lg px-4 py-2"
          />
          <select className="border rounded-lg px-4 py-2">
            <option>Tất cả lĩnh vực</option>
            <option>Thương mại điện tử</option>
            <option>Blog</option>
            <option>Portfolio</option>
            <option>Doanh nghiệp</option>
            <option>Ẩm thực</option>
            <option>Thể thao</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>Sắp xếp: Mới nhất</option>
            <option>Phổ biến nhất</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Lọc
          </button>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && <p>Đang tải templates...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading &&
          !error &&
          templates.map((tpl) => (
            <div
              key={tpl.templateId}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/templates/${tpl.templateId}`}>
                <div className="h-40 bg-gray-200 cursor-pointer">
                  {tpl.images?.length > 0 ? (
                    <img
                      src={tpl.images[0].imageUrl}
                      alt={tpl.templateName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Không có ảnh
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  to={`/templates/${tpl.templateId}`}
                  className="font-semibold text-lg mb-2 block hover:text-blue-600"
                >
                  {tpl.templateName}
                </Link>
                <p className="text-gray-600 text-sm mb-2">
                  {tpl.description || "Chưa có mô tả"}
                </p>
                <span className="text-xs text-blue-600 font-medium">
                  {tpl.category || "Chưa phân loại"}
                </span>
                <div className="mt-3">
                  <Link
                    to={`/templates/${tpl.templateId}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-20 text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Không tìm thấy template phù hợp?
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy để đội ngũ thiết kế chuyên nghiệp của Weplant tạo ra mẫu website
          riêng cho bạn.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Tạo Dự Án Tùy Chỉnh
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-10">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-white mb-4">Weplant</h3>
            <p>
              Chúng tôi giúp bạn biến ý tưởng thành hiện thực với các giải pháp
              thiết kế website tùy chỉnh.
            </p>
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
              <li>📞 0324 456 789</li>
              <li>📍 123 Nguyễn Huệ, Q1, TP. HCM</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2025 Weplant. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
}
