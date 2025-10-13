import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UseTemplateButton({ templateId }) {
  const navigate = useNavigate();
  const location = useLocation();

  // gom đủ mọi nguồn để chắc chắn có id
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");

  const tid = useMemo(() => {
    const v = templateId || fromState || fromQuery || fromSession;
    return v ? String(v) : "";
  }, [templateId, fromState, fromQuery, fromSession]);

  const goCreate = () => {
    if (!tid) return;
    // giữ lại để trang create-project đọc được ngay
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
