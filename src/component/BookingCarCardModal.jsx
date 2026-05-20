"use client";

import { useSession } from "@/lib/auth-client";
import { addCarBookingData } from "@/lib/data";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600";

export function BookingCarCardModal({ car }) {

    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const { _id, dailyRentPrice, carName } = car;

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
            driverNeed: formData.get("driverNeed"),
            pickupDate: formData.get("pickupDate"),
            dropOffDate: formData.get("dropOffDate"),
            specialNote: formData.get("specialNote")
        }

        await addCarBookingData(bookingData)

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
                    <select
                      name="driverNeed"
                      defaultValue=""
                      className={inputClassName}
                    >
                      <option value="" disabled>
                        Select driver option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </TextField>
                  <TextField className="w-full" name="pickupDate" type="date" variant="secondary">
                    <Label className={labelClassName}>Pickup Date</Label>
                    <Input className={inputClassName} />
                  </TextField>
                  <TextField className="w-full" name="dropOffDate" type="date" variant="secondary">
                    <Label className={labelClassName}>Drop-off Date</Label>
                    <Input className={inputClassName} />
                  </TextField>
                  <TextField className="w-full" name="specialNote" variant="secondary">
                    <Label className={labelClassName}>Special Note</Label>
                    <Input className={inputClassName} placeholder="Enter special note" />
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
