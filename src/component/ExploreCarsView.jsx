'use client';

import Link from 'next/link';
import { useDeferredValue, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import CarCard from '@/component/CarCard';
import heroCar from '@/assets/DrivenFleet.png';

function normalizeCars(cars) {
  if (!Array.isArray(cars)) {
    return [];
  }

  return cars.map((car, index) => ({
    _id: car._id || car.id || `car-${index + 1}`,
    carName: car.carName || car.name || 'Unnamed Car',
    carType: car.carType || car.type || 'Unknown',
    dailyRentPrice: Number(car.dailyRentPrice || car.price || 0),
    seatCapacity: Number(car.seatCapacity || car.seats || 0),
    pickupLocation: car.pickupLocation || car.location || 'Unknown',
    availabilityStatus: car.availabilityStatus || car.status || 'unavailable',
    imageUrl: car.imageUrl || car.image || heroCar.src,
  }));
}

export default function ExploreCarsView({ cars }) {
  const normalizedCars = normalizeCars(cars);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const deferredSearchText = useDeferredValue(searchText);

  const types = ['all', ...new Set(normalizedCars.map((car) => car.carType))];

  const filteredCars = normalizedCars.filter((car) => {
    const matchesSearch = car.carName
      .toLowerCase()
      .includes(deferredSearchText.toLowerCase());

    const matchesType =
      selectedType === 'all' || car.carType.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#ffffff_38%,_#f8fafc_100%)]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Explore Cars
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm font-medium text-slate-500">
              <Link href="/" className="transition hover:text-slate-800">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-700">Explore Cars</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row lg:max-w-[560px]">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by car name..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="relative sm:w-48">
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-semibold text-slate-700 outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-900">No cars found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try another car name or switch the type filter.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
