import { Outlet } from "react-router";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-end p-4">
        <ThemeSwitcher />
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
