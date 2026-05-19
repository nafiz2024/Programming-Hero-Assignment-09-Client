"use client";

import { editCarDataById } from "@/lib/data";
import { Button, Modal, Surface } from "@heroui/react";

import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";

const inputClassName =
  'h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100';

const labelClassName =
  'mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600';


export function EditCarDataModal({car}) {
    const router = useRouter();

    const { _id, carName, dailyRentPrice, description, imageUrl, pickupLocation, seatCapacity} = car;
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const carData = Object.fromEntries(formData.entries());

        await editCarDataById(_id, carData)

        toast.success('Car Details Edit Successfully')

        router.push(`/explore-car`)
    };

  return (
    <Modal>
      <Button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
        Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-[960px] overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.3)] backdrop-blur">
            <Modal.CloseTrigger />
            <Modal.Body className="p-0">
              <Surface variant="default" className="bg-transparent">
                <div className="w-full bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#eff6ff_45%,_#eef2ff_100%)] p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
                      DriveFleet
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                      Edit Car Details
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Update the vehicle information and save your changes.
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
                defaultValue={carName}
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
                  defaultValue={dailyRentPrice}
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
                defaultValue={description}
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
                defaultValue={imageUrl}
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
                  defaultValue="carType"
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
                  defaultValue="availabilityStatus"
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
                defaultValue={seatCapacity}
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
                defaultValue={pickupLocation}
                type="text"
                placeholder="Enter pickup location"
                required
                className={inputClassName}
              />
            </div>
          </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-white/70 pt-4 sm:flex-row sm:justify-end">
                      <Button
                        slot="close"
                        variant="secondary"
                        className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(249,115,22,0.85)] transition duration-200 hover:from-orange-600 hover:to-amber-600"
                      >
                        Done
                      </Button>
                    </div>
                  </form>
                </div>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
