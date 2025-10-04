import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("Tất cả");
  const [sort, setSort] = useState("Tên A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const API = "http://45.252.248.204:8080/api";

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

  // Kiểm tra quyền truy cập
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "ADMIN") {
      navigate("/login");
    }
  }, [navigate]);

  // Gọi API users + projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await authFetch(`${API}/users/getAll`);
        const dataUsers = await resUsers.json();

        const resProjects = await authFetch(`${API}/projects/getAll`);
        const dataProjects = await resProjects.json();

        setUsers(dataUsers.data || []);
        setProjects(dataProjects.data || []);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };
    fetchData();
  }, []);

  // Ghép user với số dự án
  const customers = users.map((u) => {
    const projectCount = projects.filter(
      (p) => p.userName === u.fullName
    ).length;

    return {
      id: u.userId,
      avatar: `https://via.placeholder.com/40?text=${u.fullName
        .split(" ")
        .pop()
        .charAt(0)}`,
      name: u.fullName,
      email: u.email,
      type: u.role === "ADMIN" ? "Quản trị" : "Người dùng",
      typeColor:
        u.role === "ADMIN"
          ? "bg-red-100 text-red-600"
          : "bg-blue-100 text-blue-600",
      registerDate: u.createAt
        ? new Date(u.createAt).toLocaleDateString("vi-VN")
        : "-",
      projects: projectCount,
    };
  });

  // Lọc + sắp xếp
  const filteredCustomers = customers
    .filter(
      (cust) =>
        cust.name.toLowerCase().includes(search.toLowerCase()) ||
        cust.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (cust) => accountType === "Tất cả" || cust.type === accountType
    )
    .sort((a, b) =>
      sort === "Tên A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Phân trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-blue-600">Weplant Admin</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <a
              href="#"
              className="text-blue-600 border-b-2 border-blue-600 pb-1"
            >
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Khách hàng
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Dự án
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Templates
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <img
            src="https://via.placeholder.com/32?text=U"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Danh Sách Khách Hàng
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Xem và tìm kiếm thông tin khách hàng đã đăng ký trên Weplant.
        </p>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập tên hoặc email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Tất cả</option>
            <option>Người dùng</option>
            <option>Quản trị</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Tên A-Z</option>
            <option>Tên Z-A</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Khách hàng
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Loại tài khoản
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Số dự án
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{cust.name}</p>
                      <p className="text-gray-500 text-sm">{cust.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${cust.typeColor}`}
                    >
                      {cust.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {cust.registerDate}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {cust.projects} dự án
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-between items-center w-full">
            <div className="text-sm font-medium text-gray-700">
              Hiển thị {paginatedCustomers.length} trong tổng số{" "}
              {filteredCustomers.length} khách hàng
            </div>
            <div className="flex items-center gap-1">
              <button
                className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } rounded`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
