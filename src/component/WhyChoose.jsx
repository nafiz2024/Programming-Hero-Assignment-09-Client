import { FiAward, FiCheckCircle, FiClock, FiHeadphones } from 'react-icons/fi';

const features = [
  {
    title: 'Affordable Pricing',
    description:
      'Get the best cars at unbeatable prices with no hidden charges.',
    icon: FiAward,
  },
  {
    title: 'Verified Cars',
    description:
      'All cars are thoroughly inspected and verified for your safety.',
    icon: FiCheckCircle,
  },
  {
    title: 'Easy Booking',
    description:
      'Simple steps to book your car in minutes anytime, anywhere.',
    icon: FiClock,
  },
  {
    title: '24/7 Support',
    description:
      'Our support team is always here to help you on your journey.',
    icon: FiHeadphones,
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-orange-100 bg-[#fffaf4] px-6 py-8 shadow-[0_18px_45px_-30px_rgba(249,115,22,0.25)] sm:px-8">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900">
            Why Choose DriveFleet
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-orange-100/80 bg-white px-4 py-5 shadow-[0_10px_25px_-22px_rgba(15,23,42,0.3)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
