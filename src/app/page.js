import AvailableCars from "@/component/AvailableCars";
import Banner from "@/component/Banner";
import WhyChoose from "@/component/WhyChoose";
import Works from "@/component/Works";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f3]">
      <Banner />
      <AvailableCars />
      <WhyChoose />
      <Works />
    </main>
  );
}
