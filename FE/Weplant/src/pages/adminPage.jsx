import { useState, useEffect } from "react";
import { Bell, Plus, Edit, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [templates, setTemplates] = useState([]); // State cho templates
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("Tất cả");
  const [sort, setSort] = useState("Tên A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [templatePage, setTemplatePage] = useState(1); // Pagination riêng cho templates
  const [projectPage, setProjectPage] = useState(1); // Pagination riêng cho projects
  const itemsPerPage = 5;
  const [activeTab, setActiveTab] = useState("Khách hàng");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const [projectIdForUpload, setProjectIdForUpload] = useState(""); // Separate for project upload
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false); // Modal cho create/edit template
  const [projectModalOpen, setProjectModalOpen] = useState(false); // Modal cho create/edit project
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [formData, setFormData] = useState({
    templateName: "",
    description: "",
  }); // Form data cho template
  const [projectFormData, setProjectFormData] = useState({
    userId: "",
    templateId: "",
    packageId: "",
    projectName: "",
    description: "",
    status: "PENDING",
  }); // Form data cho project
  const [templateMessage, setTemplateMessage] = useState(""); // Message cho template
  const [projectMessage, setProjectMessage] = useState(""); // Message cho project
  const navigate = useNavigate();

  const API = "http://45.252.248.204:8080/api";

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

  // Fetch templates khi tab Templates active
  useEffect(() => {
    if (activeTab === "Templates") {
      const fetchTemplates = async () => {
        try {
          const res = await authFetch(`${API}/templates/getAll`);
          if (!res.ok) throw new Error("Không thể lấy danh sách templates!");
          const data = await res.json();
          setTemplates(data.data || []);
        } catch (e) {
          console.error("Fetch templates error:", e);
        }
      };
      fetchTemplates();
    }
  }, [activeTab]);

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

  // Lọc + sắp xếp customers
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

  // Phân trang customers
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Lọc + sắp xếp templates
  const filteredTemplates = templates
    .filter(
      (tpl) =>
        tpl.templateName.toLowerCase().includes(search.toLowerCase()) ||
        tpl.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "Tên A-Z"
        ? a.templateName.localeCompare(b.templateName)
        : b.templateName.localeCompare(a.templateName)
    );

  // Phân trang templates
  const totalTemplatePages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice(
    (templatePage - 1) * itemsPerPage,
    templatePage * itemsPerPage
  );

  // Lọc + sắp xếp projects
  const filteredProjects = projects
    .filter(
      (proj) =>
        proj.projectName.toLowerCase().includes(search.toLowerCase()) ||
        proj.userName.toLowerCase().includes(search.toLowerCase()) ||
        proj.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "Tên A-Z"
        ? a.projectName.localeCompare(b.projectName)
        : b.projectName.localeCompare(a.projectName)
    );

  // Phân trang projects
  const totalProjectPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (projectPage - 1) * itemsPerPage,
    projectPage * itemsPerPage
  );

  // Handle file change
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Handle upload submit (for templates or projects)
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if ((!projectIdForUpload && !templateId) || files.length === 0) {
      setUploadMessage("Vui lòng nhập ID và chọn file!");
      return;
    }

    const endpoint = projectIdForUpload
      ? `/attachments/upload/${projectIdForUpload}`
      : `/images/upload/${templateId}`;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadMessage("Tải lên thành công!");
        setTemplateId("");
        setProjectIdForUpload("");
        setFiles([]);
        // Refresh relevant data
        if (projectIdForUpload) {
          const resProjects = await authFetch(`${API}/projects/getAll`);
          const dataProjects = await resProjects.json();
          setProjects(dataProjects.data || []);
        } else {
          const resTemplates = await authFetch(`${API}/templates/getAll`);
          const dataTemplates = await resTemplates.json();
          setTemplates(dataTemplates.data || []);
        }
      } else {
        setUploadMessage(data.message || "Tải lên thất bại!");
      }
    } catch (err) {
      setUploadMessage("Lỗi kết nối server!");
    }
  };

  // Handle create/update template
  const handleTemplateSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      // Gom dữ liệu cần gửi
      const bodyData = {
        templateName: formData.templateName,
        description: formData.description,
        price: formData.price ?? 0, // thêm giá vào, mặc định 0 nếu trống
      };

      if (modalType === "create") {
        res = await authFetch(`${API}/templates/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
      } else {
        res = await authFetch(`${API}/templates/update/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setTemplateMessage(
          modalType === "create"
            ? "Tạo template thành công!"
            : "Cập nhật thành công!"
        );
        setTemplateModalOpen(false);
        setFormData({ templateName: "", description: "", price: 0 });

        // Refresh templates
        const resTemplates = await authFetch(`${API}/templates/getAll`);
        const dataTemplates = await resTemplates.json();
        setTemplates(dataTemplates.data || []);
      } else {
        setTemplateMessage(data.message || "Thao tác thất bại!");
      }
    } catch (err) {
      setTemplateMessage("Lỗi kết nối server!");
    }
  };

  // Handle create/update project
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (modalType === "create") {
        res = await authFetch(`${API}/projects/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectFormData),
        });
      } else {
        res = await authFetch(`${API}/projects/update/${projectFormData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: projectFormData.userId,
            templateId: projectFormData.templateId,
            packageId: projectFormData.packageId,
            projectName: projectFormData.projectName,
            description: projectFormData.description,
            status: projectFormData.status,
          }),
        });
      }
      const data = await res.json();
      if (res.ok) {
        setProjectMessage(
          modalType === "create"
            ? "Tạo project thành công!"
            : "Cập nhật thành công!"
        );
        setProjectModalOpen(false);
        setProjectFormData({
          userId: "",
          templateId: "",
          packageId: "",
          projectName: "",
          description: "",
          status: "PENDING",
        });
        // Refresh projects
        const resProjects = await authFetch(`${API}/projects/getAll`);
        const dataProjects = await resProjects.json();
        setProjects(dataProjects.data || []);
      } else {
        setProjectMessage(data.message || "Thao tác thất bại!");
      }
    } catch (err) {
      setProjectMessage("Lỗi kết nối server!");
    }
  };

  // Handle edit template
  const handleEditTemplate = (template) => {
    setFormData({
      id: template.templateId,
      templateName: template.templateName,
      description: template.description,
    });
    setModalType("edit");
    setTemplateModalOpen(true);
  };

  // Handle delete template
  const handleDeleteTemplate = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa template này?")) return;
    try {
      const res = await authFetch(`${API}/templates/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Refresh templates
        const resTemplates = await authFetch(`${API}/templates/getAll`);
        const dataTemplates = await resTemplates.json();
        setTemplates(dataTemplates.data || []);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  };

  // Handle edit project
  const handleEditProject = (project) => {
    setProjectFormData({
      id: project.projectId,
      userId: project.userId || "", // Assume from response or fetch
      templateId: project.templateId || "",
      packageId: project.packageId || "",
      projectName: project.projectName,
      description: project.description,
      status: project.status,
    });
    setModalType("edit");
    setProjectModalOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa project này?")) return;
    try {
      const res = await authFetch(`${API}/projects/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Refresh projects
        const resProjects = await authFetch(`${API}/projects/getAll`);
        const dataProjects = await resProjects.json();
        setProjects(dataProjects.data || []);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Cập nhật trạng thái thành ${newStatus}?`)) return;
    try {
      const res = await authFetch(
        `${API}/projects/updateStatus/${id}?status=${newStatus}`,
        { method: "PUT" }
      );
      if (res.ok) {
        // Refresh projects
        const resProjects = await authFetch(`${API}/projects/getAll`);
        const dataProjects = await resProjects.json();
        setProjects(dataProjects.data || []);
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  };

  /* ===== Dashboard helpers (inline) ===== */
  const DashCard = ({ className = "", children }) => (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}
    >
      {children}
    </div>
  );

  const DashStatCard = ({ title, value, delta, positive = true, icon }) => (
    <DashCard className="p-5 flex items-center gap-4">
      <div className="h-11 w-11 rounded-xl grid place-items-center bg-slate-50">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
        <p
          className={`text-xs mt-1 ${
            positive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {positive ? "+" : ""}
          {delta} from last month
        </p>
      </div>
    </DashCard>
  );

  function DashDonut({ percent = 75, size = 120, stroke = 10, label = "" }) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const dash = (percent / 100) * c;
    return (
      <div className="relative grid place-items-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#3B82F6"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-xl font-semibold text-slate-900">{percent}%</div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </div>
    );
  }

  function DashLineChart({ points = [], minY = 0, maxY = 600 }) {
    const W = 900,
      H = 340,
      pad = 32;
    if (!points.length) return null;
    const xs = points.map(
      (_, i) => pad + (i * (W - pad * 2)) / (points.length - 1)
    );
    const ys = points.map((v) => {
      const t = (v - minY) / (maxY - minY);
      return H - pad - t * (H - pad * 2);
    });
    const d = xs
      .map(
        (x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`
      )
      .join(" ");
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[320px]">
        {[0, 1, 2, 3, 4].map((i) => {
          const y = pad + (i * (H - pad * 2)) / 4;
          return (
            <line
              key={i}
              x1={pad}
              x2={W - pad}
              y1={y}
              y2={y}
              stroke="#EEF2F7"
              strokeWidth="1"
            />
          );
        })}
        <path d={d} fill="none" stroke="#3B82F6" strokeWidth="3" />
        <path
          d={`${d} L ${W - pad} ${H - pad} L ${pad} ${H - pad} Z`}
          fill="url(#grad)"
          opacity="0.18"
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  const DashProductItem = ({ img, name, sold, change }) => {
    const positive = change >= 0;
    return (
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt={name}
            className="h-9 w-9 rounded-md object-cover border border-slate-200"
          />
          <div>
            <p className="text-sm font-medium text-slate-800">{name}</p>
            <p className="text-xs text-slate-500">
              Sold: {sold.toLocaleString()}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
            positive
              ? "text-emerald-700 bg-emerald-50"
              : "text-rose-700 bg-rose-50"
          }`}
        >
          {positive ? "+" : ""}
          {change}%
        </span>
      </div>
    );
  };

  // mock data cho dashboard
  const chartData = [
    210, 320, 300, 360, 430, 360, 470, 420, 510, 340, 360, 580,
  ];
  const topProducts = [
    {
      name: "Maneki Neko Poster",
      sold: 1249,
      change: 15.2,
      img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Echoes Necklace",
      sold: 1145,
      change: 13.9,
      img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Spiky Ring",
      sold: 1073,
      change: 9.5,
      img: "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Pastel Petals Poster",
      sold: 1022,
      change: 2.3,
      img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Il Limone",
      sold: 992,
      change: -0.7,
      img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-blue-600">Weplant Admin</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              className={`pb-1 ${
                activeTab === "Dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("Khách hàng");
              }}
              className={`pb-1 ${
                activeTab === "Khách hàng"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Khách hàng
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("Dự án");
              }}
              className={`pb-1 ${
                activeTab === "Dự án"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dự án
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("Templates");
              }}
              className={`pb-1 ${
                activeTab === "Templates"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
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
        {activeTab === "Khách hàng" && (
          <>
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
                          <p className="font-medium text-gray-900">
                            {cust.name}
                          </p>
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
          </>
        )}

        {activeTab === "Templates" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Quản Lý Templates
              </h2>
              <button
                onClick={() => {
                  setModalType("create");
                  setFormData({ templateName: "", description: "" });
                  setTemplateModalOpen(true);
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
              >
                <Plus size={16} />
                Thêm Template
              </button>
            </div>

            {/* Filters cho templates */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm tên hoặc mô tả template"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
              </select>
            </div>

            {/* Table templates */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-700">ID</th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Tên Template
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Mô Tả
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Giá (₫)
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Ngày Tạo
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Số Ảnh
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTemplates.map((tpl) => (
                    <tr
                      key={tpl.templateId}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-gray-900">
                        {tpl.templateId}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {tpl.templateName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {tpl.description}
                      </td>

                      {/* ✅ Cột Giá Template */}
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        {tpl.price && tpl.price > 0
                          ? tpl.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : "Miễn phí"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {tpl.createAt
                          ? new Date(tpl.createAt).toLocaleDateString("vi-VN")
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {tpl.images?.length || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTemplate(tpl)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Sửa"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(tpl.templateId)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setTemplateId(tpl.templateId.toString());
                              setUploadModalOpen(true);
                            }}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Tải ảnh"
                          >
                            📷
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination cho templates */}
              <div className="flex justify-between items-center w-full">
                <div className="text-sm font-medium text-gray-700">
                  Hiển thị {paginatedTemplates.length} trong tổng số{" "}
                  {filteredTemplates.length} templates
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() =>
                      setTemplatePage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={templatePage === 1}
                  >
                    Trước
                  </button>
                  {[...Array(totalTemplatePages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`px-3 py-1 text-sm ${
                        templatePage === i + 1
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      } rounded`}
                      onClick={() => setTemplatePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() =>
                      setTemplatePage((prev) =>
                        Math.min(prev + 1, totalTemplatePages)
                      )
                    }
                    disabled={templatePage === totalTemplatePages}
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Dự án" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Quản Lý Dự Án
              </h2>
              <button
                onClick={() => {
                  setModalType("create");
                  setProjectFormData({
                    userId: "",
                    templateId: "",
                    packageId: "",
                    projectName: "",
                    description: "",
                    status: "PENDING",
                  });
                  setProjectModalOpen(true);
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
              >
                <Plus size={16} />
                Thêm Dự Án
              </button>
            </div>

            {/* Filters cho projects */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm tên dự án, user hoặc mô tả"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
              </select>
            </div>

            {/* Table projects */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-700">ID</th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Tên Dự Án
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      User
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Template
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Package
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Trạng Thái
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Ngày Tạo
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-700">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((proj) => (
                    <tr
                      key={proj.projectId}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-gray-900">
                        {proj.projectId}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {proj.projectName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {proj.userName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {proj.templateName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {proj.packageName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            proj.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : proj.status === "COMPLETED_CODING"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {proj.createAt
                          ? new Date(proj.createAt).toLocaleDateString("vi-VN")
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Sửa"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.projectId)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                          <select
                            defaultValue={proj.status}
                            onChange={(e) =>
                              handleUpdateStatus(proj.projectId, e.target.value)
                            }
                            className="text-xs border rounded p-1"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED_CODING">
                              COMPLETED_CODING
                            </option>
                            {/* Add other statuses as needed */}
                          </select>
                          <button
                            onClick={() => {
                              setProjectIdForUpload(proj.projectId.toString());
                              setUploadModalOpen(true);
                            }}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Tải attachments"
                          >
                            <Upload size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination cho projects */}
              <div className="flex justify-between items-center w-full">
                <div className="text-sm font-medium text-gray-700">
                  Hiển thị {paginatedProjects.length} trong tổng số{" "}
                  {filteredProjects.length} projects
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() =>
                      setProjectPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={projectPage === 1}
                  >
                    Trước
                  </button>
                  {[...Array(totalProjectPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`px-3 py-1 text-sm ${
                        projectPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      } rounded`}
                      onClick={() => setProjectPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() =>
                      setProjectPage((prev) =>
                        Math.min(prev + 1, totalProjectPages)
                      )
                    }
                    disabled={projectPage === totalProjectPages}
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Dashboard" && (
          <div className="space-y-5">
            {/* Header nhỏ */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
              <button className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50">
                Monthly
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Trái: nội dung chính */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-5">
                {/* Stat 3 cột */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <DashStatCard
                    title="Total profit"
                    value="$82,373.21"
                    delta="3.4%"
                    positive
                    icon={<span>💰</span>}
                  />
                  <DashStatCard
                    title="Total order"
                    value="7,234"
                    delta="2.8%"
                    positive={false}
                    icon={<span>🧾</span>}
                  />
                  <DashStatCard
                    title="Impression"
                    value="3.1M"
                    delta="4.6%"
                    positive
                    icon={<span>👁️</span>}
                  />
                </div>

                {/* Line chart */}
                <DashCard className="p-4">
                  <DashLineChart points={chartData} minY={180} maxY={630} />
                  <div className="px-2 pb-2 grid grid-cols-12 text-[11px] text-slate-500">
                    {[
                      "01 Jun",
                      "02 Jun",
                      "03 Jun",
                      "04 Jun",
                      "05 Jun",
                      "06 Jun",
                      "07 Jun",
                      "08 Jun",
                      "09 Jun",
                      "10 Jun",
                      "11 Jun",
                      "12 Jun",
                    ].map((d) => (
                      <div key={d} className="text-center">
                        {d}
                      </div>
                    ))}
                  </div>
                </DashCard>
              </div>

              {/* Phải: sidebar */}
              <div className="lg:col-span-4 xl:col-span-3 space-y-5">
                {/* Sales target */}
                <DashCard className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      Sales target
                    </p>
                    <button className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border bg-white hover:bg-slate-50">
                      Monthly
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          stroke="#475569"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-2xl font-semibold text-slate-900">
                        1.3K
                      </p>
                      <p className="text-xs text-slate-500">/ 1.8K Units</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Made this month year
                      </p>
                    </div>
                    <div className="justify-self-end">
                      <DashDonut percent={75} label="progress" />
                    </div>
                  </div>
                </DashCard>

                {/* Top product */}
                <DashCard className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Top product
                    </p>
                    <button className="text-xs px-2 py-1 rounded-lg border bg-white hover:bg-slate-50">
                      View all
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {topProducts.map((p) => (
                      <DashProductItem key={p.name} {...p} />
                    ))}
                  </div>
                </DashCard>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Create/Edit Project */}
      {projectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modalType === "create" ? "Tạo Dự Án Mới" : "Sửa Dự Án"}
            </h3>
            <form onSubmit={handleProjectSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <input
                  type="number"
                  value={projectFormData.userId}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      userId: e.target.value,
                    })
                  }
                  placeholder="Nhập User ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template ID
                </label>
                <input
                  type="number"
                  value={projectFormData.templateId}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      templateId: e.target.value,
                    })
                  }
                  placeholder="Nhập Template ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package ID
                </label>
                <input
                  type="number"
                  value={projectFormData.packageId}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      packageId: e.target.value,
                    })
                  }
                  placeholder="Nhập Package ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Dự Án
                </label>
                <input
                  type="text"
                  value={projectFormData.projectName}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      projectName: e.target.value,
                    })
                  }
                  placeholder="Nhập tên dự án"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả
                </label>
                <textarea
                  value={projectFormData.description}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Nhập mô tả dự án"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng Thái
                </label>
                <select
                  value={projectFormData.status}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED_CODING">COMPLETED_CODING</option>
                  {/* Add other statuses as needed */}
                </select>
              </div>
              {projectMessage && (
                <p
                  className={`text-sm mb-4 ${
                    projectMessage.includes("thành công")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {projectMessage}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {modalType === "create" ? "Tạo" : "Cập Nhật"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjectModalOpen(false);
                    setProjectFormData({
                      userId: "",
                      templateId: "",
                      packageId: "",
                      projectName: "",
                      description: "",
                      status: "PENDING",
                    });
                    setProjectMessage("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create/Edit Template */}
      {templateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modalType === "create" ? "Tạo Template Mới" : "Sửa Template"}
            </h3>
            <form onSubmit={handleTemplateSubmit}>
              {/* Tên Template */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Template
                </label>
                <input
                  type="text"
                  value={formData.templateName}
                  onChange={(e) =>
                    setFormData({ ...formData, templateName: e.target.value })
                  }
                  placeholder="Nhập tên template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Mô tả */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Nhập mô tả template"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Giá Template */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (₫)
                </label>
                <input
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  placeholder="Nhập giá template (để 0 nếu miễn phí)"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Thông báo */}
              {templateMessage && (
                <p
                  className={`text-sm mb-4 ${
                    templateMessage.includes("thành công")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {templateMessage}
                </p>
              )}

              {/* Nút hành động */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {modalType === "create" ? "Tạo" : "Cập Nhật"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTemplateModalOpen(false);
                    setFormData({
                      templateName: "",
                      description: "",
                      price: 0,
                    });
                    setTemplateMessage("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Upload - Updated for both */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {projectIdForUpload
                ? "Tải Lên Attachments Cho Dự Án"
                : "Tải Lên Ảnh Cho Template"}
            </h3>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID {projectIdForUpload ? "Dự Án" : "Template"}
                </label>
                <input
                  type="text"
                  value={projectIdForUpload || templateId}
                  onChange={(e) =>
                    projectIdForUpload
                      ? setProjectIdForUpload(e.target.value)
                      : setTemplateId(e.target.value)
                  }
                  placeholder={`Nhập ID ${
                    projectIdForUpload ? "dự án" : "template"
                  } (ví dụ: 1)`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn file (nhiều file)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  required
                />
                {files.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Đã chọn {files.length} file
                  </p>
                )}
              </div>
              {uploadMessage && (
                <p
                  className={`text-sm mb-4 ${
                    uploadMessage.includes("thành công")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {uploadMessage}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Tải Lên
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setTemplateId("");
                    setProjectIdForUpload("");
                    setFiles([]);
                    setUploadMessage("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
