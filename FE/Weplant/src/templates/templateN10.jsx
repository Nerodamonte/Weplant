import React from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Gauge,
  Fuel,
  ShieldCheck,
  Wrench,
  Sparkles,
  Star,
  CreditCard,
  Truck,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  BatteryCharging,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// LDP Showroom Xe Máy – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: xám/đen hiện đại, nhấn đỏ. Ảnh demo Unsplash. Responsive + framer-motion nhẹ.

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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-red-700 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-zinc-100 text-zinc-900">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-zinc-950">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-zinc-600">{desc}</p>
  </div>
);

const ModelCard = ({ img, name, price, specs = [], badge }) => (
  <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={name}
        className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-zinc-950">{name}</h5>
        <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          {price}
        </span>
      </div>
      <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
        {specs.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <a
          href="#cta"
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Đăng ký lái thử
        </a>
        <a
          href="#specs"
          className="inline-flex items-center gap-1 text-sm text-red-700 hover:text-red-800"
        >
          Thông số <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 text-sm">
    <span className="font-medium text-zinc-800">{label}</span>
    <span className="text-zinc-600">{value}</span>
  </div>
);

export default function MotorbikeShowroomLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* NAV */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-zinc-900 to-red-700 text-white shadow">
              <Bike className="h-5 w-5" />
            </span>
            <span>NovaMoto</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
            <a href="#features" className="hover:text-red-700">
              Tính năng
            </a>
            <a href="#models" className="hover:text-red-700">
              Mẫu xe
            </a>
            <a href="#specs" className="hover:text-red-700">
              Thông số
            </a>
            <a href="#gallery" className="hover:text-red-700">
              Hình ảnh
            </a>
            <a href="#pricing" className="hover:text-red-700">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black"
            >
              Lái thử
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1517865289-8fce0ee0b9ca?q=80&w=2000&auto=format&fit=crop"
          alt="motorbike hero"
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
              <Badge>New Gen • ABS • Hybrid</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Bứt tốc mượt –{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-red-700 to-zinc-900">
                  tiết kiệm vượt trội
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
                NovaMoto X-150 trang bị ABS 2 kênh, động cơ eSP+ tối ưu, khung
                nhẹ vững, cụm đèn LED full.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#models"
                  className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-800"
                >
                  Xem mẫu xe
                </a>
                <a
                  href="#specs"
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-50"
                >
                  Thông số kỹ thuật
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-zinc-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" /> 0–60 km/h: 5.2s
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" /> 1.9L/100km
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> ABS 2 kênh
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-zinc-100 to-red-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1501166222995-ff31c7e93cef?q=80&w=1800&auto=format&fit=crop"
                  alt="hero bike"
                  className="h-80 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FEATURES */}
      <Section id="features">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Tính năng nổi bật
            </h2>
            <p className="mt-2 text-zinc-600">
              Vận hành – an toàn – tiện nghi – tiết kiệm.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <Feature
              icon={BatteryCharging}
              title="Hybrid thông minh"
              desc="Tự sạc khi giảm ga, hỗ trợ đề-pa nhanh."
            />
            <Feature
              icon={ShieldCheck}
              title="ABS 2 kênh"
              desc="An toàn khi phanh gấp trên mặt đường trơn."
            />
            <Feature
              icon={Wrench}
              title="Khung chắc, nhẹ"
              desc="Khung ống thép gia cường, vững ở dải tốc cao."
            />
            <Feature
              icon={Fuel}
              title="Siêu tiết kiệm"
              desc="Tiêu thụ 1.9L/100km (chuẩn nội bộ)."
            />
          </div>
        </Container>
      </Section>

      {/* MODELS */}
      <Section
        id="models"
        className="bg-gradient-to-b from-white to-zinc-50/60"
      >
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Mẫu xe bán chạy
              </h2>
              <p className="mt-2 text-zinc-600">
                Scooter • Underbone • Naked • Adventure
              </p>
            </div>
            <a
              href="#pricing"
              className="hidden items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800 md:inline-flex"
            >
              Xem giá <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <ModelCard
              img="https://images.unsplash.com/photo-1580650154904-3926745fddb0?q=80&w=1600&auto=format&fit=crop"
              name="X-150 Scooter ABS"
              price="49.9 triệu"
              badge="Best Seller"
              specs={["Đèn LED full", "SmartKey", "Cốp 28L"]}
            />
            <ModelCard
              img="https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop"
              name="N-155 Naked Sport"
              price="65.9 triệu"
              specs={["Phuộc USD", "ABS 2 kênh", "Màn hình TFT"]}
            />
            <ModelCard
              img="https://images.unsplash.com/photo-1594763071887-4b4b3e9453fd?q=80&w=1600&auto=format&fit=crop"
              name="A-250 Adventure"
              price="96.0 triệu"
              specs={["Cổng sạc USB", "Hệ treo đa dụng", "Baga touring"]}
            />
          </div>
        </Container>
      </Section>

      {/* SPECS */}
      <Section id="specs" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Thông số kỹ thuật (X-150)
            </h2>
            <p className="mt-2 text-zinc-600">
              Số liệu tham khảo cho bản Scooter ABS.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-zinc-200">
            <div className="bg-zinc-50">
              <SpecRow label="Động cơ" value="150cc eSP+ 4 van" />
              <SpecRow label="Công suất cực đại" value="11.5 kW @ 8,500 rpm" />
              <SpecRow label="Mô-men xoắn" value="14.2 Nm @ 6,500 rpm" />
              <SpecRow label="Hộp số" value="CVT" />
              <SpecRow label="Trọng lượng" value="125 kg" />
              <SpecRow label="Bình xăng" value="6.5 L" />
              <SpecRow label="Phanh" value="ABS 2 kênh, đĩa trước/sau" />
              <SpecRow label="Lốp" value="Trước 110/80-14 • Sau 130/70-14" />
            </div>
          </div>
        </Container>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1501166222995-ff31c7e93cef?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517865289-8fce0ee0b9ca?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1594763071887-4b4b3e9453fd?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={src}
                  alt="gallery"
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
            <p className="mt-2 text-zinc-600">
              4.9/5 từ 900+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Phúc Lộc",
                quote: "Máy êm, đề-pa bốc. ABS vào việc rất yên tâm khi mưa.",
              },
              {
                name: "Xuân Anh",
                quote: "Scooter cốp siêu rộng, chạy phố tiết kiệm xăng rõ.",
              },
              {
                name: "Hà My",
                quote: "Nhân viên tư vấn nhiệt tình, giao xe nhanh.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-zinc-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-zinc-900">
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
        className="bg-gradient-to-b from-zinc-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Giá & ưu đãi
            </h2>
            <p className="mt-2 text-zinc-600">
              Giá tham khảo, liên hệ để nhận báo giá lăn bánh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "X-150 Scooter ABS",
                price: "49.9 triệu",
                perks: [
                  "Tặng nón 3/4",
                  "Phiếu xăng 1 triệu",
                  "Bảo dưỡng 2 lần",
                ],
              },
              {
                name: "N-155 Naked Sport",
                price: "65.9 triệu",
                perks: ["BH vật chất 1 năm", "Bọc yên cao cấp", "Baga sau"],
              },
              {
                name: "A-250 Adventure",
                price: "96.0 triệu",
                perks: ["Giá đỡ thùng", "Ốp bảo vệ", "Phiếu dịch vụ 2 triệu"],
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-zinc-900">
                  {p.name}
                </h4>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">
                  {p.price}
                  <span className="ml-1 text-sm font-normal text-zinc-500">
                    / xe
                  </span>
                </p>
                <ul className="mt-4 space-y-3">
                  {p.perks.map((x, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />{" "}
                      {x}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black">
                  Nhận báo giá
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 text-sm text-zinc-800 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Trả góp 0–0.99%
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Giao xe nhanh trong ngày
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Bảo hành 3 năm / 30.000km
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {[
              {
                q: "Có hỗ trợ đăng ký biển số?",
                a: "Có, showroom hỗ trợ trọn gói giấy tờ lăn bánh.",
              },
              {
                q: "Chính sách bảo hành thế nào?",
                a: "3 năm hoặc 30.000km tuỳ điều kiện đến trước.",
              },
              {
                q: "Có lái thử tại nhà?",
                a: "Có ở một số khu vực nội thành, vui lòng để lại thông tin.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-900">
                  {item.q}
                  <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-700">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1547436176-223d4b8b2532?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Đăng ký lái thử & nhận ưu đãi
            </h3>
            <p className="mt-3 text-zinc-700">
              Để lại số điện thoại, tư vấn viên liên hệ trong ngày.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black">
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-zinc-900 to-red-700 text-white shadow">
                <Bike className="h-5 w-5" />
              </span>
              <span>NovaMoto</span>
            </a>
            <p className="mt-3 text-sm text-zinc-700">
              Năng động – An toàn – Tiết kiệm.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Hệ thống</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a className="hover:text-red-700" href="#">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="hover:text-red-700" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-red-700" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a className="hover:text-red-700" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-red-700" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-red-700" href="#">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Liên hệ</h4>
            <div className="mt-3 space-y-2 text-sm text-zinc-700">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 6868
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 88 Nova Drive, Q.1
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} NovaMoto. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
