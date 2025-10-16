import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Calendar,
  Shield,
  Star,
  Clock,
  CreditCard,
  Phone,
  Camera,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";



const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur shadow-sm">
    <Star className="h-3.5 w-3.5 text-yellow-500" /> {children}
  </span>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/70 p-6 backdrop-blur shadow-sm transition hover:shadow-lg hover:bg-white">
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-tr from-sky-100 to-cyan-100 text-sky-600">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-base font-semibold text-slate-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
  </div>
);

const DestinationCard = ({ img, title, tag, price }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
    <img
      src={img}
      alt={title}
      className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
      <div className="mb-2 flex items-center gap-2 text-xs opacity-90">
        <MapPin className="h-4 w-4" /> {tag}
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{title}</h5>
        <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-800">
          {price}
        </span>
      </div>
    </div>

    <button className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur transition hover:bg-white">
      Khám phá <ChevronRight className="h-4 w-4" />
    </button>
  </div>
);

const PackageCard = ({ name, price, perks, highlight }) => (
  <div
    className={`relative rounded-2xl border ${
      highlight ? "border-sky-300 bg-white" : "border-slate-200 bg-white"
    } p-6 shadow-sm transition hover:shadow-lg`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-slate-900">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
      {price}
      <span className="ml-1 align-middle text-sm font-normal text-slate-500">
        / khách
      </span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-sky-600 text-white hover:bg-sky-700"
          : "bg-slate-900 text-white hover:bg-black"
      }`}
    >
      Đặt ngay
    </button>
  </div>
);

export default function TravelLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ===== NAVBAR ===== */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a className="flex items-center gap-2 font-semibold" href="#home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-500 text-white shadow">
              <Plane className="h-5 w-5" />
            </span>
            <span className="text-slate-900">SkyTrip</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
            <a href="#destinations" className="hover:text-sky-600">
              Điểm đến
            </a>
            <a href="#packages" className="hover:text-sky-600">
              Gói tour
            </a>
            <a href="#why" className="hover:text-sky-600">
              Vì sao chọn chúng tôi
            </a>
            <a href="#testimonials" className="hover:text-sky-600">
              Cảm nhận
            </a>
            <a href="#faq" className="hover:text-sky-600">
              FAQ
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              Đặt tour
            </a>
          </div>
        </Container>
      </header>

      {/* ===== HERO ===== */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-slate-50 py-24 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000&auto=format&fit=crop"
          alt="Tropical"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent" />
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge>Ưu đãi mùa thu • Giảm đến 30%</Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              Khám phá thế giới theo cách{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-sky-600 to-cyan-500">
                bạn yêu thích
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Lên lịch, chọn điểm đến, phần còn lại để SkyTrip lo. Di chuyển dễ
              dàng, giá hợp lý, trải nghiệm đỉnh.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 rounded-2xl border border-white/20 bg-white/80 p-3 shadow-lg backdrop-blur md:grid-cols-4">
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                <MapPin className="h-4 w-4 text-slate-500" />
                <input
                  placeholder="Điểm đến"
                  className="w-full text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                <Calendar className="h-4 w-4 text-slate-500" />
                <input
                  placeholder="Ngày đi"
                  className="w-full text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                <UsersIcon />
                <input
                  placeholder="Số khách"
                  className="w-full text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <button className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
                Tìm tour
              </button>
            </div>
          </motion.div>

          {/* Features inline */}
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            <FeatureCard
              icon={CreditCard}
              title="Giá minh bạch"
              desc="Không phí ẩn, xuất hóa đơn nhanh, hỗ trợ nhiều phương thức thanh toán."
            />
            <FeatureCard
              icon={Shield}
              title="An tâm tuyệt đối"
              desc="Đối tác lưu trú & dịch vụ đạt chuẩn, bảo hiểm du lịch đầy đủ."
            />
            <FeatureCard
              icon={Clock}
              title="Lịch trình linh hoạt"
              desc="Tuỳ chọn thời gian & hoạt động, cá nhân hoá theo nhu cầu của bạn."
            />
            <FeatureCard
              icon={Phone}
              title="Hỗ trợ 24/7"
              desc="Đội ngũ chăm sóc đồng hành trước – trong – sau chuyến đi."
            />
          </div>
        </Container>
      </Section>

      {/* ===== DESTINATIONS ===== */}
      <Section id="destinations">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Điểm đến nổi bật
              </h2>
              <p className="mt-2 text-slate-600">
                Chọn bộ sưu tập điểm đến hot nhất mùa này.
              </p>
            </div>
            <a
              href="#"
              className="hidden text-sm font-semibold text-sky-700 hover:text-sky-900 md:inline-flex items-center gap-1"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <DestinationCard
              img="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop"
              title="Phú Quốc – Thiên đường biển"
              tag="Phú Quốc, Việt Nam"
              price="4.990.000đ"
            />
            <DestinationCard
              img="https://images.unsplash.com/photo-1545569341-9eb8b30979d1?q=80&w=2000&auto=format&fit=crop"
              title="Đà Lạt – Săn mây"
              tag="Đà Lạt, Việt Nam"
              price="3.290.000đ"
            />
            <DestinationCard
              img="https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=2000&auto=format&fit=crop"
              title="Nha Trang – Lặn biển"
              tag="Nha Trang, Việt Nam"
              price="3.990.000đ"
            />
            <DestinationCard
              img="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=2000&auto=format&fit=crop"
              title="Đà Nẵng – City vibe"
              tag="Đà Nẵng, Việt Nam"
              price="2.990.000đ"
            />
            <DestinationCard
              img="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2000&auto=format&fit=crop"
              title="Sapa – Săn mùa lúa"
              tag="Lào Cai, Việt Nam"
              price="4.490.000đ"
            />
            <DestinationCard
              img="https://images.unsplash.com/photo-1544652852-2a13512ad203?q=80&w=2000&auto=format&fit=crop"
              title="Hạ Long – Du thuyền"
              tag="Quảng Ninh, Việt Nam"
              price="5.790.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* ===== WHY US ===== */}
      <Section id="why" className="bg-gradient-to-b from-white to-sky-50/40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Vì sao chọn SkyTrip?
            </h2>
            <p className="mt-3 text-slate-600">
              Chúng tôi tối ưu trải nghiệm từ lúc bạn nghĩ về chuyến đi cho tới
              khi trở về.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Plane}
              title="Đối tác rộng khắp"
              desc="Kết nối hàng trăm hãng bay và nhà cung cấp dịch vụ uy tín ở 25+ quốc gia."
            />
            <FeatureCard
              icon={MapPin}
              title="Local expert"
              desc="Team địa phương gợi ý điểm vui chơi, quán ăn, hoạt động độc đáo mà dân bản địa thích."
            />
            <FeatureCard
              icon={Shield}
              title="Chính sách linh hoạt"
              desc="Hoàn/đổi dễ dàng theo điều kiện từng hạng mục – tư vấn rõ ràng, minh bạch."
            />
          </div>
        </Container>
      </Section>

      {/* ===== PACKAGES ===== */}
      <Section id="packages">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Gói tour gợi ý
            </h2>
            <p className="mt-3 text-slate-600">
              Chọn nhanh các combo được yêu thích nhất.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PackageCard
              name="Tiết kiệm"
              price="2.990.000đ"
              highlight={false}
              perks={[
                "Khách sạn 3★ trung tâm",
                "Vé tham quan cơ bản",
                "Đón tiễn sân bay",
                "Hỗ trợ qua chat 24/7",
              ]}
            />
            <PackageCard
              name="Phổ biến"
              price="4.990.000đ"
              highlight
              perks={[
                "Khách sạn 4★ view đẹp",
                "Bữa sáng mỗi ngày",
                "Tour trải nghiệm 1 ngày",
                "HDV bản địa",
              ]}
            />
            <PackageCard
              name="Cao cấp"
              price="8.990.000đ"
              highlight={false}
              perks={[
                "Resort 5★",
                "Xe riêng & tài xế",
                "Tối ưu lịch trình riêng",
                "Ảnh chụp chuyên nghiệp",
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* ===== GALLERY STRIP ===== */}
      <Section className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-slate-100">
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

      {/* ===== TESTIMONIALS ===== */}
      <Section id="testimonials" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Khách hàng nói gì?
            </h2>
            <p className="mt-3 text-slate-600">
              Một vài review ngắn gọn, chân thực từ cộng đồng SkyTrip.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Ngọc Anh",
                quote: "Lịch trình mượt, ảnh đẹp, giá hợp lý. Sẽ quay lại!",
              },
              {
                name: "Minh Khoa",
                quote:
                  "Team hỗ trợ nhiệt tình, gợi ý địa điểm ăn chơi quá hợp gu.",
              },
              {
                name: "Hải Yến",
                quote:
                  "Lần đầu book tour online mà an tâm vậy, mọi thứ rõ ràng minh bạch.",
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

      {/* ===== FAQ ===== */}
      <Section id="faq" className="bg-gradient-to-b from-sky-50/60 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {[
              {
                q: "Có thể hoàn/đổi lịch trình không?",
                a: "Tuỳ hạng dịch vụ & điều kiện nhà cung cấp. SkyTrip luôn tư vấn rõ trước khi thanh toán.",
              },
              {
                q: "Giá đã gồm vé máy bay chưa?",
                a: "Một số gói đã bao gồm. Bạn có thể chọn thêm để tối ưu chi phí.",
              },
              {
                q: "Có hỗ trợ xuất hoá đơn VAT?",
                a: "Có. Cung cấp thông tin doanh nghiệp trước khi chốt thanh toán.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                  {item.q}
                  <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== CTA ===== */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Sẵn sàng cho hành trình tiếp theo?
            </h3>
            <p className="mt-3 text-slate-600">
              Để lại email, chúng tôi gửi ưu đãi mới nhất mỗi tuần.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
                placeholder="Email của bạn"
              />
              <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black">
                Nhận ưu đãi
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t bg-white">
        <Container className="grid gap-8 py-12 md:grid-cols-4">
          <div>
            <a className="flex items-center gap-2 font-semibold" href="#home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-500 text-white shadow">
                <Plane className="h-5 w-5" />
              </span>
              <span className="text-slate-900">SkyTrip</span>
            </a>
            <p className="mt-3 text-sm text-slate-600">
              Kết nối bạn đến những trải nghiệm đáng nhớ.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-sky-700" href="#">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="hover:text-sky-700" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-sky-700" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-sky-700" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-sky-700" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-sky-700" href="#">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Kết nối</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 1234
              </p>
              <p className="flex items-center gap-2">
                <Camera className="h-4 w-4" /> @skytrip.official
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SkyTrip. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      className="h-4 w-4 text-slate-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 14a4 4 0 1 0-8 0v1a4 4 0 0 0 4 4m4-5v1a4 4 0 0 1-4 4m0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 8a4 4 0 0 0-3-3.87m-10 0A4 4 0 0 0 2 18"
      />
    </svg>
  );
}
