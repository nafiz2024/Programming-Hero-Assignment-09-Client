"use client";

import Link from 'next/link';
import { FiMapPin, FiUsers } from 'react-icons/fi';
import { getCarData } from '@/lib/data';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

function normalizeCars(cars) {
  if (!Array.isArray(cars)) {
    return [];
  }

  return cars.map((car, index) => ({
    _id: car._id || car.id || `available-car-${index + 1}`,
    carName: car.carName || car.name || 'Unnamed Car',
    carType: car.carType || car.type || 'Unknown',
    dailyRentPrice: Number(car.dailyRentPrice || car.price || 0),
    seatCapacity: Number(car.seatCapacity || car.seats || 0),
    pickupLocation: car.pickupLocation || car.location || 'Unknown',
    availabilityStatus: String(
      car.availabilityStatus || car.status || 'unavailable'
    ).toLowerCase(),
    imageUrl: car.imageUrl || car.image || car.imgUrl || '',
  }));
}

const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      let token = "";
      try {
        const { data: tokenData } = await authClient.token();
        token = tokenData?.token || "";
      } catch {
        token = "";
      }

      const data = await getCarData(token);
      setCars(Array.isArray(data) ? data : []);
    };

    loadCars();
  }, []);

  const normalizedCars = normalizeCars(cars);
  const visibleCars = normalizedCars.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
              DriveFleet
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Available Cars
            </h2>
          </div>

          <Link
            href="/explore-car"
            className="mt-2 inline-flex items-center text-sm font-semibold text-orange-500 transition hover:text-orange-600"
          >
            View all cars
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCars.map((car) => (
            <article
              key={car._id}
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.22)]"
            >
              <div className="overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_#ffffff,_#f4f7fb_72%,_#edf2f7)]">
                {car.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={car.imageUrl}
                    alt={car.carName}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
                    No image
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  {car.carName}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {car.carType}
                </p>

                <p className="mt-3 text-2xl font-black tracking-tight text-orange-500">
                  ${car.dailyRentPrice}
                  <span className="ml-1 text-sm font-semibold text-slate-500">
                    / day
                  </span>
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
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
                </div>

                <Link
                  href={`/explore-car/${car._id}`}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableCars;
