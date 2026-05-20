import { getCarBookingData, getCarData } from "@/lib/data";

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

const MyBookingsPage = async () => {

    const bookingData = await getCarBookingData();
    const cars = await getCarData();
    const carMap = new Map((Array.isArray(cars) ? cars : []).map((car) => [String(car._id || car.id), car]));
    const bookingList = Array.isArray(bookingData) ? bookingData : bookingData ? [bookingData] : [];

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
                        {bookingList.length} Booking{bookingList.length === 1 ? "" : "s"}
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
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.map((item) => {
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {bookingList.length === 0 && (
                    <p className="mt-4 text-sm text-slate-500">No booking data found.</p>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
