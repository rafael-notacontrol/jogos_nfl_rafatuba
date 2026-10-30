import { Outlet } from "react-router";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background NFL 100 */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat bg-contain opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "url('/nfl-100.png')",
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <header className="flex justify-end p-4">
          <ThemeSwitcher />
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
