import { FiCalendar, FiMapPin, FiSearch, FiTruck } from 'react-icons/fi';

const steps = [
  {
    number: '1',
    title: 'Browse Cars',
    description:
      'Explore a wide range of cars that suit your needs and budget.',
    icon: FiSearch,
  },
  {
    number: '2',
    title: 'Choose Car',
    description:
      'Select your preferred car and check the details, features, and pricing.',
    icon: FiTruck,
  },
  {
    number: '3',
    title: 'Book',
    description:
      'Provide your dates and confirm your booking in a few simple steps.',
    icon: FiCalendar,
  },
  {
    number: '4',
    title: 'Enjoy Ride',
    description:
      'Hit the road and enjoy a safe, comfortable, and memorable ride.',
    icon: FiMapPin,
  },
];

const Works = () => {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.22)] sm:px-8">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900">
            How It Works
          </h2>

          <div className="relative mt-8">
            <div className="absolute left-[6%] right-[6%] top-3 hidden -translate-y-1/2 border-t border-dashed border-slate-300 xl:block" />
            <div className="absolute right-[6%] top-3 hidden h-3 w-[7%] -translate-y-1/2 bg-white xl:block" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <article key={number} className="relative text-center">
                <div className="relative z-10 mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {number}
                </div>

                <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
