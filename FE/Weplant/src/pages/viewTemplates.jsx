import { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import logo from "../assets/logo.png";

export default function TemplatesPage() {
  const [active, setActive] = useState("Template");
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const API = "http://45.252.248.204:8080/api";
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

  // Parse phản hồi AI để chèn link
  const parseAIResponse = (text) => {
    const match = text.match(/Đề xuất template:\s*"([^"]+)"\s*với ID\s*(\d+)/i);
    if (match) {
      const name = match[1];
      const id = match[2];
      const updatedText = text.replace(
        /Đề xuất template:\s*"[^"]+"\s*với ID\s*\d+\./i,
        `Đề xuất template: "${name}". `
      );
      return (
        <span>
          {updatedText}
          <Link
            to={`/templates/${id}`}
            className="text-blue-500 underline font-medium hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nhấn vào đây để xem chi tiết {name}
          </Link>
          .
        </span>
      );
    }
    return <span>{text}</span>;
  };

  // Gọi Gemini API có xét giá
  const callGeminiAI = async (input, conversationHistory, templates) => {
    if (!GEMINI_API_KEY) {
      throw new Error("API key của Gemini không được cấu hình!");
    }

    const historyText = conversationHistory
      .map(
        (msg) => `${msg.sender === "user" ? "Người dùng: " : "AI: "}${msg.text}`
      )
      .join("\n");

    // Format template rõ ràng có giá
    const templatesText = templates
      .map(
        (tpl, index) =>
          `${index + 1}. Tên: "${tpl.templateName}"\n   Mô tả: ${
            tpl.description
          }\n   Giá: ${
            tpl.price !== null
              ? `${tpl.price.toLocaleString("vi-VN")}₫`
              : "Miễn phí"
          }\n   Ngày tạo: ${tpl.createAt}`
      )
      .join("\n\n");

    const prompt = `
      Dưới đây là danh sách templates có sẵn:
      ${templatesText}

      Bạn là trợ lý AI tư vấn template website của Weplant.
      - Đây là lịch sử hội thoại: ${historyText}
      - Người dùng vừa hỏi: "${input}"
      - Hãy đề xuất 1 template phù hợp nhất dựa trên:
         + Mục đích sử dụng (nếu có)
         + Phong cách mô tả
         + MỨC GIÁ phù hợp với túi tiền người dùng (nếu họ nhắc đến ngân sách, ví dụ “rẻ”, “miễn phí”, “dưới 1 triệu”, v.v.)
      - Nếu người dùng không nói rõ ngân sách, bạn chọn template có chất lượng tốt nhất phù hợp mô tả.
      - Format chính xác: "Đề xuất template: [Tên đầy đủ] với ID [templateId số]."
      - Sau đề xuất, gợi ý xem chi tiết template đó.
      - Viết ngắn gọn, thân thiện, tiếng Việt.
      - Nếu không có template phù hợp, gợi ý liên hệ đội ngũ Weplant để tạo mẫu riêng.
    `;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    if (!generatedText) {
      throw new Error("Không nhận được phản hồi từ Gemini API!");
    }

    return generatedText;
  };

  // Submit chat
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "ai", text: "Vui lòng nhập ý tưởng hoặc câu hỏi!" },
      ]);
      return;
    }

    const updatedMessages = [
      ...chatMessages,
      { sender: "user", text: chatInput },
    ];
    setChatMessages(updatedMessages);

    try {
      const aiResponse = await callGeminiAI(
        chatInput,
        updatedMessages,
        templates
      );
      const parsedResponse = parseAIResponse(aiResponse);
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", content: parsedResponse },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: `Lỗi: ${err.message}` },
      ]);
    }

    setChatInput("");
  };

  return (
    <div className="font-sans bg-white">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="weplant logo" className="h-16 w-auto" />
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
          Chat với AI để tìm template phù hợp nhất với nhu cầu và ngân sách của bạn!
        </p>
        <button
          onClick={() => {
            setIsChatOpen(true);
            if (chatMessages.length === 0) {
              setChatMessages([
                {
                  sender: "ai",
                  text: "Chào bạn! Bạn muốn dùng template cho mục đích gì và ngân sách khoảng bao nhiêu?",
                },
              ]);
            }
          }}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Chat với AI tư vấn
        </button>
      </section>

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Tư Vấn Template Với AI</h2>
            <div className="h-64 overflow-y-auto mb-4 p-4 border rounded-lg">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.content || msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Nhập câu hỏi hoặc ý tưởng..."
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
                <div className="h-40 bg-gray-200">
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
                <p className="text-sm font-medium text-green-600 mb-2">
                  {tpl.price !== null
                    ? tpl.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "Miễn phí"}
                </p>
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
    </div>
  );
}
