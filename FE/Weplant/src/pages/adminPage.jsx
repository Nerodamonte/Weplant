import { useState } from "react";
import { Bell } from "lucide-react";
import "../App.css"; // Đã import Tailwind CSS

const customers = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40?text=NL", // Thay bằng URL avatar thực
    name: "Nguyễn Thị Lan",
    email: "nguyenlan@email.com",
    type: "Cá nhân",
    typeColor: "bg-blue-100 text-blue-600",
    registerDate: "15/12/2024",
    projects: 3,
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40?text=AT", // Thay bằng URL avatar thực
    name: "Công ty ABC Tech",
    email: "contact@abctech.com",
    type: "Doanh nghiệp",
    typeColor: "bg-purple-100 text-purple-600",
    registerDate: "10/12/2024",
    projects: 7,
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/40?text=TM", // Thay bằng URL avatar thực
    name: "Trần Văn Minh",
    email: "tranminh@email.com",
    type: "Cá nhân",
    typeColor: "bg-blue-100 text-blue-600",
    registerDate: "08/12/2024",
    projects: 1,
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/40?text=LH", // Thay bằng URL avatar thực
    name: "Lê Thị Hương",
    email: "huongle@email.com",
    type: "Cá nhân",
    typeColor: "bg-blue-100 text-blue-600",
    registerDate: "05/12/2024",
    projects: 2,
  },
  {
    id: 5,
    avatar: "https://via.placeholder.com/40?text=XY", // Thay bằng URL avatar thực
    name: "Startup XYZ",
    email: "hello@startupxyz.com",
    type: "Doanh nghiệp",
    typeColor: "bg-purple-100 text-purple-600",
    registerDate: "01/12/2024",
    projects: 5,
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("Tất cả");
  const [sort, setSort] = useState("Tên A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lọc và sắp xếp dữ liệu
  const filteredCustomers = customers
    .filter(
      (cust) =>
        cust.name.toLowerCase().includes(search.toLowerCase()) ||
        cust.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((cust) => accountType === "Tất cả" || cust.type === accountType)
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
          <h1 className="text-xl font-bold text-blue-600">Weplant</h1>
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
            src="https://via.placeholder.com/32?text=U" // Thay bằng URL avatar thực
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
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
            <option>Cá nhân</option>
            <option>Doanh nghiệp</option>
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
          <div className="flex justify-between items-center w-full">
            {" "}
            {/* Thêm px-4 để giảm padding tổng thể */}
            <div className="text-sm font-medium text-gray-700">
              Hiện thị hiện 5 trong tổng số 25 khách hàng
            </div>
            <div className="flex items-center gap-1">
              <button
                className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
               
              >
                Trước
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } rounded`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
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

        {/* Footer */}
        <footer className="mt-auto bg-gray-50 p-4 rounded-lg shadow-sm flex justify-center w-full">
          <div className="text-sm text-gray-700 text-center">
            Cần hỗ trợ?
            <br />
            Liên hệ qua email:{" "}
            <a
              href="mailto:admin@weplant.com"
              className="text-blue-600 hover:underline"
            >
              admin@weplant.com
            </a>{" "}
            hoặc số điện thoại:{" "}
            <a href="tel:0123456789" className="text-blue-600 hover:underline">
              0123 456 789
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
