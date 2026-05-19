import AvailableCars from "@/component/AvailableCars";
import Banner from "@/component/Banner";
import WhyChoose from "@/component/WhyChoose";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f3]">
      <Banner />
      <AvailableCars />
      <WhyChoose />
    </main>
  );
}
