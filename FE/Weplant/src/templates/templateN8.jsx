import React from "react";
import { motion } from "framer-motion";
import {
  Wine,
  Sparkles,
  Shield,
  Truck,
  CreditCard,
  Star,
  CheckCircle2,
  ChevronRight,
  Phone,
  Gift,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// LDP Rượu – chỉ UI (clone vibe SimplePage). Không có logic dữ liệu.
// Palette: burgundy/gold sang trọng. Ảnh demo Unsplash. Responsive + framer-motion nhẹ.

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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-rose-800 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USP = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-800">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-zinc-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-zinc-600">{desc}</p>
  </div>
);

const CategoryCard = ({ img, name }) => (
  <a
    className="group relative block overflow-hidden rounded-2xl bg-rose-50 shadow-sm"
    href="#collections"
  >
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-zinc-900 backdrop-blur shadow">
      {name}
    </span>
  </a>
);

const ProductCard = ({ img, title, price, badge }) => (
  <div className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-rose-800 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <h5 className="text-base font-semibold text-zinc-900">{title}</h5>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-zinc-900">{price}</span>
        <a
          className="inline-flex items-center gap-1 text-rose-800 hover:text-rose-900"
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
      highlight ? "border-rose-300 bg-white" : "border-rose-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-rose-800 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-zinc-900">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">
      {price}
      <span className="ml-1 text-sm font-normal text-zinc-500">/ set</span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-rose-800 text-white hover:bg-rose-900"
          : "bg-zinc-900 text-white hover:bg-black"
      }`}
    >
      Đặt ngay
    </button>
  </div>
);

const NoteCard = ({ title, body }) => (
  <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
    <h5 className="text-sm font-semibold text-zinc-900">{title}</h5>
    <p className="mt-2 text-sm leading-6 text-zinc-700">{body}</p>
  </div>
);

export default function WineLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-rose-50 text-zinc-900">
      {/* NAV */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-rose-800 to-amber-500 text-white shadow">
              <Wine className="h-5 w-5" />
            </span>
            <span>Vine&Co</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
            <a href="#categories" className="hover:text-rose-800">
              Dòng rượu
            </a>
            <a href="#collections" className="hover:text-rose-800">
              Bộ sưu tập
            </a>
            <a href="#notes" className="hover:text-rose-800">
              Hương vị
            </a>
            <a href="#pairing" className="hover:text-rose-800">
              Phối món
            </a>
            <a href="#pricing" className="hover:text-rose-800">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black"
            >
              Đặt hàng
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1546421845-6471bdcf3dc3?q=80&w=2000&auto=format&fit=crop"
          alt="wine hero"
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
              <Badge>New Vintage • Limited Release</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Rượu vang tuyển chọn,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-rose-800 to-amber-500">
                  đủ tầng hương vị
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
                Vine&Co chọn rượu từ các nhà vang danh tiếng ở Pháp, Ý, Chile…
                Bảo quản chuẩn, giao nhanh nội thành.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-rose-800 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-900"
                >
                  Khám phá BST
                </a>
                <a
                  href="#notes"
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Hương vị
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-zinc-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Hàng chuẩn tem nhập
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Giao 1–2h nội thành
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-rose-100 to-amber-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1800&auto=format&fit=crop"
                  alt="hero bottle"
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
                Dòng rượu nổi bật
              </h2>
              <p className="mt-2 text-zinc-600">
                Red • White • Rosé • Sparkling • Whisky
              </p>
            </div>
            <a
              href="#collections"
              className="hidden items-center gap-1 text-sm font-semibold text-rose-800 hover:text-rose-900 md:inline-flex"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            <CategoryCard
              img="https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1600&auto=format&fit=crop"
              name="Red Wine"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1482349625602-20b5fcb4be0d?q=80&w=1600&auto=format&fit=crop"
              name="White Wine"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1609630875170-b6f9d709c6f8?q=80&w=1600&auto=format&fit=crop"
              name="Rosé"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1595265591247-2ef20a2bdb94?q=80&w=1600&auto=format&fit=crop"
              name="Sparkling"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
              name="Whisky"
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-rose-50/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bộ sưu tập bán chạy
            </h2>
            <p className="mt-2 text-zinc-600">
              Tuyển chọn theo vintage & vùng trồng.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              img="https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1600&auto=format&fit=crop"
              title="Bordeaux Blend 2018"
              price="890.000đ"
              badge="Best Seller"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1482349625602-20b5fcb4be0d?q=80&w=1600&auto=format&fit=crop"
              title="Chardonnay Reserve"
              price="720.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1595265591247-2ef20a2bdb94?q=80&w=1600&auto=format&fit=crop"
              title="Prosecco DOC"
              price="650.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1600&auto=format&fit=crop"
              title="Pinot Noir Valley"
              price="950.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1609630875170-b6f9d709c6f8?q=80&w=1600&auto=format&fit=crop"
              title="Rosé Côtes de Provence"
              price="690.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
              title="Single Malt 12Y"
              price="1.290.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* NOTES */}
      <Section id="notes">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Tầng hương vị
            </h2>
            <p className="mt-2 text-zinc-600">
              Ví dụ tasting note cho Bordeaux Blend 2018.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <NoteCard
              title="Mũi (Nose)"
              body="Hương quả mọng đen (blackcurrant), mận chín, vani, thoang thoảng gỗ sồi."
            />
            <NoteCard
              title="Vị (Palate)"
              body="Tannin mượt, độ chua vừa phải; vị mận – socola đen – tiêu xanh."
            />
            <NoteCard
              title="Hậu vị (Finish)"
              body="Kéo dài, ấm; đọng lại hương gỗ tuyết tùng và ca cao."
            />
          </div>
        </Container>
      </Section>

      {/* PAIRING */}
      <Section id="pairing" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Gợi ý phối món
            </h2>
            <p className="mt-2 text-zinc-600">
              Nâng hương vị bằng pairing đúng chuẩn.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-rose-100">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-rose-100 bg-rose-50/50">
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-zinc-800">
                    Bordeaux Blend
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    Thịt đỏ nướng, phô mai trưởng thành
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-zinc-800">
                    Chardonnay
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    Hải sản bơ tỏi, gà nướng thảo mộc
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-zinc-800">
                    Prosecco
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    Khai vị nhẹ, finger food
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-zinc-800">
                    Pinot Noir
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    Salmon áp chảo, vịt quay
                  </td>
                </tr>
                <tr className="grid grid-cols-2 px-4 py-3 md:table-row">
                  <td className="px-4 py-3 font-semibold text-zinc-800">
                    Rosé
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    Salad Địa Trung Hải, pizza trắng
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* LOOKBOOK */}
      <Section id="lookbook" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1546421845-6471bdcf3dc3?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1514361892635-ac54fefc0c8f?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-rose-100/40"
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
            <p className="mt-2 text-zinc-600">
              4.9/5 từ 900+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Thuỳ Dung",
                quote: "Chai Bordeaux vị chuẩn, đóng gói chống sốc cẩn thận.",
              },
              {
                name: "Trung Kiên",
                quote: "Giao nhanh, đúng vintage. Tư vấn pairing có tâm.",
              },
              {
                name: "Minh Ngọc",
                quote: "Hộp quà sang, tặng đối tác cực ổn.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6"
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
        className="bg-gradient-to-b from-rose-50/60 to-white"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Combo quà tặng
            </h2>
            <p className="mt-2 text-zinc-600">
              Phù hợp biếu tặng – doanh nghiệp – sự kiện.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Duo Classic"
              price="1.290.000đ"
              perks={[
                "2 chai bất kỳ < 750k/chai",
                "Hộp quà + Ruy băng",
                "Thiệp viết tay",
              ]}
            />
            <PriceCard
              name="Executive Set"
              price="1.990.000đ"
              highlight
              perks={[
                "1 chai < 1.2tr",
                "Phụ kiện khui rượu",
                "Túi da sang trọng",
              ]}
            />
            <PriceCard
              name="Sparkling Joy"
              price="1.590.000đ"
              perks={["1 chai sparkling", "2 ly flute", "Túi giấy cao cấp"]}
            />
          </div>
          <div className="mt-6 grid gap-4 text-sm text-zinc-800 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Giao 1–2h nội thành
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4" /> Tuỳ chỉnh thiệp miễn phí
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
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-rose-100 rounded-2xl border border-rose-100 bg-white">
            {[
              {
                q: "Rượu có tem nhập và hoá đơn không?",
                a: "Có. Tất cả sản phẩm đều có tem/nhãn phụ hợp lệ và xuất hoá đơn theo yêu cầu.",
              },
              {
                q: "Có giao ngoài giờ hành chính?",
                a: "Có. Nội thành hỗ trợ đến 21:00, phụ thu tuỳ khu vực.",
              },
              {
                q: "Bảo quản sau mở nắp?",
                a: "Đậy kín, bảo quản tủ mát 3–5 ngày (vang) hoặc theo hướng dẫn riêng cho từng dòng.",
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
          src="https://images.unsplash.com/photo-1514361892635-ac54fefc0c8f?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Đặt ngay – tư vấn pairing miễn phí
            </h3>
            <p className="mt-3 text-zinc-700">
              Để lại số điện thoại, team sommelier sẽ gọi trong ngày.
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-rose-800 to-amber-500 text-white shadow">
                <Wine className="h-5 w-5" />
              </span>
              <span>Vine&Co</span>
            </a>
            <p className="mt-3 text-sm text-zinc-700">
              Rượu chuẩn – Giao nhanh – Quà tặng sang.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a className="hover:text-rose-900" href="#">
                  Câu chuyện
                </a>
              </li>
              <li>
                <a className="hover:text-rose-900" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-rose-900" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a className="hover:text-rose-900" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-rose-900" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-rose-900" href="#">
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
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Vine&Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
