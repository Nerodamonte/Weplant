import React, { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentListPage() {
  const API = "/api";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCodes, setQrCodes] = useState({}); // ✅ Lưu QR theo paymentId

  // Hàm fetch có token (giống bên AuthenticatedPage)
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

  // ✅ Lấy danh sách thanh toán
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Không tìm thấy thông tin người dùng");
          setLoading(false);
          return;
        }

        const response = await authFetch(`${API}/payments/getByUser/${userId}`);
        if (response.status === 401 || response.status === 403) {
          throw new Error("Bạn không có quyền truy cập. Vui lòng đăng nhập lại.");
        }
        if (!response.ok) throw new Error("Không thể tải danh sách thanh toán");

        const data = await response.json();
        console.log("Kết quả API:", data);
        setPayments(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Lỗi tải payment:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // ✅ Hàm gọi API lấy QR cho từng paymentId
  const handlePayment = async (paymentId) => {
    try {
      const res = await authFetch(`${API}/payments/getQrCode/${paymentId}`);
      if (!res.ok) throw new Error("Không thể lấy mã QR");
      const data = await res.json();

      console.log("QR data:", data);

      // Lưu QR riêng cho từng paymentId
      setQrCodes((prev) => ({
        ...prev,
        [paymentId]: data.data,
      }));
    } catch (err) {
      console.error("Lỗi lấy QR:", err);
      alert("Không thể tạo QR Code, vui lòng thử lại!");
    }
  };

  // ✅ Hàm ẩn mã QR
  const hideQr = (paymentId) => {
    setQrCodes((prev) => {
      const newCodes = { ...prev };
      delete newCodes[paymentId];
      return newCodes;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Danh Sách Thanh Toán
      </h1>

      {/* Loading / Error / Empty */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : payments.length === 0 ? (
        <div className="text-center text-gray-500">Bạn chưa có thanh toán nào.</div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Mã Payment</th>
                <th className="px-6 py-3">Mô tả</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Ngày thanh toán</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.paymentId} className="border-t hover:bg-gray-50">
                  {/* Mã payment */}
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>{p.paymentId}</span>
                  </td>

                  {/* Mô tả */}
                  <td className="px-6 py-4">{p.description}</td>

                  {/* Giá */}
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {p.price?.toLocaleString("vi-VN") ?? 0} ₫
                  </td>

                  {/* Ngày thanh toán */}
                  <td className="px-6 py-4 text-gray-600">
                    {p.payDated
                      ? new Date(p.payDated).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>

                  {/* Trạng thái */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : p.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </td>

                  {/* Thao tác */}
                  <td className="px-6 py-4 text-center">
                    {p.paymentStatus !== "SUCCESS" && (
                      <>
                        <button
                          onClick={() => handlePayment(p.paymentId)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition"
                        >
                          Thanh Toán
                        </button>

                        {/* ✅ Hiển thị QR riêng */}
                        {qrCodes[p.paymentId] && (
                          <div className="flex flex-col items-center mt-3">
                            <img
                              src={
                                qrCodes[p.paymentId].startsWith("http")
                                  ? qrCodes[p.paymentId]
                                  : `data:image/png;base64,${qrCodes[p.paymentId]}`
                              }
                              alt="QR Code"
                              className="w-40 h-40 border rounded-lg shadow-sm"
                            />
                            <button
                              onClick={() => hideQr(p.paymentId)}
                              className="mt-2 text-xs text-red-500 hover:underline"
                            >
                              Ẩn mã QR
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Nút quay lại */}
      <div className="text-center mt-10">
        <Link to="/templates" className="text-blue-600 hover:underline text-sm font-medium">
          ← Quay lại Template
        </Link>
      </div>
    </div>
  );
}
