import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import heroCar from '@/assets/DrivenFleet.png';

export default function Banner() {
  return (
    <section className="relative isolate bg-[#fff8f3]">
      <div className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden">
        <Image
          src={heroCar}
          alt="White SUV for DriveFleet hero banner"
          fill
          preload
          className="h-full w-full object-fill"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,243,0.98)_0%,rgba(255,248,243,0.95)_24%,rgba(255,248,243,0.72)_42%,rgba(255,248,243,0.22)_62%,rgba(255,248,243,0)_82%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl items-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-7">
          <div className="max-w-[430px]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-sm">
              DriveFleet
            </p>
            <h1 className="max-w-sm text-4xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:max-w-md lg:text-[4rem]">
              Rent Your Perfect Car Anytime, Anywhere.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-8 text-slate-600 sm:text-base">
              DriveFleet connects you with a wide range of verified cars for every
              journey. Affordable prices, easy booking, and a smooth ride
              experience.
            </p>
            <Link
              href="/explore-car"
              className="mt-7 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(249,115,22,0.9)] transition hover:bg-orange-600"
            >
              Explore Cars
              <FiArrowRight className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
