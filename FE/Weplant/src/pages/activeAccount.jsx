import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API = "http://45.252.248.204:8080/api";

export default function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      setMessage({ text: "Liên kết không hợp lệ!", type: "error" });
      setIsLoading(false);
      return;
    }

    // Gọi API activate
    fetch(`${API}/auth/activateAccount?email=${encodeURIComponent(email)}`, {
      method: "PUT",  // Theo backend @PutMapping
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (response.ok) {
          setMessage({ 
            text: "Tài khoản đã được kích hoạt thành công! Đang chuyển đến đăng nhập...", 
            type: "success" 
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage({ text: data?.message || "Kích hoạt thất bại!", type: "error" });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        setMessage({ text: "", type: "error" });
        setIsLoading(false);
      });
  }, [searchParams, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-700 flex items-center justify-center">
        <div className="text-white text-lg">Đang kích hoạt tài khoản...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-700 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Kích Hoạt Tài Khoản Thành Công
          </h2>
        </div>

        {message.text && (
          <p 
            className={`text-sm mt-4 ${
              message.type === "success" 
                ? "text-green-600" 
                : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
        >
          Đi đến Đăng Nhập
        </button>
      </div>
    </div>
  );
}