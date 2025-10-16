import React from "react";
import { motion } from "framer-motion";
import {
  Gem,
  Diamond,
  Sparkles,
  Shield,
  Truck,
  CreditCard,
  Star,
  CheckCircle2,
  ChevronRight,
  Phone,
  Instagram,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-amber-700 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USPCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-700">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-amber-950">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-amber-700/90">{desc}</p>
  </div>
);

const CollectionCard = ({ img, name, tag, price }) => (
  <div className="group overflow-hidden rounded-2xl bg-amber-50/40 shadow-sm ring-1 ring-amber-100">
    <img
      src={img}
      alt={name}
      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div className="p-5">
      <p className="text-xs text-amber-600">{tag}</p>
      <div className="mt-1 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-amber-950">{name}</h5>
        <span className="rounded-full bg-amber-900/90 px-3 py-1 text-xs font-semibold text-amber-50">
          {price}
        </span>
      </div>
      <button className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800">
        Xem chi tiết <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const PriceCard = ({ name, price, perks, highlight }) => (
  <div
    className={`relative rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
      highlight ? "border-amber-300 bg-white" : "border-amber-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-amber-700 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-amber-950">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-amber-950">
      {price}
      <span className="ml-1 text-sm font-normal text-amber-700">
        / sản phẩm
      </span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-amber-700 text-white hover:bg-amber-800"
          : "bg-amber-900 text-amber-50 hover:bg-black"
      }`}
    >
      Chọn mua
    </button>
  </div>
);

export default function JewelryLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-amber-50 text-amber-950">
      {/* NAV */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/30 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white shadow">
              <Gem className="h-5 w-5" />
            </span>
            <span className="text-amber-950">Aurora Jewels</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-amber-800 md:flex">
            <a href="#collections" className="hover:text-amber-700">
              Bộ sưu tập
            </a>
            <a href="#why" className="hover:text-amber-700">
              Cam kết
            </a>
            <a href="#lookbook" className="hover:text-amber-700">
              Lookbook
            </a>
            <a href="#reviews" className="hover:text-amber-700">
              Đánh giá
            </a>
            <a href="#pricing" className="hover:text-amber-700">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-amber-900 px-4 py-2 text-sm font-semibold text-amber-50 shadow-sm hover:bg-black"
            >
              Đặt chế tác
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"
          alt="jewelry hero"
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
              <Badge>New • Limited Collection</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Tinh xảo toả sáng,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-amber-700 to-yellow-500">
                  khắc tên dấu yêu
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-amber-800/90 md:text-lg">
                Trang sức vàng 14K/18K & đá quý chọn lọc, chế tác thủ công – bảo
                hành đánh bóng trọn đời.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-amber-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-800"
                >
                  Khám phá BST
                </a>
                <a
                  href="#cta"
                  className="rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-semibold text-amber-950 hover:bg-amber-50"
                >
                  Đặt làm theo ý
                </a>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-amber-700">
                <Shield className="h-4 w-4" /> Bảo hành trọn đời
                <Truck className="ml-4 h-4 w-4" /> Giao nhanh toàn quốc
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-amber-100 to-yellow-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?q=80&w=1800&auto=format&fit=crop"
                  alt="hero piece"
                  className="h-80 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* USP */}
      <Section id="why">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Cam kết của Aurora
            </h2>
            <p className="mt-2 text-amber-800/90">
              Minh bạch chất liệu – chế tác chuẩn – dịch vụ tận tâm.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <USPCard
              icon={Diamond}
              title="Đá quý chứng nhận"
              desc="Kim cương Moissanite/Thiên nhiên có giấy kiểm định; cắt chuẩn lửa."
            />
            <USPCard
              icon={Shield}
              title="Bảo hành trọn đời"
              desc="Đánh bóng, siêu âm làm sạch miễn phí; bảo dưỡng định kỳ."
            />
            <USPCard
              icon={CreditCard}
              title="Thanh toán linh hoạt"
              desc="COD, thẻ, ví; hỗ trợ trả góp qua đối tác tài chính."
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-amber-50/60"
      >
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Bộ sưu tập nổi bật
              </h2>
              <p className="mt-2 text-amber-800/90">
                Nhẫn – Dây chuyền – Bông tai – Lắc tay.
              </p>
            </div>
            <a
              href="#pricing"
              className="hidden items-center gap-1 text-sm font-semibold text-amber-800 hover:text-amber-900 md:inline-flex"
            >
              Xem giá <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <CollectionCard
              img="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1600&auto=format&fit=crop"
              name="Nhẫn Solitare Aurora"
              tag="Rings"
              price="6.900.000đ"
            />
            <CollectionCard
              img="https://images.unsplash.com/photo-1520962918287-7448c2878f65?q=80&w=1600&auto=format&fit=crop"
              name="Dây chuyền Lune"
              tag="Necklaces"
              price="4.500.000đ"
            />
            <CollectionCard
              img="https://images.unsplash.com/photo-1603575449299-baf04ca4e30b?q=80&w=1600&auto=format&fit=crop"
              name="Bông tai Éclat"
              tag="Earrings"
              price="3.200.000đ"
            />
            <CollectionCard
              img="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop"
              name="Lắc tay Halo"
              tag="Bracelets"
              price="5.400.000đ"
            />
            <CollectionCard
              img="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1600&auto=format&fit=crop"
              name="Charm Aurora"
              tag="Charms"
              price="1.490.000đ"
            />
            <CollectionCard
              img="https://images.unsplash.com/photo-1612363992371-a4b4d8b4d2f9?q=80&w=1600&auto=format&fit=crop"
              name="Set cưới Radiant"
              tag="Wedding Set"
              price="12.900.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* LOOKBOOK STRIP */}
      <Section id="lookbook" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1617038260897-5d8df2330a8c?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-amber-100/40"
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
            <p className="mt-2 text-amber-800/90">
              4.9/5 từ 600+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Diệu Nhi",
                quote:
                  "Nhẫn sáng đẹp, size fit, đóng gói sang. Dịch vụ rất chu đáo.",
              },
              {
                name: "Tuấn Kiệt",
                quote:
                  "Đặt khắc tên nhanh, giao đúng hẹn. Đi sự kiện ai cũng hỏi mua đâu.",
              },
              {
                name: "Khánh Linh",
                quote: "Mang êm, không xước da. Có phiếu bảo hành rõ ràng.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-amber-800">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-amber-950">
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
        className="bg-gradient-to-b from-amber-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bảng giá tham khảo
            </h2>
            <p className="mt-2 text-amber-800/90">
              Giá có thể thay đổi theo chất liệu & kích cỡ.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Nhẫn Solitare"
              price="6.900.000đ"
              perks={["Vàng 14K", "Đá Moissanite 6.5mm", "Khắc tên miễn phí"]}
            />
            <PriceCard
              name="Dây chuyền Lune"
              price="4.500.000đ"
              highlight
              perks={["Vàng 14K", "Mặt trăng khảm đá", "Hộp quà cao cấp"]}
            />
            <PriceCard
              name="Bông tai Éclat"
              price="3.200.000đ"
              perks={["Vàng 10K/14K", "Đá tán sáng", "Bảo hành trọn đời"]}
            />
          </div>
          <div className="mt-6 grid gap-4 text-sm text-amber-800 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Miễn phí ship từ 999k
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Đổi size 7 ngày
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
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-amber-100 rounded-2xl border border-amber-100 bg-white">
            {[
              {
                q: "Chất liệu vàng có giấy tờ không?",
                a: "Có hoá đơn, phiếu kiểm định, xác minh tuổi vàng theo chuẩn cửa hàng.",
              },
              {
                q: "Có nhận khắc tên theo yêu cầu?",
                a: "Có. Hoàn thành trong 24–48h tuỳ mẫu, không phụ phí với dòng cơ bản.",
              },
              {
                q: "Nếu không vừa size thì sao?",
                a: "Đổi size 1 lần trong 7 ngày, giữ nguyên tình trạng như mới.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-amber-950">
                  {item.q}
                  <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-amber-800">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Đặt lịch xem mẫu tại showroom
            </h3>
            <p className="mt-3 text-amber-800">
              Để lại số điện thoại, stylist sẽ liên hệ trong ngày.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-amber-500"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-amber-900 px-5 py-3 text-sm font-semibold text-amber-50 shadow-sm hover:bg-black">
                Đặt lịch
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white shadow">
                <Gem className="h-5 w-5" />
              </span>
              <span className="text-amber-950">Aurora Jewels</span>
            </a>
            <p className="mt-3 text-sm text-amber-800">
              Tinh xảo mỗi ngày – vì bạn xứng đáng toả sáng.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-950">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-amber-800">
              <li>
                <a className="hover:text-amber-700" href="#">
                  Câu chuyện thương hiệu
                </a>
              </li>
              <li>
                <a className="hover:text-amber-700" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-amber-700" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-950">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-amber-800">
              <li>
                <a className="hover:text-amber-700" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-amber-700" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-amber-700" href="#">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-950">Kết nối</h4>
            <div className="mt-3 space-y-2 text-sm text-amber-800">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 6868
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @aurora.jewels
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-amber-700">
          © {new Date().getFullYear()} Aurora Jewels. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
