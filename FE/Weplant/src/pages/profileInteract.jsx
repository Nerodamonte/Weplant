import { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const { id } = useParams(); // /profile/:id (userId)
  const navigate = useNavigate();

  const [activeTop, setActiveTop] = useState("Trang Chủ"); // navbar
  const [activeTab, setActiveTab] = useState("profile"); // profile | projects

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
  });
  const [saving, setSaving] = useState(false);

  const API_USERS = "https://weplant-r8hj.onrender.com/api/users";
  const API_PROJECTS = "https://weplant-r8hj.onrender.com/api/projects";

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

  // ---- Guard + load profile ----
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!token || !isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!id) return;

    (async () => {
      try {
        const res = await authFetch(`${API_USERS}/user/${id}`);
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
      const res = await authFetch(`${API_USERS}/userUpdate/${id}`, {
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

  // ====== PROJECTS (getProjectByUserId) ======
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projErr, setProjErr] = useState("");

  // Modal chi tiết
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailErr, setDetailErr] = useState("");

  useEffect(() => {
    if (activeTab !== "projects") return;

    const token = localStorage.getItem("authToken");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!token || !isAuthenticated) {
      navigate("/login");
      return;
    }

    const userIdForProjects = id || localStorage.getItem("userId");
    if (!userIdForProjects) {
      setProjErr("Không xác định được userId.");
      setProjects([]);
      setLoadingProjects(false);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        setLoadingProjects(true);
        setProjErr("");

        // fetch theo userId
        const res = await authFetch(
          `${API_PROJECTS}/getProjectByUserId/${userIdForProjects}`
        );
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const apiRes = await res.json().catch(() => ({}));
        const list = apiRes?.data || [];

        // CHUẨN HOÁ theo ProjectDetailResponse LIST (nếu BE trả giống detail)
        const normalized = list.map((p) => ({
          id: p.projectId ?? p.project_id,
          name: p.projectName ?? p.project_name,
          description: p.description ?? "",
          status: p.status ?? "",
          // map thêm các tên hiển thị để có thể xài trên card nếu muốn
          userName: p.userName ?? p.user_name ?? "",
          packageName: p.packageName ?? p.package_name ?? "",
          templateName: p.templateName ?? p.template_name ?? "",
          createdAt: p.createAt ?? p.createdAt ?? p.created_at ?? null,
          updatedAt: p.updatedAt ?? p.updated_at ?? null,
        }));

        if (mounted) setProjects(normalized);
      } catch (e) {
        if (mounted) {
          setProjErr(e.message || "Không tải được danh sách dự án.");
          setProjects([]);
        }
      } finally {
        if (mounted) setLoadingProjects(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeTab, id, navigate]);

  // ====== mở modal chi tiết: GET /getProjectById/{projectId} ======
  const handleViewDetail = async (projectId) => {
    try {
      setDetail(null);
      setDetailErr("");
      setDetailLoading(true);
      setOpenDetail(true);

      const res = await authFetch(
        `${API_PROJECTS}/getProjectById/${projectId}`
      );
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }

      const json = await res.json().catch(() => ({}));
      const d = json?.data || {};

      // Chuẩn hoá đúng ProjectDetailResponse
      const normalized = {
        id: d.projectId ?? d.project_id,
        name: d.projectName ?? d.project_name,
        description: d.description ?? "",
        status: d.status ?? "",
        userName: d.userName ?? d.user_name ?? "—",
        packageName: d.packageName ?? d.package_name ?? "—",
        templateName: d.templateName ?? d.template_name ?? "—",
        createdAt: d.createAt ?? d.createdAt ?? d.created_at ?? null,
        updatedAt: d.updatedAt ?? d.updated_at ?? null,
        attachments: Array.isArray(d.attachmentUrls) ? d.attachmentUrls : [],
      };

      setDetail(normalized);
    } catch (e) {
      setDetailErr(e.message || "Không lấy được chi tiết dự án.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setOpenDetail(false);
    setDetail(null);
    setDetailErr("");
    setDetailLoading(false);
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
                onClick={() => setActiveTop(item.label)}
                className={`text-sm font-medium transition ${
                  activeTop === item.label ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 mt-24">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Hồ Sơ & Dự Án
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Thông tin
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              activeTab === "projects"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Dự án của tôi
          </button>
        </div>

        {activeTab === "profile" ? (
          // ===== PROFILE FORM =====
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-6 max-w-3xl mx-auto"
          >
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
        ) : (
          // ===== PROJECTS LIST =====
          <section className="bg-white shadow-sm rounded-lg p-5">
            {loadingProjects ? (
              <p className="text-gray-500">Đang tải dự án…</p>
            ) : projErr ? (
              <p className="text-red-600">{projErr}</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-600">Bạn chưa có dự án nào.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    onView={() => handleViewDetail(p.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* ======= MODAL: Project Detail ======= */}
      {openDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
            aria-hidden="true"
          />
          {/* dialog */}
          <div className="relative z-10 w-[92%] max-w-2xl bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chi Tiết Dự Án</h3>
              <button
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={closeModal}
              >
                Đóng
              </button>
            </div>

            {detailLoading ? (
              <p className="text-gray-500">Đang tải chi tiết…</p>
            ) : detailErr ? (
              <p className="text-red-600">{detailErr}</p>
            ) : !detail ? (
              <p className="text-gray-600">Không có dữ liệu.</p>
            ) : (
              <div className="space-y-4">
                {/* Grid các ô thông tin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <BoxRow label="Mã dự án" value={detail.id} />
                  <BoxRow label="Trạng thái" value={detail.status || "—"} />
                  <BoxRow
                    label="Tên dự án"
                    value={detail.name || "—"}
                    className="md:col-span-2"
                  />
                  <BoxRow label="Người dùng" value={detail.userName || "—"} />
                  <BoxRow
                    label="Gói dịch vụ"
                    value={detail.packageName || "—"}
                  />
                  <BoxRow label="Template" value={detail.templateName || "—"} />
                  <BoxRow
                    label="Ngày tạo"
                    value={formatDate(detail.createdAt)}
                  />
                </div>

                {/* Mô tả */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    Mô tả
                  </div>
                  <div className="text-sm text-gray-800 whitespace-pre-line">
                    {detail.description || "—"}
                  </div>
                </div>

                {/* Đính kèm */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="text-xs font-medium text-gray-500 mb-2">
                    Tệp đính kèm
                  </div>
                  {detail.attachments?.length ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {detail.attachments.map((a, i) => (
                        <li key={i} className="text-sm">
                          {a.fileName ? (
                            <a
                              href={a.url || a.fileUrl || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline break-words"
                            >
                              {a.fileName}
                            </a>
                          ) : (
                            <a
                              href={a.url || a.fileUrl || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline break-words"
                            >
                              Tệp #{i + 1}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-600">—</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- helpers & small components ---------- */

function ProjectCard({ p, onView }) {
  const badge = statusBadge(p.status);
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800">
          {p.name || "Chưa đặt tên"}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${badge.cls}`}>
          {badge.text}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {p.description || "—"}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span>📅</span>
        <span>Ngày gửi: {formatDate(p.createdAt)}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 bg-blue-600 text-white text-sm rounded-lg px-3 py-2 hover:bg-blue-700"
        >
          Xem Chi Tiết
        </button>
        <button className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-lg px-3 py-2 hover:bg-gray-200">
          Chỉnh Sửa Yêu Cầu
        </button>
      </div>
    </div>
  );
}

function BoxRow({ label, value, className = "" }) {
  return (
    <div className={`border rounded-lg p-3 bg-gray-50 ${className}`}>
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-800 break-words">{value ?? "—"}</div>
    </div>
  );
}

function statusBadge(s) {
  const val = (s || "").toUpperCase();
  switch (val) {
    case "PENDING":
      return { text: "Đang chờ duyệt", cls: "bg-yellow-100 text-yellow-700" };
    case "DESIGNING":
    case "IN_PROGRESS":
      return { text: "Đang thiết kế", cls: "bg-blue-100 text-blue-700" };
    case "COMPLETED":
      return { text: "Hoàn thành", cls: "bg-green-100 text-green-700" };
    case "CANCELLED":
      return { text: "Đã hủy", cls: "bg-gray-200 text-gray-700" };
    default:
      return { text: val || "Không rõ", cls: "bg-slate-100 text-slate-700" };
  }
}

function formatDate(d) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("vi-VN");
  } catch {
    return String(d);
  }
}
