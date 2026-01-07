import Header from "./_components/Header";
import CategoryRail from "./_components/CategoryRail";
import ItemBrowser from "./_components/ItemBrowser";
import StatsRail from "./_components/StatsRail";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <CategoryRail />
        <ItemBrowser />
        <StatsRail />
      </main>
    </div>
  );
}
