import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UseTemplateButton({ templateId }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🧩 Lấy ID từ nhiều nguồn
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");

  // 🔥 Bắt luôn ID từ đường dẫn (vd: /templates/6)
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const fromPath =
    pathSegments[pathSegments.length - 1] &&
    !isNaN(pathSegments[pathSegments.length - 1])
      ? pathSegments[pathSegments.length - 1]
      : null;

  const fromSession = sessionStorage.getItem("lastTemplateId");

  // 🧠 Gom lại tất cả nguồn ID
  const tid = useMemo(() => {
    const v = templateId || fromState || fromQuery || fromPath || fromSession;
    return v ? String(v) : "";
  }, [templateId, fromState, fromQuery, fromPath, fromSession]);

  const goCreate = () => {
    if (!tid) return;
    // Lưu lại để các trang khác dùng được
    sessionStorage.setItem("lastTemplateId", tid);
    navigate(`/create-project?templateId=${tid}`, {
      state: { templateId: Number(tid) },
      replace: false,
    });
  };

  return (
    <div className="sticky top-0 z-[80] w-full bg-[#1e2b69] py-3">
      <div className="mx-auto max-w-7xl px-4 flex justify-end">
        <button
          onClick={goCreate}
          disabled={!tid}
          className="rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-black shadow disabled:opacity-50"
          title={!tid ? "Không thấy templateId" : "Dùng giao diện này"}
        >
          SỬ DỤNG GIAO DIỆN NÀY
        </button>
      </div>
    </div>
  );
}
