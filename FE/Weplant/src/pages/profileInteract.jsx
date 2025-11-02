import { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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

  const API = "/api";
  //const API = "http://45.252.248.204:8080/api";
  const API_USERS = "http://45.252.248.204:8080/api/users";
  const API_PROJECTS = "http://45.252.248.204:8080/api/projects";

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
        const res = await authFetch(`${API}/users/user/${id}`);
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
      const res = await authFetch(`${API}/users/userUpdate/${id}`, {
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

  // Trạng thái cho nút/luồng OK -> Feedback -> Completed
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmErr, setConfirmErr] = useState("");

  // Popup feedback
  const [openFeedback, setOpenFeedback] = useState(false);
  const [fbRating, setFbRating] = useState(5);
  const [fbContent, setFbContent] = useState("");
  const [fbSaving, setFbSaving] = useState(false);
  const [fbErr, setFbErr] = useState("");

  // Modal chỉnh sửa mô tả (append)
  const [openEdit, setOpenEdit] = useState(false);
  const [editFor, setEditFor] = useState(null); // {id, name}
  const [editDesc, setEditDesc] = useState(""); // mô tả hiện tại (readOnly)
  const [editAppend, setEditAppend] = useState(""); // phần nhập mới
  const [agreeEdit, setAgreeEdit] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editErr, setEditErr] = useState("");

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

        const res = await authFetch(
          `${API}/projects/getProjectByUserId/${userIdForProjects}`
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

        const normalized = list.map((p) => ({
          id: p.projectId ?? p.project_id,
          name: p.projectName ?? p.project_name,
          description: p.description ?? "",
          status: p.status ?? "",
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
      setConfirmErr("");
      setDetailLoading(true);
      setOpenDetail(true);

      const res = await authFetch(
        `${API}/projects/getProjectById/${projectId}`
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

  // CLICK OK trong detail: mở popup feedback
  const handleOpenFeedback = () => {
    setFbRating(5);
    setFbContent("");
    setFbErr("");
    setOpenFeedback(true);
  };

  // Gửi feedback -> nếu OK thì updateStatus COMPLETED
  const handleSubmitFeedback = async () => {
    if (!detail?.id) return;
    try {
      setFbSaving(true);
      setFbErr("");

      const body = {
        projectId: detail.id,
        rating: fbRating,
        content: fbContent?.trim() || "",
        userId: Number(localStorage.getItem("userId")) || undefined,
      };

      const resFb = await authFetch(`${API}/feedbacks/create`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (resFb.status === 401 || resFb.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        return;
      }
      if (!resFb.ok) {
        const txt = await resFb.text().catch(() => "");
        throw new Error(txt || `Feedback HTTP ${resFb.status}`);
      }

      // Sau khi feedback thành công -> cập nhật trạng thái dự án sang COMPLETED
      setConfirmLoading(true);
      const res = await authFetch(
        `${API}/projects/updateStatus/${detail.id}?status=COMPLETED`,
        { method: "PUT" }
      );

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `UpdateStatus HTTP ${res.status}`);
      }

      // Cập nhật UI
      setDetail((d) => (d ? { ...d, status: "COMPLETED" } : d));
      setProjects((arr) =>
        arr.map((x) =>
          String(x.id) === String(detail.id) ? { ...x, status: "COMPLETED" } : x
        )
      );

      setOpenFeedback(false);
      alert("Cảm ơn phản hồi của bạn! Dự án đã được hoàn tất.");
    } catch (e) {
      setFbErr(e.message || "Không thể gửi feedback hoặc cập nhật trạng thái.");
    } finally {
      setFbSaving(false);
      setConfirmLoading(false);
    }
  };

  // ====== mở modal chỉnh sửa mô tả (append) ======
  const handleOpenEdit = async (p) => {
    try {
      setEditFor({ id: p.id, name: p.name });
      setEditErr("");
      setEditAppend("");
      setAgreeEdit(false);

      // fetch description mới nhất
      const res = await authFetch(`${API}/projects/getProjectById/${p.id}`);
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
      const latestDesc = d.description ?? p.description ?? "";
      setEditDesc(latestDesc); // hiển thị phần cũ (readOnly)
      setOpenEdit(true);
    } catch (e) {
      setEditDesc(p.description || "");
      setOpenEdit(true);
      setEditErr(e.message || "Không thể tải mô tả hiện tại.");
    }
  };

  const handleSaveEdit = async () => {
    if (!editFor) return;

    if (!agreeEdit) {
      setEditErr('Vui lòng tích "Tôi đồng ý..." trước khi cập nhật.');
      return;
    }
    if (!editAppend.trim()) {
      setEditErr("Vui lòng nhập nội dung mới để thêm vào sau.");
      return;
    }

    // append phần mới vào cuối mô tả cũ
    const timeStr = new Date().toLocaleString("vi-VN");
    const block = `\n\n---\nCập nhật (${timeStr}):\n${editAppend.trim()}`;
    const combined = `${(editDesc || "").trim()}${block}`;

    try {
      setEditSaving(true);
      setEditErr("");

      const body = { description: combined };

      const res = await authFetch(`${API}/projects/update/${editFor.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

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

      // cập nhật UI
      setProjects((arr) =>
        arr.map((x) =>
          String(x.id) === String(editFor.id)
            ? { ...x, description: combined }
            : x
        )
      );
      setDetail((d) =>
        d && String(d.id) === String(editFor.id)
          ? { ...d, description: combined }
          : d
      );

      setOpenEdit(false);
      setEditFor(null);
    } catch (e) {
      setEditErr(e.message || "Không thể cập nhật mô tả.");
    } finally {
      setEditSaving(false);
    }
  };

  const closeModal = () => {
    setOpenDetail(false);
    setDetail(null);
    setDetailErr("");
    setDetailLoading(false);
    setConfirmErr("");
    setConfirmLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur shadow-sm fixed top-0 left-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-3.5">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="weplant logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="text-blue-700 font-bold text-lg md:text-xl">
              weplant
            </span>
          </div>

          <div className="hidden md:flex gap-6">
            {[
              { label: "Trang Chủ", path: "/authen" },
              { label: "Dịch Vụ", path: "/pricing" },
              { label: "Template", path: "/templates" },
              { label: "Về Chúng Tôi", path: "/about" },
              { label: "Liên Hệ", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setActiveTop(item.label)}
                className={`text-sm font-medium transition ${
                  activeTop === item.label ? "text-blue-700" : "text-slate-600"
                } hover:text-blue-700`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-6 py-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">
          Hồ Sơ & Dự Án
        </h2>

        {/* Back to /authen */}
        <button
          onClick={() => navigate("/authen")}
          className="fixed top-24 left-4 md:left-6 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-blue-100 hover:bg-blue-50 transition"
          title="Quay về trang chính"
        >
          <span className="text-lg">←</span>
        </button>

        {/* Tabs (xanh nhạt) */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-blue-100 p-1 shadow-inner border border-blue-200 mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 md:px-6 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === "profile"
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-700/70 hover:text-blue-800"
              }`}
            >
              Thông tin
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 md:px-6 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === "projects"
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-700/70 hover:text-blue-800"
              }`}
            >
              Dự án của tôi
            </button>
          </div>
        </div>

        {activeTab === "profile" ? (
          // ===== PROFILE FORM =====
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur shadow-sm rounded-2xl p-6 md:p-8 space-y-5 border border-blue-100 max-w-3xl mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-blue-900">
                Họ và tên
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="mt-1 w-full border border-blue-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled
                className="mt-1 w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="mt-1 w-full border border-blue-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900">
                Quyền
              </label>
              <input
                type="text"
                name="role"
                value={profile.role}
                disabled
                className="mt-1 w-full border border-blue-100 rounded-xl px-3 py-2 bg-blue-50 text-slate-600 cursor-not-allowed"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className={`px-5 py-2.5 rounded-xl text-white transition ${
                  saving
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 hover:bg-blue-100"
              >
                Hủy
              </button>
            </div>
          </form>
        ) : (
          // ===== PROJECTS LIST =====
          <section className="bg-white/90 backdrop-blur shadow-sm rounded-2xl p-5 border border-blue-100">
            {loadingProjects ? (
              <p className="text-slate-500">Đang tải dự án…</p>
            ) : projErr ? (
              <p className="text-rose-600">{projErr}</p>
            ) : projects.length === 0 ? (
              <p className="text-slate-600">Bạn chưa có dự án nào.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    onView={() => handleViewDetail(p.id)}
                    onEdit={() => handleOpenEdit(p)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* ======= MODAL: Project Detail (gọn + xanh + progress) ======= */}
      {openDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[92%] max-w-2xl rounded-2xl shadow-lg border border-blue-100 bg-white">
            {/* Header */}
            <div className="px-6 py-4 rounded-t-2xl bg-blue-50 border-b border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                  {detail?.name?.charAt(0)?.toUpperCase() || "P"}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-blue-900">
                    {detail?.name || "Chi Tiết Dự Án"}
                  </h3>
                  <div className="text-xs text-blue-700/80">
                    Mã: {detail?.id ?? "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {detail?.status === "COMPLETED_CODING" && (
                  <button
                    onClick={handleOpenFeedback}
                    disabled={confirmLoading}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                    title="Xác nhận hoàn tất: nhập feedback trước khi hoàn tất"
                  >
                    OK
                  </button>
                )}
                <button
                  className="px-3 py-1.5 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {/* Progress */}
              {(() => {
                const stg = statusToStage(detail?.status);
                const idx = stageIndex(stg);
                const percent = Math.round((idx / (STAGES.length - 1)) * 100);
                return (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-[11px] md:text-xs font-medium text-blue-800 mb-2">
                      {STAGES.map((k, i) => (
                        <span
                          key={k}
                          className={`${
                            i <= idx ? "text-blue-800" : "text-blue-400"
                          }`}
                        >
                          {stageLabel(k)}
                        </span>
                      ))}
                    </div>
                    <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[11px] text-blue-700">
                      {percent}%
                    </div>
                  </div>
                );
              })()}

              {/* Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoLine
                  label="Trạng thái"
                  value={stageLabel(statusToStage(detail?.status))}
                />
                <InfoLine
                  label="Ngày tạo"
                  value={formatDate(detail?.createdAt)}
                />
                <InfoLine label="Người dùng" value={detail?.userName || "—"} />
                <InfoLine
                  label="Gói dịch vụ"
                  value={detail?.packageName || "—"}
                />
                <InfoLine
                  label="Template"
                  value={detail?.templateName || "—"}
                />
              </div>

              {/* Mô tả */}
              <div className="mt-4">
                <div className="text-xs font-medium text-blue-900 mb-1">
                  Mô tả
                </div>
                <div className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3 whitespace-pre-line">
                  {detail?.description || "—"}
                </div>
              </div>

              {/* Đính kèm */}
              <div className="mt-4">
                <div className="text-xs font-medium text-blue-900 mb-2">
                  Tệp đính kèm
                </div>
                {detail?.attachments?.length ? (
                  <ul className="space-y-1">
                    {detail.attachments.map((a, i) => (
                      <li key={i} className="text-sm">
                        <a
                          href={a.url || a.fileUrl || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline break-words"
                        >
                          {a.fileName || `Tệp #${i + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-slate-500">—</div>
                )}
              </div>

              {confirmErr && (
                <div className="mt-3 text-sm text-rose-600">{confirmErr}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======= MODAL: Feedback ======= */}
      {openFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenFeedback(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[92%] max-w-lg bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Phản hồi của bạn
              </h3>
              <button
                className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                onClick={() => setOpenFeedback(false)}
              >
                Đóng
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Mức độ hài lòng
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFbRating(n)}
                      className={`w-10 h-10 rounded-full border ${
                        fbRating >= n
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-800"
                      }`}
                      title={`${n}/5`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Góp ý/nhận xét
                </label>
                <textarea
                  rows={5}
                  value={fbContent}
                  onChange={(e) => setFbContent(e.target.value)}
                  placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm/dịch vụ…"
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {fbErr && <div className="text-sm text-rose-600">{fbErr}</div>}

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                  onClick={() => setOpenFeedback(false)}
                  disabled={fbSaving}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
                  onClick={handleSubmitFeedback}
                  disabled={fbSaving}
                >
                  {fbSaving ? "Đang gửi…" : "Gửi & Hoàn tất"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======= MODAL: Edit description (append) ======= */}
      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenEdit(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[92%] max-w-xl bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Chỉnh Sửa Yêu Cầu
              </h3>
              <button
                className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                onClick={() => setOpenEdit(false)}
              >
                Đóng
              </button>
            </div>

            {editFor && (
              <div className="space-y-4">
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 px-3 py-2">
                  <div className="text-[11px] font-medium text-blue-900/80">
                    Tên dự án
                  </div>
                  <div className="text-sm text-slate-800 break-words">
                    {editFor.name || "—"}
                  </div>
                </div>

                {/* Yêu cầu hiện tại - readOnly */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Yêu cầu hiện tại (không thể chỉnh sửa)
                  </label>
                  <textarea
                    rows={3}
                    value={editDesc}
                    readOnly
                    className="w-full border border-blue-100 rounded-lg px-3 py-2 bg-blue-50 text-slate-700 cursor-not-allowed"
                  />
                </div>

                {/* Nội dung mới để append */}
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Thêm nội dung mới (sẽ được ghép vào cuối)
                  </label>
                  <textarea
                    rows={5}
                    value={editAppend}
                    onChange={(e) => setEditAppend(e.target.value)}
                    placeholder="Ví dụ: Thêm Testimonials, đổi tông màu, bổ sung animation cho hero..."
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreeEdit}
                    onChange={(e) => setAgreeEdit(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    Tôi xác nhận đồng ý áp dụng <b>chỉnh sửa</b> (bao gồm phần{" "}
                    <i>thêm mới</i>) cho dự án này.
                  </span>
                </label>

                {editErr && (
                  <div className="text-sm text-rose-600">{editErr}</div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                    onClick={() => setOpenEdit(false)}
                    disabled={editSaving}
                  >
                    Hủy
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
                    onClick={handleSaveEdit}
                    disabled={editSaving || !agreeEdit}
                    title={
                      !agreeEdit
                        ? "Hãy tích xác nhận trước khi cập nhật"
                        : undefined
                    }
                  >
                    {editSaving ? "Đang lưu..." : "OK & Cập nhật"}
                  </button>
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

function ProjectCard({ p, onView, onEdit }) {
  const badge = statusBadge(p.status);
  return (
    <div className="border border-blue-100 rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-blue-900">
          {p.name || "Chưa đặt tên"}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${badge.cls}`}>
          {badge.text}
        </span>
      </div>
      <p className="text-sm text-slate-600 mt-2 line-clamp-3">
        {p.description || "—"}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
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
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-50 text-blue-800 text-sm rounded-lg px-3 py-2 border border-blue-200 hover:bg-blue-100"
        >
          Chỉnh Sửa Yêu Cầu
        </button>
      </div>
    </div>
  );
}

function BoxRow({ label, value, className = "" }) {
  return (
    <div
      className={`border rounded-lg p-3 bg-blue-50/40 border-blue-100 ${className}`}
    >
      <div className="text-xs font-medium text-blue-900 mb-1">{label}</div>
      <div className="text-sm text-slate-800 break-words">{value ?? "—"}</div>
    </div>
  );
}

function statusBadge(s) {
  const val = (s || "").toUpperCase();
  switch (val) {
    case "CREATED":
      return { text: "Mới tạo", cls: "bg-blue-100 text-blue-700" };
    case "DESIGNING":
      return {
        text: "Đang thiết kế",
        cls: "bg-blue-50 text-blue-700 border border-blue-200",
      };
    case "RE_DESIGNING":
      return {
        text: "Thiết kế lại",
        cls: "bg-blue-50 text-blue-700 border border-blue-200",
      };
    case "COMPLETE_DESIGNING":
      return {
        text: "Hoàn tất thiết kế",
        cls: "bg-indigo-100 text-indigo-700",
      };
    case "CODING":
      return { text: "Đang lập trình", cls: "bg-purple-100 text-purple-700" };
    case "COMPLETED_CODING":
      return {
        text: "Hoàn tất lập trình",
        cls: "bg-violet-100 text-violet-700",
      };
    case "DEPLOYING":
      return { text: "Đang triển khai", cls: "bg-orange-100 text-orange-700" };
    case "COMPLETED":
      return { text: "Hoàn thành", cls: "bg-green-100 text-green-700" };
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

/* ====== Progress helpers & UI chip cho popup ====== */
const STAGES = [
  "CREATED",
  "REVIEWING",
  "DEVELOPING",
  "COMPLETED_CODING",
  "COMPLETED",
];

// Map status server -> 5 bước
function statusToStage(status) {
  const s = String(status || "").toUpperCase();
  if (s === "CREATED") return "CREATED";
  if (["DESIGNING", "RE_DESIGNING", "COMPLETE_DESIGNING"].includes(s))
    return "REVIEWING";
  if (["CODING"].includes(s)) return "DEVELOPING";
  if (["COMPLETED_CODING", "DEPLOYING"].includes(s)) return "COMPLETED_CODING";
  if (s === "COMPLETED") return "COMPLETED";
  return "REVIEWING"; // fallback
}
function stageIndex(stage) {
  const idx = STAGES.indexOf(stage);
  return idx >= 0 ? idx : 1;
}
function stageLabel(key) {
  switch (key) {
    case "CREATED":
      return "Created";
    case "REVIEWING":
      return "Reviewing";
    case "DEVELOPING":
      return "Developing";
    case "COMPLETED_CODING":
      return "Completed coding";
    case "COMPLETED":
      return "Completed";
    default:
      return key;
  }
}

// Thẻ info gọn (tông xanh)
function InfoLine({ label, value }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/40 px-3 py-2">
      <div className="text-[11px] font-medium text-blue-900/80">{label}</div>
      <div className="text-sm text-slate-800">{value ?? "—"}</div>
    </div>
  );
}
