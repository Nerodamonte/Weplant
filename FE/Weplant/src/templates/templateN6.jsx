import React from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Wrench,
  ShieldCheck,
  Truck,
  CreditCard,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronRight,
  Phone,
  Gauge,
  Thermometer,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// LDP Sen Cây Tắm – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: xanh dương/xám sạch sẽ. Ảnh demo Unsplash.

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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sky-800 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USP = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-slate-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
  </div>
);

const CategoryCard = ({ img, name }) => (
  <a
    className="group relative block overflow-hidden rounded-2xl bg-sky-50 shadow-sm"
    href="#collections"
  >
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-slate-900 backdrop-blur shadow">
      {name}
    </span>
  </a>
);

const ProductCard = ({ img, title, price, badge }) => (
  <div className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <h5 className="text-base font-semibold text-slate-900">{title}</h5>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-900">{price}</span>
        <a
          className="inline-flex items-center gap-1 text-slate-700 hover:text-black"
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
      highlight ? "border-sky-300 bg-white" : "border-sky-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-slate-900">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
      {price}
      <span className="ml-1 text-sm font-normal text-slate-500">/ bộ</span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-sky-700 text-white hover:bg-sky-800"
          : "bg-slate-900 text-white hover:bg-black"
      }`}
    >
      Chọn gói
    </button>
  </div>
);

export default function ShowerSetLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAV */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow">
              <Droplets className="h-5 w-5" />
            </span>
            <span>HydroShower</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
            <a href="#categories" className="hover:text-sky-700">
              Danh mục
            </a>
            <a href="#collections" className="hover:text-sky-700">
              Sản phẩm
            </a>
            <a href="#why" className="hover:text-sky-700">
              Ưu điểm
            </a>
            <a href="#specs" className="hover:text-sky-700">
              Thông số
            </a>
            <a href="#pricing" className="hover:text-sky-700">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black"
            >
              Liên hệ
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop"
          alt="shower hero"
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
              <Badge>New • Tiết kiệm nước 35%</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Sen cây cao cấp,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-sky-700 to-cyan-500">
                  tăng áp êm ái
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                HydroShower sử dụng lõi trộn khí Venturi, bề mặt mạ Chrome/Black
                Nickel chống bám bẩn. Bảo hành 5 năm ở thân vòi.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-800"
                >
                  Xem mẫu
                </a>
                <a
                  href="#specs"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Thông số kỹ thuật
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-slate-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Bảo hành 5 năm
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Lắp đặt 24–48h
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-sky-100 to-cyan-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1591012911207-d680b8b2f4b4?q=80&w=1800&auto=format&fit=crop"
                  alt="hero shower"
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
              <p className="mt-2 text-slate-600">
                Chọn theo kiểu dáng & chất liệu.
              </p>
            </div>
            <a
              href="#collections"
              className="hidden items-center gap-1 text-sm font-semibold text-slate-800 hover:text-black md:inline-flex"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <CategoryCard
              img="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop"
              name="Sen cây tắm"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1584624276294-1df4a4df81f8?q=80&w=1600&auto=format&fit=crop"
              name="Vòi chậu"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1616596879720-b26d5b0a1d57?q=80&w=1600&auto=format&fit=crop"
              name="Phụ kiện phòng tắm"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1584624276294-1df4a4df81f8?q=80&w=1600&auto=format&fit=crop"
              name="Bộ combo"
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-sky-50/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Sản phẩm bán chạy
            </h2>
            <p className="mt-2 text-slate-600">
              Vật liệu Inox 304 / Đồng thau, mạ PVD/Chrome.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              img="https://images.unsplash.com/photo-1591012911207-d680b8b2f4b4?q=80&w=1600&auto=format&fit=crop"
              title="Sen cây tăng áp Hydro S1"
              price="2.590.000đ"
              badge="Best Seller"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=1600&auto=format&fit=crop"
              title="Sen cây nhiệt độ ổn định T-Pro"
              price="3.790.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1586388723776-bf6c2b1a0f98?q=80&w=1600&auto=format&fit=crop"
              title="Vòi tắm tay áp lực AirMix"
              price="690.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=1600&auto=format&fit=crop"
              title="Bộ sen âm tường SlimSet"
              price="4.990.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop"
              title="Sen cây vuông Urban Q"
              price="2.990.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1591012911207-d680b8b2f4b4?q=80&w=1600&auto=format&fit=crop"
              title="Combo vòi + sen EcoPack"
              price="3.290.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* WHY */}
      <Section id="why">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Ưu điểm nổi bật
            </h2>
            <p className="mt-2 text-slate-600">
              Chú trọng độ bền – an toàn nước – trải nghiệm tắm êm ái.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <USP
              icon={Droplets}
              title="Tiết kiệm nước 35%"
              desc="Công nghệ trộn khí giúp tia nước lớn mà vẫn tiết kiệm."
            />
            <USP
              icon={Gauge}
              title="Tăng áp êm"
              desc="Thiết kế lỗ tia nano và khoang tăng áp hạn chế tiếng ồn."
            />
            <USP
              icon={Wrench}
              title="Lắp đặt nhanh"
              desc="Tương thích ren phổ thông G1/2; phụ kiện kèm sẵn."
            />
          </div>
        </Container>
      </Section>

      {/* SPECS */}
      <Section id="specs" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Thông số kỹ thuật
            </h2>
            <p className="mt-2 text-slate-600">Áp dụng cho mẫu Hydro S1.</p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-200 bg-slate-50">
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    Chất liệu
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Inox 304 + Đồng thau
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    Lớp mạ
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    Chrome / PVD Black Nickel
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    Áp lực nước
                  </td>
                  <td className="px-4 py-3 text-slate-600">0.1 – 0.5 MPa</td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    Nhiệt độ tối đa
                  </td>
                  <td className="px-4 py-3 text-slate-600 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" /> 80°C
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    Bảo hành
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    5 năm (thân vòi) • 1 năm (phụ kiện)
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
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1591012911207-d680b8b2f4b4?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1586388723776-bf6c2b1a0f98?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-sky-100/40"
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
            <p className="mt-2 text-slate-600">
              4.9/5 từ 800+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Hoàng Minh",
                quote:
                  "Tia nước êm, không bắn tung toé. Lắp trong 1 buổi là xong.",
              },
              {
                name: "Khánh Trâm",
                quote: "Thiết kế đẹp, lớp mạ mịn tay. Áp lực tăng rõ rệt.",
              },
              {
                name: "Anh Tú",
                quote: "Bảo hành rõ ràng, kỹ thuật hỗ trợ nhiệt tình.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-slate-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900">
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
        className="bg-gradient-to-b from-sky-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bảng giá gợi ý
            </h2>
            <p className="mt-2 text-slate-600">
              Giá có thể thay đổi theo chất liệu & phụ kiện.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Hydro S1"
              price="2.590.000đ"
              perks={["Inox 304", "Tăng áp êm", "Tiết kiệm nước 35%"]}
            />
            <PriceCard
              name="Thermo T-Pro"
              price="3.790.000đ"
              highlight
              perks={["Cân bằng nhiệt", "Van gốm bền bỉ", "Vòi tay 3 chế độ"]}
            />
            <PriceCard
              name="SlimSet âm tường"
              price="4.990.000đ"
              perks={["Thiết kế tối giản", "Mạ PVD", "Bảo hành 5 năm"]}
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1582582494700-54276e3d40f3?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Cần tư vấn lắp đặt?
            </h3>
            <p className="mt-3 text-slate-700">
              Để lại số điện thoại, kỹ thuật sẽ gọi trong ngày.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black">
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow">
                <Droplets className="h-5 w-5" />
              </span>
              <span>HydroShower</span>
            </a>
            <p className="mt-3 text-sm text-slate-700">
              Thiết bị phòng tắm bền bỉ – an toàn – tiết kiệm.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
            <h4 className="text-sm font-semibold text-slate-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
                  Bảo hành
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Liên hệ</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 6868
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} HydroShower. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
