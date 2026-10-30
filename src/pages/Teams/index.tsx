import { useEffect, useState } from "react";
import { getTeams, type Team } from "../../services/teamsService";
import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar os times.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p>Carregando times...</p>;

  if (error) return <p>{error}</p>;

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
        <h1 className="text-center text-2xl font-bold">Times da NFL</h1>

        {teams.map((team) => (
          <article key={team.id}>
            <h2>{team.full_name}</h2>
            <p>
              {team.conference} — {team.division}
            </p>
          </article>
        ))}
      </main>
    </>
  );
}

export default Teams;
