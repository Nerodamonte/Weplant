import { Card, CardContent } from "../components/Card";
import { Users, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20 font-sans bg-white min-h-screen">
      {/* Hero */}
      <section className="px-8 py-16 text-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Về Chúng Tôi</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Weplant là đội ngũ chuyên gia thiết kế và phát triển website, mang đến
          giải pháp sáng tạo giúp thương hiệu của bạn tỏa sáng trên môi trường
          số.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-8 py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6">
              <Users className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Đội Ngũ</h3>
              <p className="text-gray-600 text-sm">
                Gồm những nhà thiết kế, lập trình viên và chuyên gia UI/UX tận
                tâm, sáng tạo.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6">
              <Target className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Sứ Mệnh</h3>
              <p className="text-gray-600 text-sm">
                Giúp doanh nghiệp xây dựng hình ảnh thương hiệu ấn tượng trên
                internet.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6">
              <Rocket className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Tầm Nhìn</h3>
              <p className="text-gray-600 text-sm">
                Trở thành đơn vị tiên phong trong lĩnh vực thiết kế web sáng tạo
                tại Việt Nam.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
