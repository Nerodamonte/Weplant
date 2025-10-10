import React from "react";
import { motion } from "framer-motion";
import {
  Car,
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

// LDP Xe ô tô – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: đen/xám sang, điểm nhấn đỏ. Ảnh demo Unsplash. Responsive + framer-motion nhẹ.

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

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 text-sm">
    <span className="font-medium text-zinc-800">{label}</span>
    <span className="text-zinc-600">{value}</span>
  </div>
);

const TrimCard = ({ img, name, price, perks, highlight }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
      highlight ? "border-red-300" : "border-zinc-200"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-4 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <img src={img} alt={name} className="h-56 w-full object-cover" />
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-zinc-950">{name}</h5>
        <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          {price}
        </span>
      </div>
      <ul className="mt-3 grid gap-2 text-sm text-zinc-700">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
            {p}
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

export default function CarLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* NAV */}
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-zinc-900 to-red-700 text-white shadow">
              <Car className="h-5 w-5" />
            </span>
            <span>NovaMotors</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
            <a href="#features" className="hover:text-red-700">
              Tính năng
            </a>
            <a href="#trims" className="hover:text-red-700">
              Phiên bản
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
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2000&auto=format&fit=crop"
          alt="car hero"
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
              <Badge>New Gen • Turbo Hybrid</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Hiệu năng đỉnh –{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-red-700 to-zinc-900">
                  tiết kiệm vượt trội
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
                NovaMotors X-Series kết hợp động cơ tăng áp và mô-tơ điện, khung
                gầm vững, gói an toàn chủ động 12 tính năng.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#trims"
                  className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-800"
                >
                  Xem phiên bản
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
                  <Gauge className="h-4 w-4" /> 0–100 km/h: 6.9s
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" /> 4.5L/100km (WLTP)
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> 5★ An toàn
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-zinc-100 to-red-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
                  alt="hero car"
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
              Vận hành mạnh mẽ – an toàn chủ động – tiện nghi cao cấp.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature
              icon={BatteryCharging}
              title="Hybrid thông minh"
              desc="Tự động chuyển chế độ, tái tạo năng lượng khi phanh."
            />
            <Feature
              icon={ShieldCheck}
              title="Safety Suite 12"
              desc="Phanh khẩn cấp, giữ làn, ga tự động thích ứng, cảnh báo điểm mù."
            />
            <Feature
              icon={Wrench}
              title="Khung gầm chắc chắn"
              desc="Thép cường lực, cách âm gầm & khoang máy tối ưu."
            />
          </div>
        </Container>
      </Section>

      {/* TRIMS */}
      <Section id="trims" className="bg-gradient-to-b from-white to-zinc-50/60">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Phiên bản & trang bị
              </h2>
              <p className="mt-2 text-zinc-600">
                Chọn cấu hình hợp nhu cầu sử dụng.
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
            <TrimCard
              img="https://images.unsplash.com/photo-1517940310602-75bc76581638?q=80&w=1600&auto=format&fit=crop"
              name="X-Series Standard"
              price="699 triệu"
              perks={["Đèn LED tự động", 'Màn hình 10.25"', "Cruise Control"]}
            />
            <TrimCard
              img="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop"
              name="X-Series Premium"
              price="799 triệu"
              perks={[
                "Cửa sổ trời toàn cảnh",
                "Camera 360°",
                "Ghế da chỉnh điện",
              ]}
              highlight
            />
            <TrimCard
              img="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600&auto=format&fit=crop"
              name="X-Series Sport"
              price="859 triệu"
              perks={[
                'Mâm 19" Sport',
                "Hệ treo tinh chỉnh",
                "Bodykit đỏ Blackline",
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* SPECS */}
      <Section id="specs" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Thông số kỹ thuật chính
            </h2>
            <p className="mt-2 text-zinc-600">Áp dụng mẫu X-Series Premium.</p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-zinc-200">
            <div className="bg-zinc-50">
              <SpecRow label="Động cơ" value="1.5 Turbo + Motor điện" />
              <SpecRow label="Công suất tổng" value="180 hp / 270 Nm" />
              <SpecRow label="Hộp số" value="CVT giả lập 8 cấp" />
              <SpecRow label="Dẫn động" value="Cầu trước (FWD)" />
              <SpecRow label="Mức tiêu thụ" value="4.5 L/100km (WLTP)" />
              <SpecRow label="Kích thước" value="DxRxC: 4.6 x 1.8 x 1.45 m" />
              <SpecRow label="Khoang hành lý" value="430 L" />
              <SpecRow label="An toàn" value="6 túi khí, ABS/EBD, ESC, TCS" />
            </div>
          </div>
        </Container>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517940310602-75bc76581638?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600&auto=format&fit=crop",
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
              4.9/5 từ 1.200+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Duy Nam",
                quote:
                  "Vận hành êm, tăng tốc mượt. Gói an toàn hoạt động hiệu quả.",
              },
              {
                name: "Hải Yến",
                quote:
                  "Khoang lái rộng rãi, màn hình nét. Tiết kiệm xăng rõ rệt.",
              },
              {
                name: "Trong Khoa",
                quote: "Dịch vụ tư vấn & bàn giao nhanh chóng, chuyên nghiệp.",
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
                name: "Standard",
                price: "699 triệu",
                perks: [
                  "Tặng phim cách nhiệt",
                  "Bọc sàn da",
                  "Gói bảo dưỡng 1 năm",
                ],
              },
              {
                name: "Premium",
                price: "799 triệu",
                perks: [
                  "Tặng BH vật chất 1 năm",
                  "Camera hành trình",
                  "Gói bảo dưỡng 2 năm",
                ],
              },
              {
                name: "Sport",
                price: "859 triệu",
                perks: ['Mâm 19"', "Bodykit thể thao", "Ốp bậc lên xuống"],
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
              <CreditCard className="h-4 w-4" /> Hỗ trợ trả góp 0–0.99%
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Giao xe nhanh trong tuần
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Bảo hành 5 năm / 150.000km
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
                q: "Có hỗ trợ đăng ký & biển số?",
                a: "Có, đội ngũ sẽ hỗ trợ toàn bộ thủ tục lăn bánh.",
              },
              {
                q: "Chính sách bảo hành thế nào?",
                a: "5 năm hoặc 150.000km tuỳ điều kiện đến trước.",
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
          src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop"
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
                <Car className="h-5 w-5" />
              </span>
              <span>NovaMotors</span>
            </a>
            <p className="mt-3 text-sm text-zinc-700">
              Hiệu năng – An toàn – Tiết kiệm.
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
                <MapPin className="h-4 w-4" /> 88 Đại lộ Nova, Q.1
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} NovaMotors. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
