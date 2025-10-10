import React from "react";
import { motion } from "framer-motion";
import {
  CupSoda,
  Coffee,
  Leaf,
  Droplets,
  Sparkles,
  Star,
  Truck,
  CreditCard,
  ShieldCheck,
  Phone,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// LDP Thức uống – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: cam/xanh tươi mát. Ảnh demo Unsplash. Responsive + framer-motion nhẹ.

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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-orange-700 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USP = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-700">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-stone-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-stone-600">{desc}</p>
  </div>
);

const CategoryCard = ({ img, name }) => (
  <a
    className="group relative block overflow-hidden rounded-2xl bg-orange-50 shadow-sm"
    href="#collections"
  >
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-stone-900 backdrop-blur shadow">
      {name}
    </span>
  </a>
);

const ProductCard = ({ img, title, price, badge }) => (
  <div className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <h5 className="text-base font-semibold text-stone-900">{title}</h5>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-stone-900">{price}</span>
        <a
          className="inline-flex items-center gap-1 text-stone-700 hover:text-black"
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
      highlight ? "border-orange-300 bg-white" : "border-orange-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-orange-700 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-stone-900">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900">
      {price}
      <span className="ml-1 text-sm font-normal text-stone-500">/ ly</span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-orange-700 text-white hover:bg-orange-800"
          : "bg-stone-900 text-white hover:bg-black"
      }`}
    >
      Đặt ngay
    </button>
  </div>
);

export default function BeverageLandingPage() {
  return (
    <div className="min-h-screen bg-orange-50 text-stone-900">
      {/* NAV */}
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-lime-500 text-white shadow">
              <CupSoda className="h-5 w-5" />
            </span>
            <span>SunJuice</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-700 md:flex">
            <a href="#categories" className="hover:text-orange-700">
              Danh mục
            </a>
            <a href="#collections" className="hover:text-orange-700">
              Sản phẩm
            </a>
            <a href="#why" className="hover:text-orange-700">
              Ưu điểm
            </a>
            <a href="#ingredients" className="hover:text-orange-700">
              Thành phần
            </a>
            <a href="#pricing" className="hover:text-orange-700">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black"
            >
              Đặt hàng
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1561047029-3000e62fdf7b?q=80&w=2000&auto=format&fit=crop"
          alt="juice hero"
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
              <Badge>Fresh Daily • 100% Natural</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Nạp vitamin sảng khoái,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-lime-500">
                  ngon – sạch – lành
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 md:text-lg">
                SunJuice ép lạnh từ trái cây tươi, không đường tinh luyện, bổ
                sung chất xơ tự nhiên – tốt cho dáng, đã cho mood.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                >
                  Xem menu
                </a>
                <a
                  href="#ingredients"
                  className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-50"
                >
                  Thành phần
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-stone-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Giao nhanh 30–60′
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> An toàn vệ sinh
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-orange-100 to-lime-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1542444459-db36c9b88cd7?q=80&w=1800&auto=format&fit=crop"
                  alt="hero drinks"
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
              <p className="mt-2 text-stone-600">
                Chọn theo hương vị bạn thích.
              </p>
            </div>
            <a
              href="#collections"
              className="hidden items-center gap-1 text-sm font-semibold text-stone-800 hover:text-black md:inline-flex"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <CategoryCard
              img="https://images.unsplash.com/photo-1542444592-2c98d8b4a6ee?q=80&w=1600&auto=format&fit=crop"
              name="Trái cây ép lạnh"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1600&auto=format&fit=crop"
              name="Sinh tố sữa hạt"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop"
              name="Trà trái cây"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1525389999255-82bad487f23c?q=80&w=1600&auto=format&fit=crop"
              name="Cà phê lạnh"
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-orange-50/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Menu bán chạy
            </h2>
            <p className="mt-2 text-stone-600">
              Tươi ngon mỗi ngày – ít đường – nhiều vitamin.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              img="https://images.unsplash.com/photo-1561047029-3000e62fdf7b?q=80&w=1600&auto=format&fit=crop"
              title="Cam Ép Fresh"
              price="39.000đ"
              badge="Best Seller"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1600&auto=format&fit=crop"
              title="Sinh tố Bơ Hạt Điều"
              price="49.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop"
              title="Trà Đào Cam Sả"
              price="45.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1525389999255-82bad487f23c?q=80&w=1600&auto=format&fit=crop"
              title="Cold Brew"
              price="45.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1542444592-2c98d8b4a6ee?q=80&w=1600&auto=format&fit=crop"
              title="Dưa Hấu Ép"
              price="35.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1542444459-db36c9b88cd7?q=80&w=1600&auto=format&fit=crop"
              title="Set 3 vị Mix"
              price="115.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section id="why">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Vì sao chọn SunJuice?
            </h2>
            <p className="mt-2 text-stone-600">
              Tối ưu hương vị – minh bạch thành phần – giao siêu nhanh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <USP
              icon={Droplets}
              title="Ép lạnh giữ dưỡng"
              desc="Giữ tối đa vitamin và enzyme tự nhiên, vị ngọt thanh."
            />
            <USP
              icon={Leaf}
              title="100% tự nhiên"
              desc="Không màu tổng hợp, không chất bảo quản."
            />
            <USP
              icon={Truck}
              title="Ship nhanh 30–60′"
              desc="Đóng gói lạnh, giữ đá lâu tan; theo dõi hành trình giao."
            />
          </div>
        </Container>
      </Section>

      {/* INGREDIENTS */}
      <Section id="ingredients" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Thành phần minh bạch
            </h2>
            <p className="mt-2 text-stone-600">Ví dụ cho ly "Cam Ép Fresh"</p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-stone-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-stone-200 bg-orange-50/50">
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-stone-800">
                    Nguyên liệu
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    Cam tươi 100%, mật ong hoa nhãn 5ml, đá viên
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-stone-800">
                    Calories
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    ~120 kcal / 350ml
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-stone-800">
                    Allergen
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    Không có sữa, không gluten
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* LOOKBOOK STRIP */}
      <Section id="lookbook" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1561047029-3000e62fdf7b?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542444592-2c98d8b4a6ee?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-orange-100/40"
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
            <p className="mt-2 text-stone-600">
              4.9/5 từ 1.500+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Gia Hân",
                quote: "Cam ép đỉnh, vị ngọt tự nhiên. Ship nhanh cực!",
              },
              {
                name: "Ngọc Tú",
                quote: "Set 3 vị mix dễ uống, packaging đẹp.",
              },
              {
                name: "Hữu Phước",
                quote: "Trà đào cam sả thơm, không gắt mùi đường.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-stone-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-stone-900">
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
        className="bg-gradient-to-b from-orange-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Combo tiết kiệm
            </h2>
            <p className="mt-2 text-stone-600">
              Giá áp dụng nội thành, chưa bao gồm phí giao xa.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Energy Boost"
              price="109.000đ"
              perks={[
                "2 cam ép + 1 dưa hấu",
                "Tặng ống hút giấy",
                "Giao nhanh 30–60′",
              ]}
            />
            <PriceCard
              name="Healthy Set"
              price="129.000đ"
              highlight
              perks={[
                "1 sinh tố + 2 juice",
                "Ít đường, nhiều xơ",
                "Bao bì thân thiện",
              ]}
            />
            <PriceCard
              name="Coffee & Chill"
              price="119.000đ"
              perks={[
                "1 Cold Brew + 1 trà trái cây",
                "Đá riêng",
                "Voucher -10% lần sau",
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1542444459-db36c9b88cd7?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Đặt ngay – giao trong 30 phút
            </h3>
            <p className="mt-3 text-stone-700">
              Để lại số điện thoại, tụi mình sẽ gọi xác nhận ngay.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-stone-400"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black">
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-lime-500 text-white shadow">
                <CupSoda className="h-5 w-5" />
              </span>
              <span>SunJuice</span>
            </a>
            <p className="mt-3 text-sm text-stone-700">
              Nước ép sạch – vị ngon tự nhiên – giao nhanh.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>
                <a className="hover:text-black" href="#">
                  Câu chuyện
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>
                <a className="hover:text-black" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="#">
                  Vận chuyển
                </a>
              </li>
              <li>
                <a className="hover:text-black" href="#">
                  Đổi trả
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Liên hệ</h4>
            <div className="mt-3 space-y-2 text-sm text-stone-700">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 6868
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-stone-600">
          © {new Date().getFullYear()} SunJuice. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
