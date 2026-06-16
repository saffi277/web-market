import Image from 'next/image';

export default function Home() {
  return (
    <div className="page">
      <div className="heroWrap">
        <Image
          src="/zawan-hero.png"
          alt="ZAWAN hero"
          className="heroImage"
          width={1920}
          height={1080}
          priority
          style={{ width: '100%', height: 'auto' }}
        />
        <a className="hotspot try"     href="/products" aria-label="جرّب الأنظمة" />
        <a className="hotspot systems" href="/products" aria-label="استعرض الأنظمة" />
        <a className="hotspot contact" href="/contact"  aria-label="تواصل معنا" />
      </div>
    </div>
  );
}
