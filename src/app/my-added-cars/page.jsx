"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { deleteCarDataById, getCarData } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingSpinner from "@/component/LoadingSpinner";

const statusClassMap = {
  available: "bg-emerald-100 text-emerald-700",
  booked: "bg-amber-100 text-amber-700",
  maintenance: "bg-rose-100 text-rose-700",
};

const MyAddedCars = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const userId = String(user?.id || user?._id || "");
  const userEmail = String(user?.email || "").toLowerCase();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        let token = "";
        try {
          const { data: tokenData } = await authClient.token();
          token = tokenData?.token || "";
        } catch {
          token = "";
        }

        const data = await getCarData(token);
        setCars(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const myAddedCars = useMemo(() => {
    if (!userId && !userEmail) return [];
    return cars.filter((car) => {
      const carUserId = String(car.userId || car.ownerId || "");
      const carUserEmail = String(car.userEmail || car.email || "").toLowerCase();
      return carUserId === userId || (!!userEmail && carUserEmail === userEmail);
    });
  }, [cars, userEmail, userId]);

  const handleDelete = async (car) => {
    let token = "";
    try {
      const { data: tokenData } = await authClient.token();
      token = tokenData?.token || "";
    } catch {
      token = "";
    }

    await deleteCarDataById(car, token);
    setCars((prev) => prev.filter((item) => String(item._id || item.id) !== String(car._id || car.id)));
    toast.success("Car deleted successfully");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-white/70 bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#eff6ff_40%,_#eef2ff_100%)] p-5 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">DriveFleet</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">My Added Cars</h1>
            <p className="mt-1 text-sm text-slate-500">Cars added by your current account.</p>
          </div>
          <div className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-600">
            {myAddedCars.length} Car{myAddedCars.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/80 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur">
          <table className="min-w-[860px] w-full">
            <thead className="bg-slate-100/85">
              <tr className="text-left">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Car</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Car Type</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Daily Price</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Status</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myAddedCars.map((car) => {
                const status = String(car.availabilityStatus || "maintenance").toLowerCase();
                return (
                  <tr key={car._id || car.id} className="border-t border-slate-100/80 transition hover:bg-orange-50/40">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {car.imageUrl ? (
                          <img
                            src={car.imageUrl}
                            alt={car.carName || "Car image"}
                            className="h-11 w-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500 ring-2 ring-white shadow-sm">
                            Car
                          </div>
                        )}
                        <span className="text-sm font-semibold text-slate-800">{car.carName || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{car.carType || "N/A"}</td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-900">${Number(car.dailyRentPrice || 0).toLocaleString("en-US")}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassMap[status] || "bg-slate-100 text-slate-700"}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => router.push(`/explore-car/${car._id || car.id}`)}
                          className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(car)}
                          className="inline-flex h-9 items-center justify-center rounded-lg bg-rose-500 px-3 text-xs font-semibold text-white transition hover:bg-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {loading && <LoadingSpinner label="Loading cars..." />}
        {!loading && myAddedCars.length === 0 && (
          <p className="mt-4 text-sm text-slate-500">No cars found for the current logged-in user.</p>
        )}
      </div>
    </div>
  );
};

export default MyAddedCars;
