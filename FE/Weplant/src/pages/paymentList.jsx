import React, { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentListPage() {
  const API = "/api"; // <-- bạn dùng như thế này đúng
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Không tìm thấy thông tin người dùng");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API}/payments/getByUser/${userId}`);
        if (!response.ok) throw new Error("Không thể tải danh sách thanh toán");

        const data = await response.json();
        setPayments(data);
      } catch (err) {
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
                  <td className="px-6 py-4">{p.templateName}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {p.amount.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-6 py-4">
                    {new Date(p.paymentDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
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
