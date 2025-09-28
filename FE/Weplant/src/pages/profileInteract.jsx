import { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const { id } = useParams(); // /profile/:id
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
  });

  const [active, setActive] = useState("Profile");
  const [saving, setSaving] = useState(false);
  const API = "http://localhost:8080/api/users";

  // ---- Helper: fetch kèm Bearer token (key: authToken) ----
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("authToken") || "";
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.method === "PUT" || options.method === "POST"
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
    return res;
  };

  // ---- Load profile ----
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("authToken");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!token || !isAuthenticated) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const res = await authFetch(`${API}/user/${id}`);
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const apiRes = await res.json();
        const d = apiRes.data ?? apiRes;

        setProfile({
          fullName: d.fullName || "",
          email: d.email || "",
          phone: d.phoneNumber ? String(d.phoneNumber) : "",
          role: d.role || "CUSTOMER",
        });
      } catch (err) {
        console.error("Lỗi khi load profile:", err);
        alert("Không tải được dữ liệu hồ sơ.");
      }
    })();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || saving) return;

    const body = {
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phone,
      role: profile.role,
    };

    try {
      setSaving(true);
      console.log("[UPDATE PROFILE] PUT", `${API}/userUpdate/${id}`, body);

      const res = await authFetch(`${API}/userUpdate/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (res.status === 401 || res.status === 403) {
        alert(
          "Phiên đăng nhập hết hạn hoặc không đủ quyền. Vui lòng đăng nhập lại."
        );
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Update failed:", text);
        throw new Error(`Cập nhật thất bại (HTTP ${res.status})`);
      }

      await res.json().catch(() => ({}));
      alert("Cập nhật thành công");
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err);
      alert(err.message || "Có lỗi xảy ra khi cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="weplant logo" className="w-6 h-6" />
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

      {/* Content */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-8 mt-24">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Chỉnh Sửa Thông Tin Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quyền
            </label>
            <input
              type="text"
              name="role"
              value={profile.role}
              disabled
              className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded-lg text-white transition ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
