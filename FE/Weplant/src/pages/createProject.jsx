import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function StartProjectForm({ onSubmit }) {
  const [active, setActive] = useState("Trang Chủ");

  // form
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    packageId: "",
    templateId: "", // OPTIONAL
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // packages (API only)
  const [packages, setPackages] = useState([]);
  const [loadingPkgs, setLoadingPkgs] = useState(true);
  const [pkgError, setPkgError] = useState("");

  // templates (API only)
  const [templates, setTemplates] = useState([]);
  const [loadingTpls, setLoadingTpls] = useState(true);
  const [tplError, setTplError] = useState("");

  const API = "/api";
  const navigate = useNavigate();
  const { state } = useLocation();

  // ===== UserId + Token guard =====
  const stateUserId = state?.userId;
  const storedUserId =
    typeof window !== "undefined" ? Number(localStorage.getItem("userId")) : 0;
  const userId = useMemo(
    () => Number(stateUserId || storedUserId || 0),
    [stateUserId, storedUserId]
  );

  useEffect(() => {
    if (stateUserId) localStorage.setItem("userId", String(stateUserId));
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/login");
  }, [stateUserId, navigate]);

  // helper gắn Bearer
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

  // ===== Fetch packages =====
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingPkgs(true);
        setPkgError("");
        let res = await authFetch(`${API}/packages/getAll`);
        if (!res.ok) throw new Error("Không lấy được danh sách gói.");
        const json = await res.json();
        const data = json?.data || [];
        const mapped = data
          .map((p) => ({
            id: p.package_id ?? p.packageId,
            name: p.package_name ?? p.packageName,
            price: p.package_price ?? p.price,
            desc: p.package_description ?? p.description,
          }))
          .filter((x) => x.id != null);
        if (!mapped.length) throw new Error("Danh sách gói đang trống.");
        if (mounted) setPackages(mapped);
      } catch (e) {
        if (mounted) {
          setPackages([]);
          setPkgError(e.message || "Không thể tải gói dịch vụ.");
        }
      } finally {
        if (mounted) setLoadingPkgs(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ===== Fetch templates =====
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingTpls(true);
        setTplError("");
        let res = await authFetch(`${API}/templates/getAll`);
        if (!res.ok) throw new Error("Không lấy được danh sách template.");
        const json = await res.json();
        const data = json?.data || [];
        // chuẩn hoá: {id, name, desc}
        const mapped = data
          .map((t) => ({
            id: t.template_id ?? t.templateId,
            name: t.template_name ?? t.templateName,
            desc: t.description ?? t.template_description ?? "",
            cover:
              t.images?.[0]?.imageUrl ?? t.thumbnail ?? t.previewUrl ?? null,
          }))
          .filter((x) => x.id != null);
        if (mounted) setTemplates(mapped);
      } catch (e) {
        if (mounted) {
          setTemplates([]);
          setTplError(e.message || "Không thể tải template.");
        }
      } finally {
        if (mounted) setLoadingTpls(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ===== form =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.projectName.trim()) e.projectName = "Nhập tên dự án.";
    if (!form.description.trim()) e.description = "Mô tả không được để trống.";
    if (!form.packageId) e.packageId = "Chọn gói (package).";
    // templateId OPTIONAL → không validate
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const body = {
        userId,
        packageId: Number(form.packageId),
        projectName: form.projectName.trim(),
        description: form.description.trim(),
        status: "CREATED",
      };
      if (form.templateId) body.templateId = Number(form.templateId);

      // Nếu cha có override
      if (onSubmit) {
        await onSubmit({
          project_name: body.projectName,
          description: body.description,
          package_id: body.packageId,
          ...(body.templateId ? { template_id: body.templateId } : {}),
        });
        // thành công -> về /authen
        navigate("/authen", { replace: true });
        return;
      }

      // Gọi API thật
      const res = await authFetch(`${API}/projects/create`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        return;
      }

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || "Tạo dự án thất bại.");

      // OK -> về /authen
      navigate("/authen", { replace: true });
    } catch (err) {
      setErrMsg(err?.message || "Không thể tạo dự án.");
      alert(err?.message || "Không thể tạo dự án.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="weplant logo" className="h-16 w-auto object-contain" />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>
          <div className="flex gap-8">
            {[
              { label: "Trang Chủ", path: "/" },
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

      {/* MAIN */}
      <main className="flex-grow">
        <div className="min-h-[calc(100vh-320px)] bg-slate-50 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl">
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Bắt đầu dự án website của bạn
              </h1>
              <p className="text-slate-600 mt-2">
                Điền thông tin ngắn gọn để khởi tạo dự án. Chỉ 3 bước đơn giản.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Tên dự án <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    value={form.projectName}
                    onChange={handleChange}
                    placeholder="VD: Website cửa hàng thời trang"
                    className={
                      "mt-2 w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition " +
                      (errors.projectName
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500")
                    }
                    aria-describedby="projectName-help"
                  />
                  <p
                    id="projectName-help"
                    className="mt-1 text-xs text-slate-500"
                  >
                    Đặt tên ngắn gọn, dễ nhớ; có thể đổi sau.
                  </p>
                  {errors.projectName && (
                    <p className="mt-1 text-sm text-rose-600">
                      {errors.projectName}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Mô tả ý tưởng <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Mô tả loại website, đối tượng khách hàng, mục tiêu…"
                    className={
                      "mt-2 w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition " +
                      (errors.description
                        ? "border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500")
                    }
                    aria-describedby="description-help"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <p id="description-help" className="text-xs text-slate-500">
                      Viết rõ mục tiêu, chức năng chính, phong cách thiết kế
                      mong muốn…
                    </p>
                    <span className="text-xs text-slate-400">
                      Tối đa ~500 ký tự (khuyến nghị)
                    </span>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-rose-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Package */}
                <div>
                  <label
                    htmlFor="packageId"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Chọn gói (package) <span className="text-rose-600">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <select
                      id="packageId"
                      name="packageId"
                      value={form.packageId}
                      onChange={handleChange}
                      disabled={loadingPkgs || !packages.length}
                      className={
                        "col-span-2 rounded-xl border bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-4 transition " +
                        (errors.packageId
                          ? "border-rose-400 focus:ring-rose-100"
                          : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500")
                      }
                      aria-describedby="package-help"
                    >
                      <option value="" disabled>
                        {loadingPkgs
                          ? "Đang tải gói..."
                          : packages.length
                          ? "— Chọn gói phù hợp —"
                          : "Không có gói nào"}
                      </option>
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <div className="rounded-xl border border-slate-200 p-3">
                      {form.packageId ? (
                        <MiniInfo
                          title={
                            packages.find(
                              (p) => String(p.id) === String(form.packageId)
                            )?.name
                          }
                          subtitle={
                            packages.find(
                              (p) => String(p.id) === String(form.packageId)
                            )?.price != null
                              ? `Giá tham khảo: ${formatVND(
                                  packages.find(
                                    (p) =>
                                      String(p.id) === String(form.packageId)
                                  )?.price
                                )}`
                              : undefined
                          }
                          desc={
                            packages.find(
                              (p) => String(p.id) === String(form.packageId)
                            )?.desc
                          }
                        />
                      ) : (
                        <p className="text-sm text-slate-500">
                          {loadingPkgs
                            ? "Đang tải..."
                            : pkgError || "Chưa chọn gói."}
                        </p>
                      )}
                    </div>
                  </div>
                  <p id="package-help" className="mt-1 text-xs text-slate-500">
                    Trường gửi lên BE:{" "}
                    <code className="px-1 rounded bg-slate-100">packageId</code>
                    .
                  </p>
                  {errors.packageId && (
                    <p className="mt-1 text-sm text-rose-600">
                      {errors.packageId}
                    </p>
                  )}
                </div>

                {/* Template (OPTIONAL) */}
                <div>
                  <label
                    htmlFor="templateId"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Chọn template (không bắt buộc)
                  </label>
                  <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <select
                      id="templateId"
                      name="templateId"
                      value={form.templateId}
                      onChange={handleChange}
                      disabled={loadingTpls}
                      className="col-span-2 rounded-xl border bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-4 transition border-slate-200 focus:ring-indigo-100 focus:border-indigo-500"
                    >
                      <option value="">
                        {loadingTpls
                          ? "Đang tải template..."
                          : "— Không chọn —"}
                      </option>
                      {templates.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>

                    <div className="rounded-xl border border-slate-200 p-3">
                      {form.templateId ? (
                        <MiniInfo
                          title={
                            templates.find(
                              (t) => String(t.id) === String(form.templateId)
                            )?.name
                          }
                          desc={
                            templates.find(
                              (t) => String(t.id) === String(form.templateId)
                            )?.desc
                          }
                        />
                      ) : (
                        <p className="text-sm text-slate-500">
                          {loadingTpls
                            ? "Đang tải..."
                            : tplError || "Không bắt buộc."}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Nếu bỏ trống, BE sẽ tạo project không gắn template
                    (templateId = null).
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-medium bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Đang gửi…" : "Gửi yêu cầu"}
                  </button>
                </div>
              </form>
              {errMsg && <p className="mt-3 text-sm text-rose-600">{errMsg}</p>}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
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
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
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
              <li>📍 123 Đường Nguyễn Huệ, Quận 1, TP. HCM</li>
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

function MiniInfo({ title, subtitle, desc }) {
  return (
    <div className="h-full">
      {title && <p className="text-sm font-semibold text-slate-800">{title}</p>}
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      {desc && <p className="text-xs text-slate-500 mt-1">{desc}</p>}
    </div>
  );
}

function formatVND(n) {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${n} đ`;
  }
}
