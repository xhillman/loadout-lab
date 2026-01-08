import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";

export default function Home() {

  return (
    <div className="">
      <Header />
      <main className="grid grid-cols-12 min-h-[calc(100vh-80px)]">
        <div className="col-span-2 h-full bg-neutral-800 p-4">
          <CategoryRail />
        </div>
        <div className="col-span-7 h-full bg-neutral-600 p-4">
          <ItemBrowser />
        </div>
        <div className="col-span-3 h-full bg-neutral-800 p-4">
          <StatsRail />
        </div>
      </main>
    </div>
  );
}
