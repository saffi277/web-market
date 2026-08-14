import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { System } from "@/lib/types";
import OrderForm from "@/components/OrderForm";

type Props = { params: Promise<{ slug: string }> };

async function getSystem(slug: string): Promise<System | null> {
  try {
    return await api<System>(`/systems/${slug}`, { revalidate: 60 });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = await getSystem(slug).catch(() => null);
  if (!system) return { title: "نظام غير موجود" };
  return { title: system.nameAr, description: system.descAr };
}

export default async function SystemPage({ params }: Props) {
  const { slug } = await params;
  const system = await getSystem(slug);
  if (!system) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/systems" className="text-sm text-[--color-muted] hover:text-white">
        ← كل الأنظمة
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-5xl">{system.icon}</span>
            <div>
              <h1 className="text-2xl font-black lg:text-4xl">{system.nameAr}</h1>
              <p className="mt-1 text-sm text-[#8b5cf6]" dir="ltr">
                {system.nameEn}
              </p>
            </div>
            {system.badge && (
              <span
                className="rounded-full border px-3 py-1 text-xs font-bold"
                style={{
                  color: system.badgeColor ?? "#a855f7",
                  borderColor: `${system.badgeColor ?? "#a855f7"}55`,
                  background: `${system.badgeColor ?? "#a855f7"}1f`,
                }}
              >
                {system.badge}
              </span>
            )}
          </div>

          <p className="mt-6 text-base leading-9 text-[#cbc6d3]">{system.descAr}</p>

          {system.features.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-xl font-bold">المميزات</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {system.features.map((f) => (
                  <li
                    key={f}
                    className="panel flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm"
                  >
                    <Check size={16} className="shrink-0 text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {system.demoEnabled && (
            <div className="mt-10 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-6">
              <h3 className="text-lg font-bold">جرّب النظام مجاناً</h3>
              <p className="mt-2 text-sm leading-7 text-[--color-muted]">
                سجّل حساباً تجريبياً وادخل النظام فوراً ببيانات جاهزة — التجربة مجانية لمدة 7 أيام
                وبدون أي التزام.
              </p>
              <Link
                href={`/demo/${system.slug}`}
                className="mt-5 inline-block rounded-xl bg-emerald-500/90 px-6 py-3 text-sm font-extrabold text-black transition-transform hover:scale-[1.03]"
              >
                ابدأ التجربة المجانية ←
              </Link>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="panel rounded-2xl p-6">
            <p className="text-sm text-[--color-muted]">السعر</p>
            <p className="mt-1 text-3xl font-black text-[#c084fc]">
              {system.priceUsd ? `$${system.priceUsd}` : "حسب الطلب"}
            </p>
            <p className="mt-1 text-xs text-[--color-muted]">
              يشمل التركيب والتدريب والدعم الفني
            </p>

            <div className="my-6 h-px bg-white/10" />

            <h2 className="mb-4 font-bold">اطلب هذا النظام</h2>
            <OrderForm kind="purchase" systemSlug={system.slug} compact />
          </div>
        </aside>
      </div>
    </main>
  );
}
