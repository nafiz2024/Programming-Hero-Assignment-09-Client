import AvailableCars from "@/component/AvailableCars";
import Banner from "@/component/Banner";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f3]">
      <Banner />
      <AvailableCars />
    </main>
  );
}
