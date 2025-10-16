import React, { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentListPage() {
  const API = "/api";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Không tìm thấy thông tin người dùng");
          setLoading(false);
          return;
        }

        // Gọi API có kèm token
        const response = await authFetch(`${API}/payments/getByUser/${userId}`);
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Bạn không có quyền truy cập. Vui lòng đăng nhập lại."
          );
        }
        if (!response.ok) throw new Error("Không thể tải danh sách thanh toán");

        const data = await response.json();

        console.log("Kết quả API:", data); // 👉 để xem thực tế backend trả gì
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

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Danh Sách Thanh Toán
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : payments.length === 0 ? (
        <div className="text-center text-gray-500">
          Bạn chưa có thanh toán nào.
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Mã Payment</th>
                <th className="px-6 py-3">Template</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Ngày thanh toán</th>
                <th className="px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.paymentId} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>{p.paymentId}</span>
                  </td>

                  <td className="px-6 py-4">{p.description}</td>

                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {p.price?.toLocaleString("vi-VN") ?? 0} ₫
                  </td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/templates"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Quay lại Template
        </Link>
      </div>
    </div>
  );
}
