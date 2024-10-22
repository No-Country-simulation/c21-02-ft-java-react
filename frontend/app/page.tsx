import Footer from "@/components/footer/footer";
import Homepage from "@/components/homepage/homepage";

export default function Home() {

  return (
    <>
      <div className="flex flex-col">
        {/* last bets */}
        <Homepage className="grow" />
        <Footer />
      </div>
    </>
  );
}
