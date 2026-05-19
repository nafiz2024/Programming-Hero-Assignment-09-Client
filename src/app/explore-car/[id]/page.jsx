import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiMapPin, FiShield, FiUsers } from "react-icons/fi";
import heroCar from "@/assets/DrivenFleet.png";
import { getCarDataById } from "@/lib/data";
import { EditCarDataModal } from "@/component/EditCarDataModal";

function normalizeCar(car) {
    if (!car) {
        return null;
    }

    return {
        _id: car._id || car.id || "",
        carName: car.carName || car.name || "Unnamed Car",
        carType: car.carType || car.type || "Unknown",
        dailyRentPrice: Number(car.dailyRentPrice || car.price || 0),
        seatCapacity: Number(car.seatCapacity || car.seats || 0),
        pickupLocation: car.pickupLocation || car.location || "Unknown",
        availabilityStatus: String(
            car.availabilityStatus || car.status || "unavailable"
        ).toLowerCase(),
        imageUrl: car.imageUrl || car.image || heroCar.src,
        description:
            car.description ||
            "This vehicle is well maintained, comfortable, and ready for your next journey.",
    };
}

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;

    const carData = await getCarDataById(id);
    const car = normalizeCar(carData);

    if (!car) {
        notFound();
    }

    const isAvailable = car.availabilityStatus === "available";

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#ffffff_38%,_#f8fafc_100%)]">
            <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                    <Link
                        href="/explore-car"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-orange-200 hover:text-orange-500"
                    >
                        <FiArrowLeft />
                        Back to Explore Cars
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700">{car.carName}</span>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)]">
                        <div className="overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_top,_#ffffff,_#f8fafc_68%,_#eef2f7)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={car.imageUrl}
                                alt={car.carName}
                                className="h-[360px] w-full object-contain p-6 sm:h-[460px]"
                            />
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)] sm:p-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ${
                                    isAvailable
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-rose-50 text-rose-500"
                                }`}
                            >
                                {isAvailable ? "Available" : "Unavailable"}
                            </span>
                            <span className="rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-500">
                                {car.carType}
                            </span>
                        </div>

                        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
                            {car.carName}
                        </h1>

                        <p className="mt-5 text-4xl font-black tracking-tight text-orange-500">
                            ${car.dailyRentPrice}
                            <span className="ml-2 text-lg font-semibold text-slate-500">
                                / day
                            </span>
                        </p>

                        <p className="mt-6 text-base leading-8 text-slate-500">
                            {car.description}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                        <FiUsers className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Seats
                                        </p>
                                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                                            {car.seatCapacity} Seats
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                        <FiMapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Pickup
                                        </p>
                                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                                            {car.pickupLocation}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                        <FiShield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Safety
                                        </p>
                                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                                            Verified Vehicle
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                        <FiCheckCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Booking
                                        </p>
                                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                                            Instant Request
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(249,115,22,0.85)] transition hover:from-orange-600 hover:to-amber-600"
                            >
                                Book This Car
                            </button>
                            <EditCarDataModal car={car} />
                            <button
                                type="button"
                                className="inline-flex h-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-500 transition hover:bg-rose-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CarDetailsPage;
