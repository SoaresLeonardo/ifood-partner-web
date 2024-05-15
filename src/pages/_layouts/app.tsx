import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col gap-4 px-12 md:px-24 pt-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
