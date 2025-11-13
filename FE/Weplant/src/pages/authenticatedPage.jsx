import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";

/* ========= Scroll Reveal helper ========= */
function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up", // up | down | left | right
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.unobserve(el);
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dir = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
  }[from];

  return (
    <Tag
      ref={ref}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        show ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${dir}`,
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default function AuthenticatedPage() {
  const [active, setActive] = useState("Trang Chủ");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ==== trạng thái đăng nhập để điều hướng Trang Chủ + show Logout
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("authToken"));

  //const API = "http://45.252.248.204:8080/api";
  const API = "/api";
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
    const userId = localStorage.getItem("userId");

    setLoggedIn(!!token);

    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }
    
    if (!userId) {
      setError("Không tìm thấy thông tin người dùng!");
      return;
    }

    const fetchUser = async () => {
      try {
        // Sử dụng API mới: /api/users/user/{id}
        const res = await authFetch(`${API}/users/user/${userId}`);
        
        if (res.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          return navigate("/login");
        }
        
        if (!res.ok) throw new Error("Lấy thông tin người dùng thất bại!");

        const result = await res.json();
        const currentUser = result?.data;
        
        if (!currentUser) throw new Error("Không tìm thấy người dùng!");

        // Cập nhật lại localStorage với thông tin mới nhất
        localStorage.setItem("userId", String(currentUser.userId));
        localStorage.setItem("userEmail", currentUser.email);

        setUser(currentUser);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra!");
      }
    };

    fetchUser();
  }, [navigate]);

  // ===== Điều hướng Trang Chủ theo token
  const handleHomeClick = (e) => {
    e.preventDefault();
    const hasToken = !!localStorage.getItem("authToken");
    navigate(hasToken ? "/authen" : "/");
  };

  // ===== Đăng xuất
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      sessionStorage.removeItem("lastTemplateId");
    } finally {
      setLoggedIn(false);
      navigate("/", { replace: true });
    }
  };

  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="font-sans bg-white max-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3 md:py-4">
          <Reveal from="left" delay={50} className="flex items-center gap-2">
            <img
              src={logo}
              alt="weplant logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </Reveal>

          <Reveal
            from="right"
            delay={120}
            className="flex items-center gap-6 md:gap-8"
          >
            {/* Trang Chủ: click -> / nếu chưa login, /authen nếu đã login */}
            <Link
              to={loggedIn ? "/authen" : "/"}
              onClick={handleHomeClick}
              className={`text-sm font-medium transition ${
                active === "Trang Chủ" ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Trang Chủ
            </Link>

            {[
              { label: "Dịch Vụ", path: "/pricing" },
              { label: "Template", path: "/templates" },
              { label: "Về Chúng Tôi", path: "/about" },
              { label: "Danh Sách Thanh Toán", path: "/payments" }, 
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

            {/* Nút Đăng xuất */}
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="ml-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                title="Đăng xuất"
              >
                Đăng xuất
              </button>
            )}
          </Reveal>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10 items-center">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Reveal
              as="h1"
              from="up"
              className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            >
              Chào Mừng Bạn Đến <br /> Với{" "}
              <span className="text-blue-600">Weplant</span>
            </Reveal>

            <Reveal
              from="up"
              delay={120}
              className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl"
            >
              Khám phá các giải pháp thiết kế website tùy chỉnh và template sẵn
              có của Weplant. Quản lý dự án của bạn ngay hôm nay!
            </Reveal>

            <Reveal
              from="up"
              delay={200}
              className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start"
            >
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
            </Reveal>
          </div>

          {/* Right Profile Card */}
          <Reveal
            from="right"
            className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto"
          >
            <div className="flex flex-col items-center text-center">
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
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-10 py-16 text-center bg-gray-50">
        <Reveal as="h2" from="up" className="text-2xl font-bold mb-3">
          Dịch Vụ Của Chúng Tôi
        </Reveal>
        <Reveal
          from="up"
          delay={80}
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Chúng tôi cung cấp đầy đủ các giải pháp thiết kế website để đáp ứng
          mọi nhu cầu của bạn
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: "🏠",
              title: "Thiết Kế Theo Yêu Cầu",
              desc: "Đội ngũ thiết kế chuyên nghiệp của chúng tôi sẽ tạo ra website đặc thù theo đúng yêu cầu và thương hiệu của bạn.",
              delay: 0,
            },
            {
              icon: "🧩",
              title: "Template Sẵn Có",
              desc: "Tiết kiệm thời gian với bộ sưu tập template chất lượng cao, dễ dàng tuỳ chỉnh.",
              delay: 120,
            },
            {
              icon: "🛟",
              title: "Tư Vấn & Hỗ Trợ",
              desc: "Luôn đồng hành từ ý tưởng đến khi website hoàn thiện và vận hành.",
              delay: 200,
            },
          ].map((s, i) => (
            <Reveal
              key={i}
              delay={s.delay}
              from="up"
              className="rounded-2xl shadow-sm hover:shadow-md transition bg-white p-6 flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 mb-4 text-blue-600 text-3xl">
                {s.icon}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work Process */}
      <section className="px-6 md:px-10 py-16 text-center">
        <Reveal as="h2" from="up" className="text-2xl font-bold mb-3">
          Quy Trình Làm Việc
        </Reveal>
        <Reveal
          from="up"
          delay={80}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Chỉ với 4 bước đơn giản, bạn sẽ có website như mong muốn
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {["Trao Đổi Ý Tưởng", "Thiết Kế Mẫu", "Phát Triển", "Ra Mắt"].map(
            (step, i) => (
              <Reveal
                key={step}
                delay={i * 120}
                from="up"
                className="rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                </div>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* Featured Templates */}
      <section className="px-6 md:px-10 py-16 text-center bg-gray-50">
        <Reveal as="h2" from="up" className="text-2xl font-bold mb-3">
          Template Nổi Bật
        </Reveal>
        <Reveal
          from="up"
          delay={80}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Khám phá bộ sưu tập template đa dạng và chuyên nghiệp của chúng tôi
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
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
            <Reveal
              key={tpl.title}
              delay={i * 150}
              from="up"
              className="rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden bg-white"
            >
              <div className="p-6 text-left">
                <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                <h3 className="font-semibold text-lg mb-2">{tpl.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tpl.desc}</p>
                <p className="text-blue-600 font-bold mb-2">{tpl.price}</p>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Xem Chi Tiết →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal from="up" delay={350}>
          <button className="mt-10 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl shadow hover:bg-gray-200">
            Xem Tất Cả Template
          </button>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-20 px-6">
        <Reveal
          as="h2"
          from="up"
          className="text-3xl font-bold text-center mb-12"
        >
          Khách Hàng Nói Gì Về Chúng Tôi
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              content:
                "“Weplant đã giúp chúng tôi có một website chuyên nghiệp, khách hàng dễ dàng tìm kiếm sản phẩm hơn.”",
              author: "Nguyễn Văn An",
              role: "CEO, Tech Solutions",
            },
            {
              content:
                "“Template Shop Master của Weplant dễ sử dụng, thiết kế đẹp mắt và rất hữu ích cho việc bán hàng trực tuyến.”",
              author: "Trần Thị Minh",
              role: "Chủ Shop, Minh Beauty",
            },
            {
              content:
                "“Với sự hỗ trợ nhiệt tình, đội ngũ Weplant đã tạo ra một website tuyệt vời giúp tôi mở rộng kinh doanh.”",
              author: "Lê Quang Huy",
              role: "Nhà sáng lập, HuyStore",
            },
          ].map((t, i) => (
            <Reveal
              key={i}
              delay={i * 150}
              from="up"
              className="p-6 bg-white shadow rounded-2xl"
            >
              <p className="text-gray-600 italic mb-4">{t.content}</p>
              <h3 className="font-semibold">{t.author}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-blue-600 text-white">
        <Reveal as="h2" from="up" className="text-3xl font-bold mb-6">
          Sẵn Sàng Để Bắt Đầu Dự Án Của Bạn?
        </Reveal>
        <Reveal from="up" delay={120} className="mb-8">
          Hãy để chúng tôi giúp bạn xây dựng website ấn tượng phù hợp với thương
          hiệu và mục tiêu kinh doanh.
        </Reveal>
        <Reveal from="up" delay={200} className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100">
            Liên Hệ Ngay
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Tìm Hiểu Thêm
          </button>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300">
        <div className="grid md:grid-cols-4 gap-8 px-10 lg:px-20 py-12 max-w-7xl mx-auto">
          <Reveal from="up" className="">
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
          </Reveal>
          <Reveal from="up" delay={120}>
            <h4 className="font-semibold text-white mb-4">Dịch Vụ</h4>
            <ul className="space-y-2">
              <li>Thiết Kế Website</li>
              <li>Template Có Sẵn</li>
              <li>Tư Vấn UI/UX</li>
              <li>Bảo Trì Website</li>
            </ul>
          </Reveal>
          <Reveal from="up" delay={200}>
            <h4 className="font-semibold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>Trung Tâm Hỗ Trợ</li>
              <li>Câu Hỏi Thường Gặp</li>
              <li>Hướng Dẫn Sử Dụng</li>
              <li>Liên Hệ</li>
            </ul>
          </Reveal>
          <Reveal from="up" delay={280}>
            <h4 className="font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-2">
              <li>📧 contact.weplant@gmail.com</li>
              <li>📞 094 7722102</li>
              <li>📍 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</li>
            </ul>
          </Reveal>
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