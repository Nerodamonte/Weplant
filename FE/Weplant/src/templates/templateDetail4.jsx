import React from "react";

export default function TemplateDetail4() {
  const templateInfo = {
    name: "Template Văn Phòng Phẩm Xanh",
    price: 299000,
    desc: "Giao diện chuyên nghiệp cho cửa hàng văn phòng phẩm, tối ưu hiển thị sản phẩm, hỗ trợ giỏ hàng, thanh toán và quản lý kho hàng.",
  };

  const products = [
    {
      id: 1,
      name: "Bút bi Thiên Long TL-08",
      price: 5000,
      desc: "Bút bi Thiên Long TL-08 viết trơn, mực đều, thân cứng cáp – phù hợp cho học sinh và văn phòng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/290063/bhx/but-bi-thien-long-tl-08-1.jpg",
    },
    {
      id: 2,
      name: "Thước kẻ nhựa 30cm",
      price: 7000,
      desc: "Thước nhựa dẻo 30cm, độ chính xác cao, khó gãy, phù hợp cho học tập và công việc kỹ thuật.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/269339/bhx/thuoc-ke-nhua-30cm-1.jpg",
    },
    {
      id: 3,
      name: "Gôm tẩy Staedtler 526 50",
      price: 12000,
      desc: "Gôm tẩy chất lượng cao từ Đức, không làm rách giấy, tẩy sạch và bền bỉ.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/290067/bhx/gom-tay-staedtler-526-50-1.jpg",
    },
    {
      id: 4,
      name: "Vở Campus 200 trang",
      price: 25000,
      desc: "Vở Campus 200 trang giấy mịn, viết không lem, bìa cứng sang trọng – lý tưởng cho sinh viên và nhân viên văn phòng.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/269338/bhx/vo-campus-200-trang-1.jpg",
    },
    {
      id: 5,
      name: "Bút dạ quang Stabilo Boss",
      price: 18000,
      desc: "Bút dạ quang màu vàng nổi bật, mực đều, không lem – dành cho ghi chú, đánh dấu tài liệu.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/290068/bhx/but-da-quang-stabilo-boss-1.jpg",
    },
    {
      id: 6,
      name: "Combo 5 cây bút chì 2B",
      price: 20000,
      desc: "Bút chì 2B chất lượng cao, đầu nhọn dễ chuốt, thích hợp cho học sinh và nhân viên kế toán.",
      image:
        "https://cdn.tgdd.vn/Products/Images/7920/290069/bhx/but-chi-2b-1.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white text-gray-800">
      {/* Header */}
      <header className="bg-blue-700 text-white py-5 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold tracking-wide">
            Văn Phòng Phẩm Xanh
          </h1>
          <nav className="space-x-6 text-lg">
            <a href="#home" className="hover:text-blue-200">
              Trang chủ
            </a>
            <a href="#template" className="hover:text-blue-200">
              Mẫu website
            </a>
            <a href="#products" className="hover:text-blue-200">
              Sản phẩm
            </a>
            <a href="#contact" className="hover:text-blue-200">
              Liên hệ
            </a>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section id="home" className="bg-blue-200 text-center py-12">
        <h2 className="text-4xl font-semibold text-blue-900 mb-4">
          Dụng Cụ Văn Phòng – Bền Đẹp, Giá Tốt!
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Cung cấp các sản phẩm văn phòng phẩm chất lượng cao – từ bút, thước,
          tẩy đến vở, file tài liệu, giúp công việc của bạn trở nên dễ dàng và
          chuyên nghiệp hơn.
        </p>
      </section>

      {/* Template Purchase Section */}
      <section
        id="template"
        className="bg-white py-12 px-6 border-t border-blue-100 text-center"
      >
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">
          {templateInfo.name}
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">{templateInfo.desc}</p>
        <p className="text-3xl font-bold text-green-600 mb-6">
          {templateInfo.price.toLocaleString()}₫
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
          💳 Mua Template Ngay
        </button>
      </section>

      {/* Product Grid */}
      <section
        id="products"
        className="flex-1 container mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-4 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-contain mb-4 rounded-xl bg-blue-50"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 flex-1 mb-3">{item.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-bold text-lg">
                {item.price.toLocaleString()}₫
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Extra Info Section */}
      <section className="bg-blue-50 py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">
          Lý Do Chọn Chúng Tôi
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-8">
          Với hơn 10 năm kinh nghiệm trong lĩnh vực cung cấp văn phòng phẩm,
          chúng tôi cam kết mang đến sản phẩm chất lượng, giá cả hợp lý và dịch
          vụ tận tâm nhất.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Chất lượng hàng đầu
            </h3>
            <p className="text-gray-600">
              Sản phẩm từ các thương hiệu uy tín như Thiên Long, Deli,
              Staedtler,...
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Giao hàng nhanh
            </h3>
            <p className="text-gray-600">
              Miễn phí giao hàng cho đơn trên 300.000₫ trong nội thành.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              Giá cả cạnh tranh
            </h3>
            <p className="text-gray-600">
              Cam kết giá tốt nhất với nhiều ưu đãi hấp dẫn theo mùa.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-blue-800 text-white text-center py-6 mt-auto"
      >
        <p className="text-lg font-semibold">
          📍 Văn Phòng Phẩm Xanh – Đồng hành cùng bạn mỗi ngày
        </p>
        <p>Email: lienhe@vanphongphamxanh.vn | Hotline: 1900 6868</p>
        <p className="text-sm mt-2">
          © 2025 Văn Phòng Phẩm Xanh. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
