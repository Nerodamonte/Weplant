import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-20 font-sans bg-white min-h-screen">
      {/* Hero */}
      <section className="px-8 py-16 text-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Liên Hệ</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Bạn có ý tưởng hoặc câu hỏi? Hãy liên hệ ngay với chúng tôi qua email
          hoặc số điện thoại dưới đây.
        </p>
      </section>

      {/* Contact Info */}
      <section className="px-8 py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <Mail className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600">
              <a
                href="mailto:contact.weplant@gmail.com"
                className="text-blue-600 hover:underline"
              >
                contact.weplant@gmail.com
              </a>
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <Phone className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Điện Thoại</h3>
            <p className="text-gray-600">📞 0123 456 789</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <MapPin className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Địa Chỉ</h3>
            <p className="text-gray-600">
              📍 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
