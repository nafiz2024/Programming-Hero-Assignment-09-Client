"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { deleteBookingDataById, getCarBookingData, getCarData } from "@/lib/data";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/LoadingSpinner";

const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getTotalDays = (pickupDate, dropOffDate) => {
    const pickup = new Date(pickupDate);
    const dropOff = new Date(dropOffDate);

    if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropOff.getTime())) return 0;

    const diff = dropOff.getTime() - pickup.getTime();
    if (diff < 0) return 0;

    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};

const formatPrice = (value) => {
    return `$${Number(value || 0).toLocaleString("en-US")}`;
};

const MyBookingsPage = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const userId = String(user?.id || user?._id || "");
    const userEmail = String(user?.email || "").toLowerCase();
    const [bookingList, setBookingList] = useState([]);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                let token = "";
                try {
                    const { data: tokenData } = await authClient.token();
                    token = tokenData?.token || "";
                } catch {
                    token = "";
                }

                const [bookingData, carData] = await Promise.all([
                    getCarBookingData(token),
                    getCarData(token),
                ]);

                setBookingList(Array.isArray(bookingData) ? bookingData : bookingData ? [bookingData] : []);
                setCars(Array.isArray(carData) ? carData : []);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const carMap = useMemo(
        () => new Map(cars.map((car) => [String(car._id || car.id), car])),
        [cars]
    );

    const myBookingList = useMemo(() => {
        if (!userId && !userEmail) return [];
        return bookingList.filter(
            (item) => {
                const booking = item?.bookingData || item;
                const bookingUserId = String(booking?.userId || booking?.ownerId || "");
                const bookingUserEmail = String(booking?.userEmail || booking?.email || "").toLowerCase();

                return bookingUserId === userId || (!!userEmail && bookingUserEmail === userEmail);
            }
        );
    }, [bookingList, userEmail, userId]);

    const handleDeleteBooking = async (bookingId) => {
        if (!bookingId) return;
        let token = "";
        try {
            const { data: tokenData } = await authClient.token();
            token = tokenData?.token || "";
        } catch {
            token = "";
        }

        await deleteBookingDataById(bookingId, token);
        setBookingList((prev) => prev.filter((item) => String(item._id || item.id) !== String(bookingId)));
        toast.success("Booking deleted successfully");
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[30px] border border-white/70 bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#eff6ff_40%,_#eef2ff_100%)] p-5 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">DriveFleet</p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">My Bookings</h1>
                        <p className="mt-1 text-sm text-slate-500">Here are your all bookings.</p>
                    </div>
                    <div className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-600">
                        {myBookingList.length} Booking{myBookingList.length === 1 ? "" : "s"}
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/80 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur">
                    <table className="min-w-[800px] w-full">
                        <thead className="bg-slate-100/85">
                            <tr className="text-left">
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Car</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Driver Needed</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Total Price</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">PickUp Date</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Drop-off Date</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Note</th>
                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBookingList.map((item) => {
                                const booking = item?.bookingData || item;
                                const matchedCar = carMap.get(String(booking.carId || ""));
                                const imageSrc = booking.imageUrl || matchedCar?.imageUrl || "";
                                const totalDays = getTotalDays(booking.pickupDate, booking.dropOffDate);
                                const totalPrice = totalDays * Number(booking.dailyRentPrice || 0);

                                return (
                                    <tr key={item._id || item.id} className="border-t border-slate-100/80 transition hover:bg-orange-50/40">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {imageSrc ? (
                                                    <img
                                                        src={imageSrc}
                                                        alt={booking.carName || "Car image"}
                                                        className="h-11 w-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500 ring-2 ring-white shadow-sm">
                                                        Car
                                                    </div>
                                                )}
                                                <span className="text-sm font-semibold text-slate-800">
                                                    {booking.carName || "N/A"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-700">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                booking.driverNeed === "yes"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : booking.driverNeed === "no"
                                                        ? "bg-rose-100 text-rose-700"
                                                        : "bg-slate-100 text-slate-600"
                                            }`}>
                                                {booking.driverNeed === "yes" ? "Yes" : booking.driverNeed === "no" ? "No" : "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-bold text-slate-900">{formatPrice(totalPrice)}</td>
                                        <td className="px-4 py-4 text-sm text-slate-700">{formatDate(booking.pickupDate)}</td>
                                        <td className="px-4 py-4 text-sm text-slate-700">{formatDate(booking.dropOffDate)}</td>
                                        <td className="px-4 py-4 text-sm text-slate-700">
                                            <span className="inline-flex max-w-[180px] truncate rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                {booking.specialNote || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteBooking(String(item._id || item.id || ""))}
                                                className="inline-flex h-9 items-center justify-center rounded-lg bg-rose-500 px-3 text-xs font-semibold text-white transition hover:bg-rose-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {loading && <LoadingSpinner label="Loading bookings..." />}
                {!loading && myBookingList.length === 0 && (
                    <p className="mt-4 text-sm text-slate-500">No booking data found.</p>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
