import React, { useEffect, useState } from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";

//const API = "http://45.252.248.204:8080/api";
const API = "/api";

/* Helper for authenticated fetch */
const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("authToken") || "";
  return fetch(url, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};

/* ---------- Small Components ---------- */
const Card = ({ title, value, icon, color = "blue" }) => (
  <div
    className={`p-5 rounded-2xl shadow-sm bg-white border-l-4 border-${color}-500`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-800">{value}</h3>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

/* ---------- Main Page ---------- */
export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API Dashboard chính
    authFetch(`${API}/dashboards/stats`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const json = JSON.parse(text);
        setStats(json.data);
      })
      .catch((err) => console.error("Error fetching dashboard:", err))
      .finally(() => setLoading(false));

    // Gọi danh sách Payments
    authFetch(`${API}/payments/getAll`)
      .then((res) => res.json())
      .then((json) => setPayments(json.data || []))
      .catch((err) => console.error("Error fetching payments:", err));

    // Gọi danh sách Feedbacks
    authFetch(`${API}/feedbacks/getAll`)
      .then((res) => res.json())
      .then((json) => setFeedbacks(json.data || []))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  if (loading)
    return (
      <div className="p-10 text-slate-600 text-lg font-medium">
        ⏳ Đang tải Dashboard...
      </div>
    );

  if (!stats)
    return (
      <div className="p-10 text-red-600 text-lg">
        ❌ Không thể tải dữ liệu Dashboard.
      </div>
    );

  // 🔹 Format tiền tệ VNĐ
  const formatVND = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) ??
    "0 ₫";

  // 🔹 Dữ liệu biểu đồ doanh thu theo tháng
  const chartData =
    stats.monthlyRevenue?.map((m) => ({
      name: m.monthName,
      DoanhThu: m.totalRevenue,
    })) ?? [];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          🌿 WePlant Admin Dashboard
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <Card title="Người dùng" value={stats.totalUsers} icon="👥" color="blue" />
          <Card title="Dự án" value={stats.totalProjects} icon="📁" color="green" />
          <Card
            title="Doanh thu"
            value={formatVND(stats.totalRevenue)}
            icon="💰"
            color="yellow"
          />
          <Card title="Mẫu thiết kế" value={stats.totalTemplates} icon="📄" color="indigo" />
          <Card title="Phản hồi" value={stats.totalFeedbacks} icon="💬" color="rose" />
          <Card
            title="Dịch vụ"
            value={stats.serviceUsage?.length ?? 0}
            icon="🛠️"
            color="violet"
          />
        </div>

        {/* Revenue chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            📊 Doanh thu theo tháng
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) =>
                  value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    maximumFractionDigits: 0,
                  })
                }
              />
              <Tooltip
                formatter={(value) =>
                  value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    maximumFractionDigits: 0,
                  })
                }
              />
              <Legend />
              <Bar dataKey="DoanhThu" fill="#3B82F6" barSize={40} />
              <Line type="monotone" dataKey="DoanhThu" stroke="#10B981" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Templates + Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Templates */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              🧩 Mẫu được sử dụng nhiều
            </h2>
            <div className="divide-y divide-slate-100">
              {stats.templatePurchases?.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {t.templateName}
                    </p>
                    <p className="text-xs text-slate-500">
                      Số lượt dùng: {t.usageCount}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Usage */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              ⚙️ Dịch vụ được sử dụng
            </h2>
            <div className="divide-y divide-slate-100">
              {stats.serviceUsage?.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-slate-700">
                    {s.serviceName}
                  </span>
                  <span className="text-sm text-slate-900 font-semibold">
                    {s.usageCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payments & Feedbacks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Payments */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              💳 Giao dịch gần đây
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-3 py-2">Mã GD</th>
                    <th className="px-3 py-2">Người dùng</th>
                    <th className="px-3 py-2">Mô tả</th>
                    <th className="px-3 py-2">Số tiền</th>
                    <th className="px-3 py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 6).map((p, i) => (
                    <tr key={i} className="border-b hover:bg-slate-50">
                      <td className="px-3 py-2">{p.paymentId}</td>
                      <td className="px-3 py-2">{p.fullName}</td>
                      <td className="px-3 py-2">{p.description}</td>
                      <td className="px-3 py-2 font-medium">
                        {formatVND(p.price)}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.paymentStatus === "SUCCESS"
                              ? "bg-green-100 text-green-700"
                              : p.paymentStatus === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
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
          </div>

          {/* Feedbacks */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              💬 Phản hồi mới nhất
            </h2>
            <div className="divide-y divide-slate-100">
              {feedbacks.slice(0, 6).map((f, i) => (
                <div key={i} className="py-3">
                  <p className="text-sm font-medium text-slate-800">
                    {f.userName} • {f.projectName}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{f.content}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    ⭐ {f.rating} •{" "}
                    {new Date(f.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
