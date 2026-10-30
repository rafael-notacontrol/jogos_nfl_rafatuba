import { useNavigate } from "react-router";
import logo from "../../assets/american-football.png";
import { Button } from "@heroui/react";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <img src={logo} alt="Logo do app" width="70" />
      <h1 className="text-center text-2xl font-bold">NFL Stats</h1>
      <p className="text-center text-2xl font-bold">NFL na palma de sua mão.</p>
      <div className="flex flex-col items-center justify-center gap-4 w-full mt-4">
        <Button fullWidth onPress={() => navigate("/teams")}>
          Ver Times
        </Button>

        <Button fullWidth onPress={() => navigate("/games")}>
          Ver Jogos
        </Button>
      </div>
    </main>
  );
}
