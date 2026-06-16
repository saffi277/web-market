"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { Code2, Database, Cloud, ShieldCheck, Brain, Smartphone, Rocket, PieChart, Users, MessageCircle } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const nav = ["الرئيسية", "الأنظمة", "المشاريع", "الأسعار", "من نحن", "المدونة", "تواصل معنا"];
const services = [
  { label: "تطوير البرمجيات", Icon: Code2, pos: [-3.2, 1.15, 0] as [number, number, number] },
  { label: "الحوسبة السحابية", Icon: Cloud, pos: [-.95, 2.05, 0] as [number, number, number] },
  { label: "التطبيقات الذكية", Icon: Smartphone, pos: [2.2, 1.5, 0] as [number, number, number] },
  { label: "قواعد البيانات", Icon: Database, pos: [2.85, -.75, 0] as [number, number, number] },
  { label: "الذكاء الاصطناعي", Icon: Brain, pos: [.55, -2.05, 0] as [number, number, number] },
  { label: "تحليل البيانات", Icon: PieChart, pos: [-2.05, -1.75, 0] as [number, number, number] },
  { label: "الأمن السيبراني", Icon: ShieldCheck, pos: [-3.7, -.55, 0] as [number, number, number] }
];
const steps = [
  { title: "تواصل معنا", sub: "أخبرنا عن احتياجاتك", Icon: MessageCircle, n: "01" },
  { title: "اختبار وتسليم", sub: "تنفيذ وتسليم النظام", Icon: Users, n: "02" },
  { title: "تصميم وتطوير", sub: "تطوير نظامك المخصص", Icon: Code2, n: "03" },
  { title: "تحليل المتطلبات", sub: "فهم احتياجات عملك", Icon: PieChart, n: "04" },
  { title: "دعم وتطوير", sub: "نستمر بدعمك وتطويرك", Icon: Rocket, n: "05" }
];

function CoreScene() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * .22) * .14;
    group.current.rotation.x = Math.sin(t * .16) * .05;
  });
  const rings = useMemo(() => [1.15, 1.45, 1.78], []);
  return (
    <group ref={group}>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 1.7, 3]} intensity={7} color="#a855f7" />
      <pointLight position={[-3, -2, 2]} intensity={4} color="#d946ef" />
      <Float speed={1.7} rotationIntensity={.4} floatIntensity={.45}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.08, 1.08, .18, 96]} />
          <meshStandardMaterial color="#12051f" emissive="#5b13bd" emissiveIntensity={.8} metalness={.55} roughness={.22} />
        </mesh>
        <mesh position={[0, .13, 0]}>
          <torusGeometry args={[1.1, .035, 16, 140]} />
          <meshStandardMaterial color="#b56cff" emissive="#9d2cff" emissiveIntensity={2.5} />
        </mesh>
        <Text position={[0, .3, .08]} rotation={[-Math.PI / 2, 0, 0]} fontSize={.9} fontWeight={900} anchorX="center" anchorY="middle">
          Z
          <meshBasicMaterial color="#f0d7ff" />
        </Text>
      </Float>
      {rings.map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.25, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[r, .008, 10, 160]} />
          <meshBasicMaterial color={i === 1 ? "#d946ef" : "#7c3aed"} transparent opacity={.75} />
        </mesh>
      ))}
      {services.map((s, i) => (
        <group key={s.label} position={s.pos}>
          <Line points={[[0, 0, 0], [-s.pos[0] * .72, -s.pos[1] * .72, 0]]} color="#a855f7" lineWidth={1.4} transparent opacity={.7} />
          <Float speed={1.2 + i * .08} floatIntensity={.28} rotationIntensity={.18}>
            <mesh>
              <cylinderGeometry args={[.35, .35, .075, 64]} />
              <meshStandardMaterial color="#15101f" emissive="#4c128d" emissiveIntensity={1.2} metalness={.4} roughness={.22} />
            </mesh>
            <mesh position={[0, .07, 0]}>
              <torusGeometry args={[.36, .018, 12, 90]} />
              <meshBasicMaterial color="#c084fc" />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  );
}

function TechGraphic() {
  return (
    <div className="relative h-[620px] w-full overflow-visible" dir="rtl">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }} className="absolute inset-0">
        <CoreScene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.45} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0">
        {services.map(({ label, Icon }, i) => {
          const positions = ["left-[10%] top-[22%]", "left-[32%] top-[8%]", "right-[18%] top-[20%]", "right-[10%] top-[56%]", "left-[48%] bottom-[5%]", "left-[22%] bottom-[13%]", "left-[5%] top-[52%]"];
          return (
            <motion.div key={label} initial={{ opacity: 0, scale: .75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 * i }} className={`absolute ${positions[i]} floaty`} style={{ animationDelay: `${i * .35}s` }}>
              <div className="grid h-20 w-20 place-items-center rounded-full border border-fuchsia-400/70 bg-black/45 shadow-[0_0_34px_rgba(168,85,247,.75)]">
                <Icon className="h-8 w-8 text-purple-100" />
              </div>
              <div className="mt-2 rounded-lg border border-purple-400/70 bg-black/70 px-4 py-2 text-center text-sm font-bold shadow-[0_0_18px_rgba(168,85,247,.4)]">{label}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="absolute inset-x-6 bottom-12 h-px bg-purple-500/45" />
      <div className="scan-line absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent blur-xl" />
    </div>
  );
}

export default function ZawanHero() {
  return (
    <main className="hero-grid min-h-screen overflow-hidden px-6 py-7 text-white lg:px-14" dir="rtl">
      <header className="mx-auto flex max-w-[1680px] items-center justify-between gap-6">
        <button className="rounded-xl bg-gradient-to-l from-purple-600 to-fuchsia-600 px-7 py-4 text-sm font-bold shadow-[0_0_35px_rgba(168,85,247,.45)]">جرّب الأنظمة</button>
        <nav className="hidden items-center gap-12 text-sm font-bold text-white/90 lg:flex">{nav.map((n) => <a key={n}>{n}</a>)}</nav>
        <div className="flex items-center gap-4" dir="ltr">
          <div className="grid h-[70px] w-[70px] place-items-center rounded-xl border border-purple-400 text-2xl font-black shadow-[0_0_26px_rgba(168,85,247,.55)]">04</div>
          <div className="flex items-center gap-3"><span className="text-5xl font-black text-purple-500">Z</span><span className="text-2xl font-black">ZAWAN</span></div>
        </div>
      </header>
      <section className="mx-auto grid max-w-[1680px] grid-cols-1 items-center gap-8 pt-8 lg:grid-cols-[1.08fr_.92fr]">
        <TechGraphic />
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="relative z-10 text-right">
          <span className="mb-8 inline-flex rounded-xl border border-purple-400/40 bg-black/30 px-6 py-2 text-sm font-bold text-purple-200">حلول برمجية متكاملة</span>
          <h1 className="neon-text max-w-[780px] text-5xl font-black leading-[1.25] lg:text-7xl">من فكرة إلى نظام متكامل<br />نحن نبرمج <span className="bg-gradient-to-l from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">النجاح</span></h1>
          <p className="mt-8 max-w-[660px] text-xl leading-10 text-white/72">نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.</p>
          <div className="mt-12 flex flex-wrap gap-8">
            <button className="rounded-xl bg-gradient-to-l from-purple-600 to-fuchsia-600 px-10 py-5 text-lg font-bold shadow-[0_0_40px_rgba(168,85,247,.45)]">استعرض الأنظمة ↗</button>
            <button className="rounded-xl border border-purple-400 px-10 py-5 text-lg font-bold shadow-[0_0_25px_rgba(168,85,247,.18)]">تواصل معنا ☎</button>
          </div>
        </motion.div>
      </section>
      <section className="mx-auto max-w-[1500px] pb-10">
        <h2 className="mb-6 text-center text-3xl font-black">حياة أسهل مع أنظمة ZAWAN</h2>
        <div className="glass grid grid-cols-1 gap-5 rounded-2xl px-8 py-8 md:grid-cols-5">
          {steps.map(({ title, sub, Icon, n }) => (
            <div key={n} className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl border border-white/15 bg-white/10"><Icon className="h-7 w-7 text-purple-200" /></div>
              <h3 className="mt-5 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-white/55">{sub}</p>
              <span className="mt-5 inline-grid h-9 w-9 place-items-center rounded-full bg-purple-600 text-xs font-black shadow-[0_0_25px_rgba(168,85,247,.8)]">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
