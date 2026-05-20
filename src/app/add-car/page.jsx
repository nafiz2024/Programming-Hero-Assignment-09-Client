'use client'

import { addCarDetails } from "@/lib/data";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";

const inputClassName =
  'h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100';

const labelClassName =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600';

const AddCarPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const car = Object.fromEntries(formData.entries())
        car.userId = user?.id || "";

        await addCarDetails(car)

        toast.success('Successfully Added The Car')

        router.push("/explore-car")
    }

    return (
        <div>
             <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#eff6ff_45%,_#eef2ff_100%)] px-4 py-12">
      <div className="w-full max-w-[960px] rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.22)] backdrop-blur sm:p-8 md:p-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
            DriveFleet
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Add New Car
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            List your vehicle with the details renters need most.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="carName" className={labelClassName}>
                Car Name
              </label>
              <input
                id="carName"
                name="carName"
                type="text"
                placeholder="Enter car name"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="dailyRentPrice" className={labelClassName}>
                Daily Rent Price
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-slate-500">
                  $
                </span>
                <input
                  id="dailyRentPrice"
                  name="dailyRentPrice"
                  type="number"
                  placeholder="Enter daily rent price"
                  required
                  className={`${inputClassName} pl-8`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="description" className={labelClassName}>
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className={labelClassName}>
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="Enter image URL"
                required
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="carType" className={labelClassName}>
                Car Type
              </label>
              <div className="relative">
                <select
                  id="carType"
                  name="carType"
                  defaultValue=""
                  required
                  className={`${inputClassName} appearance-none pr-9`}
                >
                  <option value="" disabled>
                    Select car type
                  </option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                  <option value="pickup">Pickup</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <FiChevronDown className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="availabilityStatus" className={labelClassName}>
                Availability Status
              </label>
              <div className="relative">
                <select
                  id="availabilityStatus"
                  name="availabilityStatus"
                  defaultValue=""
                  required
                  className={`${inputClassName} appearance-none pr-9`}
                >
                  <option value="" disabled>
                    Select availability
                  </option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <FiChevronDown className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="seatCapacity" className={labelClassName}>
                Seat Capacity
              </label>
              <input
                id="seatCapacity"
                name="seatCapacity"
                type="number"
                placeholder="Enter seat capacity"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="pickupLocation" className={labelClassName}>
                Pickup Location
              </label>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                placeholder="Enter pickup location"
                required
                className={inputClassName}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(249,115,22,0.85)] transition duration-200 hover:from-orange-600 hover:to-amber-600"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
        </div>
    );
};

export default AddCarPage;
