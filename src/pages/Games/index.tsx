import { useEffect, useState } from "react";
import { getGames, type Game } from "../../services/gamesService";
import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";

function Games() {
  const [season, setSeason] = useState(2026);
  const [week, setWeek] = useState(8);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadGames() {
      setLoading(true);
      setError(null);

      try {
        const data = await getGames(season, week);
        setGames(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar os jogos.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, [season, week]);

  return (
    <>
      <Button
        className="absolute top-4"
        variant="danger"
        onPress={() => navigate("/")}
      >
        {<ArrowCircleLeftIcon size={32} />}
      </Button>
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Jogos da NFL</h1>

        <div>
          <label htmlFor="season">Temporada:</label>

          <select
            id="season"
            value={season}
            onChange={(e) => setSeason(Number(e.target.value))}
          >
            {Array.from({ length: 7 }, (_, i) => 2026 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="week">Semana:</label>

          <select
            id="week"
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
          >
            {Array.from({ length: 18 }, (_, i) => i + 1).map((number) => (
              <option key={number} value={number}>
                Semana {number}
              </option>
            ))}
          </select>
        </div>

        {loading && <p>Carregando jogos...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && games.length === 0 && (
          <p>Nenhum jogo encontrado para esta semana.</p>
        )}

        {!loading &&
          !error &&
          games.map((game) => (
            <article key={game.id}>
              <h3>
                {game.visitor_team.full_name} x {game.home_team.full_name}
              </h3>

              <h3>
                {game.visitor_team_score ?? "0"} x {game.home_team_score ?? "0"}
              </h3>

              <p>
                {new Date(game.date).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{game.venue}</p>
            </article>
          ))}
      </main>
    </>
  );
}

export default Games;
