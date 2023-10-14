import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col lg:flex-row-reverse items-center justify-center mt-5 p-5">
      <Image
        className="m-4 p-2"
        src="/LandingImage2.png"
        alt="HeroImage"
        width={600}
        height={600}
      />
      <div className="flex flex-col gap-3">
        <div className="text-5xl font-extrabold">
          Shop now, pay later <br /> on any marketplace <br /> through Solana.
        </div>
        <p className="mt-2 red">
          If you don't have money pay with our app and return later <br /> No more wait to buy anything on any WEB3 marketplace. <br /> Sign
          up now and start diving into a wonderful experience.
        </p>
        <div className="flex gap-5 mt-2">
          <Link href="/docs">
            <Button variant="premium">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button variant="premium">How it works</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
