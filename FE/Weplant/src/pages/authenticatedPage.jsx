import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
export default function AuthenticatedPage() {
  const [active, setActive] = useState("Trang Chủ");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API = "http://45.252.248.204:8080/api";
  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("authToken") || "";
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }
    if (!userEmail) {
      setError("Bạn chưa đăng nhập!");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await authFetch(`${API}/users/getAll`);
        if (res.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          return navigate("/login");
        }
        if (!res.ok) throw new Error("Lấy thông tin người dùng thất bại!");

        const result = await res.json();
        const allUsers = result?.data || [];
        const currentUser = allUsers.find((u) => u.email === userEmail);
        if (!currentUser) throw new Error("Không tìm thấy người dùng!");

        // lưu lại để trang khác dùng
        localStorage.setItem("userId", String(currentUser.userId));
        localStorage.setItem("userEmail", currentUser.email);

        setUser(currentUser);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra!");
      }
    };

    fetchUser();
  }, [navigate]);

  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="font-sans bg-white max-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="weplant logo"
              className="h-16 w-auto object-contain"
            />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>

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
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 leading-snug">
              Chào Mừng Bạn Đến <br /> Với{" "}
              <span className="text-blue-600">Weplant</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Khám phá các giải pháp thiết kế website tùy chỉnh và template sẵn
              có của Weplant. Quản lý dự án của bạn ngay hôm nay!
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() =>
                  navigate("/create-project", {
                    state: { userId: user.userId },
                  })
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Bắt Đầu Dự Án Mới
              </button>
              <button
                onClick={() => navigate("/templates")}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
              >
                Khám Phá Template
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200"></div>
              <h2 className="mt-4 font-semibold text-lg text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              {user.phoneNumber && (
                <p className="text-gray-500">{user.phoneNumber}</p>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                <div className="flex justify-between">
                  <span>Loại tài khoản:</span>
                  <span className="font-medium">{user.role}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 w-full">
                <button
                  onClick={() => navigate(`/profile/${user.userId}`)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Hồ sơ của tôi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services (div + emoji icon) */}
      <section className="px-8 py-16 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Chúng tôi cung cấp đầy đủ các giải pháp thiết kế website để đáp ứng
          mọi nhu cầu của bạn
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20">
          <div className="rounded-2xl shadow-md hover:shadow-lg transition bg-white">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-10 h-10 mb-4 text-blue-600 text-3xl">🏠</div>
              <h3 className="font-semibold mb-2">Thiết Kế Theo Yêu Cầu</h3>
              <p className="text-gray-600 text-sm">
                Đội ngũ thiết kế chuyên nghiệp của chúng tôi sẽ tạo ra website
                đặc thù theo đúng yêu cầu và thương hiệu của bạn.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow-md hover:shadow-lg transition bg-white">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-10 h-10 mb-4 text-blue-600 text-3xl">🧩</div>
              <h3 className="font-semibold mb-2">Template Sẵn Có</h3>
              <p className="text-gray-600 text-sm">
                Tiết kiệm thời gian với bộ sưu tập template chất lượng cao, dễ
                dàng tuỳ chỉnh.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow-md hover:shadow-lg transition bg-white">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-10 h-10 mb-4 text-blue-600 text-3xl">🛟</div>
              <h3 className="font-semibold mb-2">Tư Vấn & Hỗ Trợ</h3>
              <p className="text-gray-600 text-sm">
                Luôn đồng hành từ ý tưởng đến khi website hoàn thiện và vận
                hành.
              </p>
            </div>
          </div>
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
              <div
                key={i}
                className="rounded-xl shadow-md hover:shadow-lg transition bg-white"
              >
                <div className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                </div>
              </div>
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
            <div
              key={i}
              className="rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden bg-white"
            >
              <div className="p-6 text-left">
                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <h3 className="font-semibold text-lg mb-2">{tpl.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tpl.desc}</p>
                <p className="text-blue-600 font-bold mb-2">{tpl.price}</p>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Xem Chi Tiết →
                </a>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl shadow hover:bg-gray-200">
          Xem Tất Cả Template
        </button>
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
        <div className="grid md:grid-cols-4 gap-8 px-10 lg:px-20 py-12">
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
