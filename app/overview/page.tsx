import SideNavigation from "../components/SideNavigation";
import AppHeader from "./_components/AppHeader";
import OverviewPage from "./_components/OverviewPage";

function OverviewRoute() {
  return (
    <main className="flex h-screen w-full bg-white text-stone-900">
      <SideNavigation />

      <section className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <OverviewPage />
      </section>
    </main>
  );
}

export default OverviewRoute;
