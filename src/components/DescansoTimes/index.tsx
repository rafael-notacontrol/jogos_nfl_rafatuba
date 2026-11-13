import { useEffect, useState } from "react";
import {
  ScoreBoardEspnApi,
  type ScoreBoardResponse,
} from "../../services/ScoreBoardEspnApi";

export default function DescansoTimes() {
  const [descansoTimes, setDescansoTimes] = useState<
    ScoreBoardResponse["week"]["teamsOnBye"]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDescansoTimes() {
      setLoading(true);
      setError(null);
      try {
        const data = await ScoreBoardEspnApi();
        setDescansoTimes(data.week.teamsOnBye);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar os times.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDescansoTimes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h2 className="text-center text-lg font-semibold">
        Times em Descanso(on bye):
      </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Carregando...</p>}
      {!loading && !error && (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {descansoTimes.map((team) => (
            <div
              className="flex flex-col justify-center items-center"
              key={team.id}
            >
              <img
                key={team.id}
                src={team.logo}
                alt={team.displayName}
                className="h-14 w-14 object-contain"
              />
              <span>{team.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
