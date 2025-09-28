import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function TemplatesPage() {
  const [active, setActive] = useState("Template");
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const API = "https://weplant-r8hj.onrender.com/api";
  const GEMINI_API_KEY = "AIzaSyBip7sULJoCXfitgcPyWK20j5RIEYI6LtM";

  // Khởi tạo Gemini client
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Hàm fetch kèm token
  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("authToken") || "";
    return fetch(`${API}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  // Fetch danh sách templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await authFetch("/templates/getAll", { method: "GET" });
        if (!res.ok) throw new Error("Không thể lấy danh sách templates!");
        const result = await res.json();
        setTemplates(result?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Hàm gọi Gemini API
  const callGeminiAI = async (input, conversationHistory) => {
    if (!GEMINI_API_KEY) {
      throw new Error("API key của Gemini không được cấu hình!");
    }

    // Ghép lịch sử chat thành văn bản
    const historyText = conversationHistory
      .map((msg) => `${msg.sender === "user" ? "Người dùng: " : "AI: "}${msg.text}`)
      .join("\n");

    const prompt = `
      Tôi muốn bạn đóng vai trò là một trợ lý AI để tư vấn template website. 
      - Đây là lịch sử cuộc trò chuyện: ${historyText}
      - Dựa trên lịch sử và câu hỏi mới: "${input}", hãy tiếp tục tư vấn hoặc đặt câu hỏi để làm rõ nếu cần.
      - Đề xuất template phù hợp nhất (nếu có) với tên, mô tả, và danh mục.
      - Trả lời bằng tiếng Việt, ngắn gọn và thân thiện.
      - Nếu không có template phù hợp, hãy gợi ý liên hệ với đội ngũ Weplant để tùy chỉnh.
    `;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    if (!generatedText) {
      throw new Error("Không nhận được phản hồi từ Gemini API!");
    }

    return generatedText;
  };

  // Hàm xử lý chat submit
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: "ai", text: "Vui lòng nhập ý tưởng hoặc câu hỏi!" }]);
      return;
    }

    const updatedMessages = [...chatMessages, { sender: "user", text: chatInput }];
    setChatMessages(updatedMessages);

    try {
      const aiResponse = await callGeminiAI(chatInput, updatedMessages);
      setChatMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { sender: "ai", text: `Lỗi: ${err.message}` }]);
    }

    setChatInput("");
  };

  return (
    <div className="font-sans bg-white">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="weplant logo" className="w-6 h-6" />
            <span className="text-blue-600 font-bold text-xl">weplant</span>
          </div>
          <div className="flex gap-8">
            {[
              { label: "Trang Chủ", path: "/" },
              { label: "Template", path: "/templates" },
              { label: "Về Chúng Tôi", path: "/about" },
              { label: "Liên Hệ", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setActive(item.label)}
                className={`text-sm font-medium transition ${
                  active === item.label ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 text-center py-20 mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Khám Phá Các Template Website
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chat với AI để tìm template phù hợp nhất với nhu cầu của bạn!
        </p>
        <button
          onClick={() => {
            setIsChatOpen(true);
            if (chatMessages.length === 0) {
              setChatMessages([
                { sender: "ai", text: "Chào bạn! Bạn muốn dùng template cho mục đích gì? (Ví dụ: bán hàng, blog, portfolio, v.v.)" },
              ]);
            }
          }}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Chat với AI
        </button>
      </section>

      {/* Chatbox Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Tư Vấn Template Với AI</h2>
            <div className="h-64 overflow-y-auto mb-4 p-4 border rounded-lg">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Nhập câu trả lời hoặc câu hỏi..."
                className="flex-grow border rounded-lg px-4 py-2"
                onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <button
                onClick={handleChatSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Gửi
              </button>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="mt-4 text-sm text-gray-600 hover:underline"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm website hoặc lĩnh vực..."
            className="flex-grow border rounded-lg px-4 py-2"
          />
          <select className="border rounded-lg px-4 py-2">
            <option>Tất cả lĩnh vực</option>
            <option>Thương mại điện tử</option>
            <option>Blog</option>
            <option>Portfolio</option>
            <option>Doanh nghiệp</option>
            <option>Ẩm thực</option>
            <option>Thể thao</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>Sắp xếp: Mới nhất</option>
            <option>Phổ biến nhất</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Lọc
          </button>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && <p>Đang tải templates...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading &&
          !error &&
          templates.map((tpl) => (
            <div
              key={tpl.templateId}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/templates/${tpl.templateId}`}>
                <div className="h-40 bg-gray-200 cursor-pointer">
                  {tpl.images?.length > 0 ? (
                    <img
                      src={tpl.images[0].imageUrl}
                      alt={tpl.templateName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Không có ảnh
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link
                  to={`/templates/${tpl.templateId}`}
                  className="font-semibold text-lg mb-2 block hover:text-blue-600"
                >
                  {tpl.templateName}
                </Link>
                <p className="text-gray-600 text-sm mb-2">
                  {tpl.description || "Chưa có mô tả"}
                </p>
                <span className="text-xs text-blue-600 font-medium">
                  {tpl.category || "Chưa phân loại"}
                </span>
                <div className="mt-3">
                  <Link
                    to={`/templates/${tpl.templateId}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-20 text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Không tìm thấy template phù hợp?
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy để đội ngũ thiết kế chuyên nghiệp của Weplant hoặc AI của chúng tôi tạo ra mẫu website riêng cho bạn.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Tạo dự án tùy chỉnh
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-10">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-white mb-4">Weplant</h3>
            <p>
              Chúng tôi giúp bạn biến ý tưởng thành hiện thực với các giải pháp
              thiết kế website tùy chỉnh.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Dịch Vụ</h4>
            <ul className="space-y-2">
              <li>Thiết Kế Website</li>
              <li>Template Có Sẵn</li>
              <li>Tư Vấn UI/UX</li>
              <li>Bảo Trì Website</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>Trung Tâm Hỗ Trợ</li>
              <li>Câu Hỏi Thường Gặp</li>
              <li>Hướng Dẫn Sử Dụng</li>
              <li>Liên Hệ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-2">
              <li>📧 support@weplant.com</li>
              <li>📞 0324 456 789</li>
              <li>📍 123 Nguyễn Huệ, Q1, TP. HCM</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2025 Weplant. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
}
