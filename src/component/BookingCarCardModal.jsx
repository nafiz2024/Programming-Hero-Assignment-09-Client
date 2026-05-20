"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { addCarBookingData } from "@/lib/data";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600";

export function BookingCarCardModal({ car }) {

    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;
    const pickupDateRef = useRef(null);
    const dropOffDateRef = useRef(null);

    const { _id, dailyRentPrice, carName, imageUrl } = car;

    const handelBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            console.log("User not logged in");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const bookingData = {
            userId: user.id,
            userImage: user.image,
            userName: user.name,
            carId: _id,
            dailyRentPrice: dailyRentPrice,
            carName: carName,
            imageUrl: imageUrl,
            driverNeed: formData.get("driverNeed"),
            pickupDate: formData.get("pickupDate"),
            dropOffDate: formData.get("dropOffDate"),
            specialNote: formData.get("specialNote")
        }

        const { data: tokenData } = await authClient.token();
        await addCarBookingData(bookingData, tokenData?.token)

        toast.success('Successfully Booking The Car')

        router.push("/my-bookings")
    }

  return (
    <Modal>
      <Button 
        type="button"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(249,115,22,0.85)] transition hover:from-orange-600 hover:to-amber-600">
            Book This Car
    </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-[560px] overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.3)] backdrop-blur">
            <Modal.CloseTrigger />
            <Modal.Body className="p-0">
              <Surface variant="default" className="bg-transparent">
                <div className="w-full bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#eff6ff_45%,_#eef2ff_100%)] p-6 sm:p-8">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
                    DriveFleet
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                    Book This Car
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Please fill out the form below to book your car. Our team will contact you shortly to confirm your booking details.
                  </p>
                </div>

                <form onSubmit={handelBooking} className="mt-8 space-y-5">
                  <TextField className="w-full" name="driverNeed" variant="secondary">
                    <Label className={labelClassName}>Driver Need</Label>
                    <div className="relative">
                      <select
                        name="driverNeed"
                        defaultValue=""
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Select driver option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                  </TextField>
                  <TextField className="w-full" variant="secondary">
                    <Label className={labelClassName}>Pickup Date</Label>
                    <div className="relative">
                      <input
                        ref={pickupDateRef}
                        name="pickupDate"
                        type="date"
                        className={`${inputClassName} date-input pr-10 appearance-none`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (pickupDateRef.current?.showPicker) {
                            pickupDateRef.current.showPicker();
                          } else {
                            pickupDateRef.current?.focus();
                            pickupDateRef.current?.click();
                          }
                        }}
                        className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
                        aria-label="Open pickup date picker"
                      >
                        <FiCalendar />
                      </button>
                    </div>
                  </TextField>
                  <TextField className="w-full" variant="secondary">
                    <Label className={labelClassName}>Drop-off Date</Label>
                    <div className="relative">
                      <input
                        ref={dropOffDateRef}
                        name="dropOffDate"
                        type="date"
                        className={`${inputClassName} date-input pr-10 appearance-none`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (dropOffDateRef.current?.showPicker) {
                            dropOffDateRef.current.showPicker();
                          } else {
                            dropOffDateRef.current?.focus();
                            dropOffDateRef.current?.click();
                          }
                        }}
                        className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
                        aria-label="Open drop-off date picker"
                      >
                        <FiCalendar />
                      </button>
                    </div>
                  </TextField>
                  <TextField className="w-full" variant="secondary">
                    <Label className={labelClassName}>Special Note</Label>
                    <Input
                      name="specialNote"
                      type="text"
                      className={inputClassName}
                      placeholder="Enter special note"
                    />
                  </TextField>
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
                Book Now
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
