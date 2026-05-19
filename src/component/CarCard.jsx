import Link from 'next/link';
import { FiMapPin, FiUsers } from 'react-icons/fi';

function normalizeStatus(status) {
  return String(status || '').toLowerCase() === 'available'
    ? 'available'
    : 'unavailable';
}

export default function CarCard({ car }) {
  const status = normalizeStatus(car.availabilityStatus);
  const detailsHref = `/explore-car/${car._id || car.id || car.carName}`;

  return (
    <article className="group rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.22)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_45px_-24px_rgba(15,23,42,0.28)]">
      <div className="flex justify-end">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            status === 'available'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-500'
          }`}
        >
          {status === 'available' ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="mt-1 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_#ffffff,_#f8fafc_72%,_#eef2f7)] p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.imageUrl}
          alt={car.carName}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5">
        <h2 className="text-[28px]/none text-xl font-extrabold tracking-tight text-slate-900">
          {car.carName}
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">{car.carType}</p>

        <p className="mt-4 text-3xl font-black tracking-tight text-orange-500">
          ${car.dailyRentPrice}
          <span className="ml-1 text-base font-semibold text-orange-500">/ day</span>
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <FiUsers className="text-slate-400" />
              {car.seatCapacity} Seats
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="text-slate-400" />
              {car.pickupLocation}
            </span>
          </div>

          <Link
            href={detailsHref}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
