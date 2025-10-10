import React from "react";
import { motion } from "framer-motion";
import {
  Flower2,
  Leaf,
  Truck,
  CreditCard,
  Sparkles,
  Star,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// LDP Cửa hàng hoa – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: green/pink fresh, ảnh demo Unsplash. Responsive + framer-motion nhẹ.

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`w-full py-16 md:py-20 ${className}`}>
    {children}
  </section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USP = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-emerald-950">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-emerald-700/90">{desc}</p>
  </div>
);

const CategoryCard = ({ img, name }) => (
  <a
    className="group relative block overflow-hidden rounded-2xl bg-emerald-50 shadow-sm"
    href="#collections"
  >
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-emerald-900 backdrop-blur shadow">
      {name}
    </span>
  </a>
);

const ProductCard = ({ img, title, price, badge }) => (
  <div className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <h5 className="text-base font-semibold text-emerald-950">{title}</h5>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-emerald-950">{price}</span>
        <a
          className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950"
          href="#"
        >
          Chi tiết <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

const PriceCard = ({ name, price, perks, highlight }) => (
  <div
    className={`relative rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
      highlight ? "border-emerald-300 bg-white" : "border-emerald-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-emerald-950">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-950">
      {price}
      <span className="ml-1 text-sm font-normal text-emerald-700">/ bó</span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-emerald-700 text-white hover:bg-emerald-800"
          : "bg-emerald-900 text-emerald-50 hover:bg-black"
      }`}
    >
      Đặt ngay
    </button>
  </div>
);

export default function FlowerShopLandingPage() {
  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-950">
      {/* NAV */}
      <header className="sticky top-0 z-40 w-full border-b border-white/30 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow">
              <Flower2 className="h-5 w-5" />
            </span>
            <span className="text-emerald-950">Bloomy</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-emerald-800 md:flex">
            <a href="#categories" className="hover:text-emerald-700">
              Danh mục
            </a>
            <a href="#collections" className="hover:text-emerald-700">
              Bộ sưu tập
            </a>
            <a href="#why" className="hover:text-emerald-700">
              Cam kết
            </a>
            <a href="#reviews" className="hover:text-emerald-700">
              Đánh giá
            </a>
            <a href="#pricing" className="hover:text-emerald-700">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-emerald-900 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm hover:bg-black"
            >
              Đặt hoa
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2000&auto=format&fit=crop"
          alt="flower hero"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div>
              <Badge>Fresh Daily • Giao 2h</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Bó hoa tinh tế,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-emerald-700 to-teal-500">
                  kể thay lời bạn
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-emerald-800/90 md:text-lg">
                Bloomy chọn hoa mới mỗi sáng, cắm thủ công theo concept riêng.
                Sinh nhật, khai trương, cầu hôn – đều có mẫu phù hợp.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
                >
                  Xem mẫu
                </a>
                <a
                  href="#cta"
                  className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
                >
                  Đặt theo yêu cầu
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-emerald-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Giao nhanh 2h
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> 5+ chi nhánh
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-100 to-teal-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1800&auto=format&fit=crop"
                  alt="hero flowers"
                  className="h-80 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CATEGORIES */}
      <Section id="categories">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Danh mục nổi bật
              </h2>
              <p className="mt-2 text-emerald-800/90">Chọn nhanh theo dịp.</p>
            </div>
            <a
              href="#collections"
              className="hidden items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-900 md:inline-flex"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <CategoryCard
              img="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1600&auto=format&fit=crop"
              name="Sinh nhật"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1442458017215-285b83f65851?q=80&w=1600&auto=format&fit=crop"
              name="Khai trương"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1600&auto=format&fit=crop"
              name="Cầu hôn"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1461009209120-103617dc3c3a?q=80&w=1600&auto=format&fit=crop"
              name="Cảm ơn"
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-emerald-50/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bộ sưu tập bán chạy
            </h2>
            <p className="mt-2 text-emerald-800/90">
              Thiết kế cắm tay, ghi thiệp miễn phí.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              img="https://images.unsplash.com/photo-1442458017215-285b83f65851?q=80&w=1600&auto=format&fit=crop"
              title="Hoa hồng Pastel"
              price="459.000đ"
              badge="Best Seller"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1461009209120-103617dc3c3a?q=80&w=1600&auto=format&fit=crop"
              title="Tulip Trắng"
              price="529.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1600&auto=format&fit=crop"
              title="Peony Rose"
              price="689.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1600&auto=format&fit=crop"
              title="Sunflower Bright"
              price="499.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1600&auto=format&fit=crop"
              title="Mộc Lan"
              price="599.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1505575972945-2804b5de9f17?q=80&w=1600&auto=format&fit=crop"
              title="Violet Bouquet"
              price="559.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section id="why">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Vì sao chọn Bloomy?
            </h2>
            <p className="mt-2 text-emerald-800/90">
              Hoa tươi mỗi ngày – bảo quản đúng chuẩn – dịch vụ tận tâm.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <USP
              icon={Leaf}
              title="Hoa tươi chọn tay"
              desc="Nhập trực tiếp vườn hoa Đà Lạt – Hà Lan – Nhật, quy trình bảo quản lạnh."
            />
            <USP
              icon={Truck}
              title="Giao nhanh trong 2h"
              desc="Đóng gói chống sốc, giữ form đẹp; ship nội thành siêu tốc."
            />
            <USP
              icon={CreditCard}
              title="Thanh toán linh hoạt"
              desc="COD, thẻ, ví; xuất hoá đơn VAT theo yêu cầu."
            />
          </div>
        </Container>
      </Section>

      {/* LOOKBOOK STRIP */}
      <Section id="lookbook" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1442458017215-285b83f65851?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1461009209120-103617dc3c3a?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-emerald-100/40"
              >
                <img
                  src={src}
                  alt="lookbook"
                  className="h-40 w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Khách hàng nói gì?
            </h2>
            <p className="mt-2 text-emerald-800/90">
              4.9/5 từ 1.000+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Hoài An",
                quote: "Hoa tươi thơm, phối màu tinh tế. Giao đúng giờ.",
              },
              {
                name: "Khánh Hạ",
                quote: "Bó Peony quá xinh, lên hình cưới đẹp xuất sắc.",
              },
              {
                name: "Minh Khuê",
                quote: "Nhân viên nhiệt tình, thiệp viết tay dễ thương.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-emerald-800">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-emerald-950">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section
        id="pricing"
        className="bg-gradient-to-b from-emerald-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bảng giá combo
            </h2>
            <p className="mt-2 text-emerald-800/90">
              Giá tham khảo, có thể thay đổi theo loại hoa & mùa.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Basic Bouquet"
              price="349.000đ"
              perks={[
                "Bó hoa 8–10 bông",
                "Thiệp viết tay",
                "Giao 2h nội thành",
              ]}
            />
            <PriceCard
              name="Signature"
              price="599.000đ"
              highlight
              perks={[
                "Bó hoa 15–18 bông",
                "Ribbon lụa cao cấp",
                "Ảnh bàn giao",
              ]}
            />
            <PriceCard
              name="Premium Event"
              price="1.290.000đ"
              perks={[
                "Bó lớn 25+ bông",
                "Thiết kế theo concept",
                "Tư vấn phối màu 1-1",
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c86?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Đặt hoa ngay hôm nay
            </h3>
            <p className="mt-3 text-emerald-800">
              Để lại số điện thoại, florist gọi tư vấn trong ngày.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-emerald-500"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-emerald-50 shadow-sm hover:bg-black">
                Gọi tư vấn
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <Container className="grid gap-8 py-12 md:grid-cols-4">
          <div>
            <a className="flex items-center gap-2 font-semibold" href="#home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow">
                <Flower2 className="h-5 w-5" />
              </span>
              <span className="text-emerald-950">Bloomy</span>
            </a>
            <p className="mt-3 text-sm text-emerald-800">
              Hoa đẹp – Giao nhanh – Giá minh bạch.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-950">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-emerald-800">
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Câu chuyện
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-950">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-emerald-800">
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Vận chuyển
                </a>
              </li>
              <li>
                <a className="hover:text-emerald-700" href="#">
                  Đổi trả
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-950">Liên hệ</h4>
            <div className="mt-3 space-y-2 text-sm text-emerald-800">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 8080
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 25 Hoa Hồng, Q.Phú Nhuận
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-emerald-700">
          © {new Date().getFullYear()} Bloomy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
