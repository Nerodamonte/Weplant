import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Truck,
  Shield,
  CreditCard,
  Star,
  ChevronRight,
  Ruler,
  Phone,
  BadgeCheck,
} from "lucide-react";
import UseTemplateButton from "../components/UseTemplateButton";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// LDP Thời trang – chỉ UI (clone vibe SimplePage fashion). Không có logic dữ liệu.
// Palette: đen/xám tối giản, ảnh demo Unsplash. Responsive + framer-motion nhẹ.

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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const USP = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-100 text-neutral-800">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-neutral-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-neutral-600">{desc}</p>
  </div>
);

const CategoryCard = ({ img, name }) => (
  <a
    className="group relative block overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
    href="#collections"
  >
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-neutral-900 backdrop-blur shadow">
      {name}
    </span>
  </a>
);

const ProductCard = ({ img, title, price }) => (
  <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
    <div className="relative">
      <img
        src={img}
        alt={title}
        className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <button className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 backdrop-blur shadow hover:bg-white">
        Xem nhanh
      </button>
    </div>
    <div className="p-5">
      <h5 className="text-base font-semibold text-neutral-900">{title}</h5>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-neutral-900">{price}</span>
        <a
          className="inline-flex items-center gap-1 text-neutral-700 hover:text-black"
          href="#"
        >
          Chi tiết <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

export default function FashionLandingPage() {
  const { id } = useParams();
  const location = useLocation();
  const fromState = location.state?.templateId;
  const fromQuery = new URLSearchParams(location.search).get("templateId");
  const fromSession = sessionStorage.getItem("lastTemplateId");
  const templateId = fromState || id || fromQuery || fromSession || "";
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* NAV */}
      <UseTemplateButton templateId={id} />
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white shadow">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span>NovaWear</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-700 md:flex">
            <a href="#categories" className="hover:text-black">
              Danh mục
            </a>
            <a href="#collections" className="hover:text-black">
              Bộ sưu tập
            </a>
            <a href="#why" className="hover:text-black">
              Cam kết
            </a>
            <a href="#lookbook" className="hover:text-black">
              Lookbook
            </a>
            <a href="#reviews" className="hover:text-black">
              Đánh giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-900"
            >
              Mua ngay
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white py-20 md:py-28"
      >
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2000&auto=format&fit=crop"
          alt="hero fashion"
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
              <Badge>New Season • FW Collection</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                Tối giản hiện đại,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neutral-900 to-neutral-600">
                  fit chuẩn từng dáng
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
                NovaWear mang tới các thiết kế đa dụng cho đi làm, đi chơi và
                dạo phố. Vải cao cấp, form đứng – thoải mái cả ngày.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collections"
                  className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-900"
                >
                  Khám phá BST
                </a>
                <a
                  href="#sizefit"
                  className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  Chọn size
                </a>
              </div>
              <div className="mt-6 grid gap-4 text-xs text-neutral-700 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> Giao nhanh 24–48h
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Đổi trả 7 ngày
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-neutral-100 to-neutral-200 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1520975922112-380d1990a117?q=80&w=1800&auto=format&fit=crop"
                  alt="hero model"
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
              <p className="mt-2 text-neutral-600">
                Các item must-have mùa này.
              </p>
            </div>
            <a
              href="#collections"
              className="hidden items-center gap-1 text-sm font-semibold text-neutral-800 hover:text-black md:inline-flex"
            >
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <CategoryCard
              img="https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1600&auto=format&fit=crop"
              name="Áo khoác"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop"
              name="Đầm/Váy"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1600&auto=format&fit=crop"
              name="Quần tây"
            />
            <CategoryCard
              img="https://images.unsplash.com/photo-1613467678281-1d89d0d3ba63?q=80&w=1600&auto=format&fit=crop"
              name="Sơ mi"
            />
          </div>
        </Container>
      </Section>

      {/* COLLECTIONS */}
      <Section
        id="collections"
        className="bg-gradient-to-b from-white to-neutral-50/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Bộ sưu tập mới
            </h2>
            <p className="mt-2 text-neutral-600">
              Mix & match nhanh, bền dáng lâu.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              img="https://images.unsplash.com/photo-1520975731777-65b4d223e3cf?q=80&w=1600&auto=format&fit=crop"
              title="Blazer tối giản"
              price="899.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1521336582471-5f3a00bb5d8f?q=80&w=1600&auto=format&fit=crop"
              title="Slip dress lụa"
              price="749.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1520975922112-380d1990a117?q=80&w=1600&auto=format&fit=crop"
              title="Quần ống đứng"
              price="599.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"
              title="Áo sơ mi satin"
              price="529.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1539533018447-63fcce2678e4?q=80&w=1600&auto=format&fit=crop"
              title="Jacket denim"
              price="659.000đ"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1600&auto=format&fit=crop"
              title="Váy midi"
              price="699.000đ"
            />
          </div>
        </Container>
      </Section>

      {/* WHY/USP */}
      <Section id="why">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Vì sao chọn NovaWear?
            </h2>
            <p className="mt-2 text-neutral-600">
              Chất liệu & trải nghiệm là ưu tiên số 1.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <USP
              icon={BadgeCheck}
              title="Chất vải tuyển chọn"
              desc="Thấm hút – ít nhăn – lên form chuẩn theo nhiều dáng người."
            />
            <USP
              icon={Ruler}
              title="Hệ size thông minh"
              desc="Fit chart chi tiết; hỗ trợ đổi size trong 7 ngày."
            />
            <USP
              icon={Shield}
              title="May kỹ – bền dáng"
              desc="Đường may chắc, bo gấu viền tinh gọn – mặc nhiều vẫn chuẩn."
            />
          </div>
        </Container>
      </Section>

      {/* LOOKBOOK STRIP */}
      <Section id="lookbook" className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1559697242-1e7d6f47cc9c?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-neutral-100"
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
            <p className="mt-2 text-neutral-600">4.9/5 từ 2.000+ đánh giá.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Bảo Trân",
                quote: "Form đẹp, vải mát, mặc đi làm lẫn đi chơi đều ok.",
              },
              {
                name: "Thanh Huy",
                quote:
                  "Màu trendy, lên dáng xịn. Giao nhanh, đóng gói cẩn thận.",
              },
              {
                name: "Ngọc Mai",
                quote: "Bảng size chuẩn, staff hỗ trợ đổi rất nhanh gọn.",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-neutral-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-neutral-900">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* SIZE & FIT */}
      <Section
        id="sizefit"
        className="bg-gradient-to-b from-neutral-50/60 to-white"
      >
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Chọn size chính xác
              </h3>
              <p className="mt-3 text-neutral-600">
                Dựa theo chiều cao – cân nặng – vòng ngực/eo/mông. Nếu phân vân
                giữa hai size, chọn size lớn hơn.
              </p>
              <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 space-y-1">
                <li>Form Regular: thoải mái, phù hợp mọi hoạt động.</li>
                <li>Form Slim: ôm nhẹ cơ thể, tôn dáng.</li>
                <li>Vải co giãn 2–4%, co rút thấp khi giặt máy.</li>
              </ul>
              <a
                href="#cta"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-900"
              >
                Nhờ tư vấn <Phone className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop"
                alt="size fit"
                className="h-72 w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1539533018447-63fcce2678e4?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Săn ưu đãi cuối mùa
            </h3>
            <p className="mt-3 text-neutral-700">
              Để lại email để nhận mã -15% cho đơn đầu tiên.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-neutral-400"
                placeholder="Email của bạn"
              />
              <button className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-900">
                Nhận mã
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white shadow">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <span>NovaWear</span>
            </a>
            <p className="mt-3 text-sm text-neutral-700">
              Trang phục tối giản – bền dáng – dễ phối.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>
                <a className="hover:text-black" href="#">
                  Câu chuyện thương hiệu
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
            <h4 className="text-sm font-semibold text-neutral-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
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
            <h4 className="text-sm font-semibold text-neutral-900">Liên hệ</h4>
            <div className="mt-3 space-y-2 text-sm text-neutral-700">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 6868
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} NovaWear. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
