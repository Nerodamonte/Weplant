import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Droplets,
  Leaf,
  ShieldCheck,
  Truck,
  CreditCard,
  Star,
  Heart,
  CheckCircle2,
  ChevronRight,
  Phone,
} from "lucide-react";

// LDP Mỹ phẩm – chỉ UI (clone vibe SimplePage). Không có logic gọi API.
// Palette: rose / pink nhẹ nhàng, layout responsive, ảnh minh hoạ Unsplash.

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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
  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-rose-700 backdrop-blur shadow-sm">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="text-base font-semibold text-rose-900">{title}</h4>
    </div>
    <p className="mt-3 text-sm leading-6 text-rose-600">{desc}</p>
  </div>
);

const ProductCard = ({ img, name, tag }) => (
  <div className="group overflow-hidden rounded-2xl bg-rose-50/60 shadow-sm ring-1 ring-rose-100">
    <img
      src={img}
      alt={name}
      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div className="p-5">
      <p className="text-xs text-rose-500">{tag}</p>
      <h5 className="mt-1 text-lg font-semibold text-rose-900">{name}</h5>
      <button className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700">
        Mua ngay <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const IngredientCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm">
    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600">
      <Icon className="h-5 w-5" />
    </div>
    <h5 className="mt-3 text-base font-semibold text-rose-900">{title}</h5>
    <p className="mt-1 text-sm leading-6 text-rose-600">{desc}</p>
  </div>
);

const PriceCard = ({ name, price, perks, highlight }) => (
  <div
    className={`relative rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
      highlight ? "border-rose-300 bg-white" : "border-rose-100 bg-white"
    }`}
  >
    {highlight && (
      <span className="absolute -top-3 right-6 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow">
        Bán chạy
      </span>
    )}
    <h4 className="text-lg font-semibold text-rose-900">{name}</h4>
    <p className="mt-2 text-3xl font-extrabold tracking-tight text-rose-900">
      {price}
      <span className="ml-1 text-sm font-normal text-rose-500">/ bộ</span>
    </p>
    <ul className="mt-4 space-y-3">
      {perks.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-rose-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {p}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
        highlight
          ? "bg-rose-600 text-white hover:bg-rose-700"
          : "bg-rose-900 text-white hover:bg-rose-950"
      }`}
    >
      Chọn gói
    </button>
  </div>
);

export default function CosmeticsLandingPage() {
  return (
    <div className="min-h-screen bg-rose-50 text-rose-900">
      {/* NAV */}
      <header className="sticky top-0 z-40 w-full border-b border-white/30 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow">
              <Heart className="h-5 w-5" />
            </span>
            <span className="text-rose-900">RoséSkin</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-rose-700 md:flex">
            <a href="#benefits" className="hover:text-rose-600">
              Công dụng
            </a>
            <a href="#products" className="hover:text-rose-600">
              Sản phẩm
            </a>
            <a href="#ingredients" className="hover:text-rose-600">
              Thành phần
            </a>
            <a href="#reviews" className="hover:text-rose-600">
              Đánh giá
            </a>
            <a href="#pricing" className="hover:text-rose-600">
              Giá
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="#cta"
              className="rounded-xl bg-rose-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-950"
            >
              Mua ngay
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
          src="https://images.unsplash.com/photo-1505575972945-2804b5de9f17?q=80&w=2000&auto=format&fit=crop"
          alt="Cosmetics"
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
              <Badge>New Formula • Dermatologist Tested</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-rose-950 md:text-6xl">
                Da căng bóng,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-rose-600 to-pink-500">
                  chuẩn glass-skin
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-rose-600 md:text-lg">
                Bộ chăm sóc RoséSkin giúp phục hồi hàng rào bảo vệ, cấp ẩm sâu
                và làm sáng tự nhiên chỉ sau 14 ngày sử dụng đều đặn.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
                >
                  Mua combo
                </a>
                <a
                  href="#ingredients"
                  className="rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-semibold text-rose-900 hover:bg-rose-50"
                >
                  Xem thành phần
                </a>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-rose-600">
                <ShieldCheck className="h-4 w-4" /> Da liễu khuyên dùng
                <Droplets className="ml-4 h-4 w-4" /> Không cồn • Không hương
                liệu
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-rose-100 to-pink-100 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white/70 p-3 shadow-lg backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1617220372350-9d27772d8c5c?q=80&w=1800&auto=format&fit=crop"
                  alt="products"
                  className="h-80 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* BENEFITS */}
      <Section id="benefits">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Hiệu quả nhìn thấy rõ
            </h2>
            <p className="mt-2 text-rose-600">
              Công thức cân bằng giúp da khoẻ từ gốc, sáng mịn và ẩm mượt suốt
              ngày.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature
              icon={Droplets}
              title="Cấp ẩm 24h"
              desc="Hyaluronic 3 phân tử khoá ẩm nhiều lớp cho bề mặt mọng nước."
            />
            <Feature
              icon={Sparkles}
              title="Làm sáng da"
              desc="Niacinamide 5% hỗ trợ đều màu, giảm vết thâm sau mụn."
            />
            <Feature
              icon={ShieldCheck}
              title="Phục hồi hàng rào"
              desc="Ceramide NP + Cholesterol củng cố lớp màng bảo vệ tự nhiên."
            />
          </div>
        </Container>
      </Section>

      {/* PRODUCTS */}
      <Section
        id="products"
        className="bg-gradient-to-b from-white to-rose-50/60"
      >
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Bộ sản phẩm
              </h2>
              <p className="mt-2 text-rose-600">
                Quy trình 4 bước cho buổi sáng & tối.
              </p>
            </div>
            <a
              href="#pricing"
              className="hidden items-center gap-1 text-sm font-semibold text-rose-700 hover:text-rose-900 md:inline-flex"
            >
              Xem giá <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <ProductCard
              img="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop"
              name="Sữa rửa mặt dịu nhẹ"
              tag="Step 1 • Cleanser"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1610173826011-7a5a0a5a4f8a?q=80&w=1600&auto=format&fit=crop"
              name="Toner cân bằng"
              tag="Step 2 • Toner"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1600&auto=format&fit=crop"
              name="Serum phục hồi"
              tag="Step 3 • Serum"
            />
            <ProductCard
              img="https://images.unsplash.com/photo-1585238342028-4cbc7f1b8a5c?q=80&w=1600&auto=format&fit=crop"
              name="Kem khoá ẩm"
              tag="Step 4 • Moisturizer"
            />
          </div>
        </Container>
      </Section>

      {/* INGREDIENTS */}
      <Section id="ingredients">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Thành phần chủ đạo
            </h2>
            <p className="mt-2 text-rose-600">
              Sạch – rõ – vừa đủ. Không cồn khô, không hương liệu, không
              paraben.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <IngredientCard
              icon={Leaf}
              title="Niacinamide 5%"
              desc="Giảm thâm, đều màu, hỗ trợ se lỗ chân lông."
            />
            <IngredientCard
              icon={Droplets}
              title="Hyaluronic Acid"
              desc="Giữ ẩm nhiều tầng, tăng độ đàn hồi bề mặt."
            />
            <IngredientCard
              icon={ShieldCheck}
              title="Ceramide Complex"
              desc="Khôi phục hàng rào, giảm kích ứng, khoẻ da."
            />
          </div>
        </Container>
      </Section>

      {/* BEFORE / AFTER STRIP */}
      <Section className="py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-rose-100/40"
              >
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
            <p className="mt-2 text-rose-600">
              4.9/5 từ 1.200+ đánh giá xác minh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Tường Vy",
                quote: "Da đỡ bong tróc rõ, make up ăn hơn hẳn sau 2 tuần.",
              },
              {
                name: "Minh Châu",
                quote: "Serum thấm nhanh, mùi gần như không có. Da sáng khoẻ.",
              },
              {
                name: "Hà My",
                quote:
                  "Combo đủ dùng sáng tối, hợp ví sinh viên mà chất lượng.",
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
                <blockquote className="text-sm leading-6 text-rose-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-rose-900">
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
              Chọn gói phù hợp
            </h2>
            <p className="mt-2 text-rose-600">
              Miễn phí vận chuyển đơn từ 499k. Đổi trả trong 14 ngày.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Basic Care"
              price="299.000đ"
              perks={["Sữa rửa mặt", "Toner cân bằng", "Miễn phí vận chuyển"]}
            />
            <PriceCard
              name="Glow Set"
              price="549.000đ"
              highlight
              perks={[
                "Cleanser + Toner + Serum",
                "Quà tặng mini 20ml",
                "Ưu tiên hỗ trợ 24/7",
              ]}
            />
            <PriceCard
              name="Repair Deluxe"
              price="899.000đ"
              perks={["Full combo 4 sản phẩm", "Mask 3 miếng", "Tư vấn da 1-1"]}
            />
          </div>
          <div className="mt-6 grid gap-4 text-sm text-rose-700 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Giao nhanh 24-48h
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> COD / Thẻ / Ví
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Hàng chính hãng
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
                q: "Da nhạy cảm dùng được không?",
                a: "Công thức tối giản, không cồn và hương liệu; đã test kích ứng ở nhóm da nhạy cảm.",
              },
              {
                q: "Bao lâu thấy hiệu quả?",
                a: "Thường 10–14 ngày cho độ ẩm và sáng; thâm mụn mờ dần trong 3–4 tuần.",
              },
              {
                q: "Có bán lẻ từng món?",
                a: "Có. Bạn có thể chọn từng sản phẩm ở mục Sản phẩm hoặc liên hệ tư vấn.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-rose-900">
                  {item.q}
                  <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-rose-700">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section id="cta" className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8a?q=80&w=2000&auto=format&fit=crop"
          alt="cta"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-100/90 via-white/40 to-transparent" />
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-8 text-center backdrop-blur shadow-lg">
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Sẵn sàng nâng cấp routine?
            </h3>
            <p className="mt-3 text-rose-700">
              Để lại số điện thoại, chúng tôi gọi tư vấn miễn phí.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-rose-400"
                placeholder="Số điện thoại của bạn"
              />
              <button className="rounded-xl bg-rose-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-950">
                Nhận tư vấn
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
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow">
                <Heart className="h-5 w-5" />
              </span>
              <span className="text-rose-900">RoséSkin</span>
            </a>
            <p className="mt-3 text-sm text-rose-700">
              Mỹ phẩm chuẩn mực: minh bạch, hiệu quả, dịu lành.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-rose-900">
              Về chúng tôi
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-rose-700">
              <li>
                <a className="hover:text-rose-600" href="#">
                  Câu chuyện thương hiệu
                </a>
              </li>
              <li>
                <a className="hover:text-rose-600" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a className="hover:text-rose-600" href="#">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-rose-900">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-rose-700">
              <li>
                <a className="hover:text-rose-600" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-rose-600" href="#">
                  Chính sách
                </a>
              </li>
              <li>
                <a className="hover:text-rose-600" href="#">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-rose-900">Kết nối</h4>
            <div className="mt-3 space-y-2 text-sm text-rose-700">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 1900 8888
              </p>
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4" /> @roseskin.official
              </p>
            </div>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-rose-600">
          © {new Date().getFullYear()} RoséSkin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
