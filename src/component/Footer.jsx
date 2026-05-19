import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import logo from '@/assets/Logo2.png';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore-car', label: 'Explore Cars' },
  { href: '/add-car', label: 'Add Car' },
  { href: '/bookings', label: 'My Bookings' },
  { href: '/why-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQs' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refund', label: 'Refund Policy' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
];

const Footer = () => {
  return (
    <footer className="border-t border-orange-100 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div>
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="DriveFleet logo" className="h-10 w-auto" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
              DriveFleet is your trusted car rental platform offering verified
              cars, affordable pricing, and a seamless booking experience.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <FiFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                <FiInstagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-orange-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-orange-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">Contact Us</h3>
            <div className="mt-4 space-y-4 text-sm text-slate-500">
              <p className="flex items-start gap-3">
                <FiPhone className="mt-1 shrink-0 text-orange-500" />
                <span>+8801963-461230</span>
              </p>
              <p className="flex items-start gap-3">
                <FiMail className="mt-1 shrink-0 text-orange-500" />
                <span>support@drivefleet.com</span>
              </p>
              <p className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-orange-500" />
                <span>123, Banisree Road, Banasree, Rampura - 550025</span>
              </p>
              <p className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-orange-500" />
                <span>Support available 24/7 for every journey.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            © 2025 DriveFleet. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <FaCcVisa className="h-6 w-6 text-[#1a1f71]" />
            <FaCcMastercard className="h-6 w-6 text-[#eb001b]" />
            <SiUpwork className="h-5 w-5 text-[#14a800]" />
            <FaCcPaypal className="h-6 w-6 text-[#003087]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
