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
  const [formData, setFormData] = useState({ templateName: "", description: "" }); // Form data cho template
  const [projectFormData, setProjectFormData] = useState({ 
    userId: "", templateId: "", packageId: "", projectName: "", description: "", status: "PENDING" 
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
    .filter(
      (cust) => accountType === "Tất cả" || cust.type === accountType
    )
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
    .filter((tpl) =>
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
    .filter((proj) =>
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

    const endpoint = projectIdForUpload ? `/attachments/upload/${projectIdForUpload}` : `/images/upload/${templateId}`;
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
      if (modalType === "create") {
        res = await authFetch(`${API}/templates/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await authFetch(`${API}/templates/update/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateName: formData.templateName, description: formData.description }),
        });
      }
      const data = await res.json();
      if (res.ok) {
        setTemplateMessage(modalType === "create" ? "Tạo template thành công!" : "Cập nhật thành công!");
        setTemplateModalOpen(false);
        setFormData({ templateName: "", description: "" });
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
            status: projectFormData.status
          }),
        });
      }
      const data = await res.json();
      if (res.ok) {
        setProjectMessage(modalType === "create" ? "Tạo project thành công!" : "Cập nhật thành công!");
        setProjectModalOpen(false);
        setProjectFormData({ 
          userId: "", templateId: "", packageId: "", projectName: "", description: "", status: "PENDING" 
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
      const res = await authFetch(`${API}/templates/delete/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`${API}/projects/delete/${id}`, { method: "DELETE" });
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
      const res = await authFetch(`${API}/projects/updateStatus/${id}?status=${newStatus}`, { method: "PUT" });
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
                setActiveTab("Dashboard");
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
          </>
        )}

        {activeTab === "Templates" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quản Lý Templates</h2>
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
                    <th className="px-6 py-3 font-medium text-gray-700">Tên Template</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Mô Tả</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Ngày Tạo</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Số Ảnh</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTemplates.map((tpl) => (
                    <tr key={tpl.templateId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{tpl.templateId}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{tpl.templateName}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{tpl.description}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {tpl.createAt ? new Date(tpl.createAt).toLocaleDateString("vi-VN") : "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{tpl.images?.length || 0}</td>
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
                  Hiển thị {paginatedTemplates.length} trong tổng số {filteredTemplates.length} templates
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() => setTemplatePage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() => setTemplatePage((prev) => Math.min(prev + 1, totalTemplatePages))}
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
              <h2 className="text-2xl font-bold text-gray-900">Quản Lý Dự Án</h2>
              <button
                onClick={() => {
                  setModalType("create");
                  setProjectFormData({ 
                    userId: "", templateId: "", packageId: "", projectName: "", description: "", status: "PENDING" 
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
                    <th className="px-6 py-3 font-medium text-gray-700">Tên Dự Án</th>
                    <th className="px-6 py-3 font-medium text-gray-700">User</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Template</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Package</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Trạng Thái</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Ngày Tạo</th>
                    <th className="px-6 py-3 font-medium text-gray-700">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((proj) => (
                    <tr key={proj.projectId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{proj.projectId}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{proj.projectName}</td>
                      <td className="px-6 py-4 text-gray-600">{proj.userName}</td>
                      <td className="px-6 py-4 text-gray-600">{proj.templateName}</td>
                      <td className="px-6 py-4 text-gray-600">{proj.packageName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          proj.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                          proj.status === "COMPLETED_CODING" ? "bg-green-100 text-green-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {proj.createAt ? new Date(proj.createAt).toLocaleDateString("vi-VN") : "-"}
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
                            onChange={(e) => handleUpdateStatus(proj.projectId, e.target.value)}
                            className="text-xs border rounded p-1"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED_CODING">COMPLETED_CODING</option>
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
                  Hiển thị {paginatedProjects.length} trong tổng số {filteredProjects.length} projects
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="px-3 py-1 text-sm text-blue-600 border border-gray-300 rounded hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    onClick={() => setProjectPage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() => setProjectPage((prev) => Math.min(prev + 1, totalProjectPages))}
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">Tổng quan hệ thống (stats, charts) sẽ được thêm sau.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input
                  type="number"
                  value={projectFormData.userId}
                  onChange={(e) => setProjectFormData({ ...projectFormData, userId: e.target.value })}
                  placeholder="Nhập User ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Template ID</label>
                <input
                  type="number"
                  value={projectFormData.templateId}
                  onChange={(e) => setProjectFormData({ ...projectFormData, templateId: e.target.value })}
                  placeholder="Nhập Template ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Package ID</label>
                <input
                  type="number"
                  value={projectFormData.packageId}
                  onChange={(e) => setProjectFormData({ ...projectFormData, packageId: e.target.value })}
                  placeholder="Nhập Package ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên Dự Án</label>
                <input
                  type="text"
                  value={projectFormData.projectName}
                  onChange={(e) => setProjectFormData({ ...projectFormData, projectName: e.target.value })}
                  placeholder="Nhập tên dự án"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô Tả</label>
                <textarea
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  placeholder="Nhập mô tả dự án"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng Thái</label>
                <select
                  value={projectFormData.status}
                  onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
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
                    projectMessage.includes("thành công") ? "text-green-600" : "text-red-600"
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
                      userId: "", templateId: "", packageId: "", projectName: "", description: "", status: "PENDING" 
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Template
                </label>
                <input
                  type="text"
                  value={formData.templateName}
                  onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
                  placeholder="Nhập tên template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả template"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {templateMessage && (
                <p
                  className={`text-sm mb-4 ${
                    templateMessage.includes("thành công") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {templateMessage}
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
                    setTemplateModalOpen(false);
                    setFormData({ templateName: "", description: "" });
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
              {projectIdForUpload ? "Tải Lên Attachments Cho Dự Án" : "Tải Lên Ảnh Cho Template"}
            </h3>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID {projectIdForUpload ? "Dự Án" : "Template"}
                </label>
                <input
                  type="text"
                  value={projectIdForUpload || templateId}
                  onChange={(e) => projectIdForUpload ? setProjectIdForUpload(e.target.value) : setTemplateId(e.target.value)}
                  placeholder={`Nhập ID ${projectIdForUpload ? "dự án" : "template"} (ví dụ: 1)`}
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
                    uploadMessage.includes("thành công") ? "text-green-600" : "text-red-600"
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