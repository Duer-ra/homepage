import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Duevox home">
      <Image
        src="/Duevox Logopng"
        alt="Duevox"
        width={250}
        height={150}
        priority
        className={`h-auto w-auto ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}