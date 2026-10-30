import { useEffect, useState } from "react";
import { getTeams, type Team } from "../../services/teamsService";
import { Link } from "react-router";

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <main>
      <Link to="/">
        <button className="botao">{`< Voltar`}</button>
      </Link>
      <h1>Times da NFL</h1>

      {teams.map((team) => (
        <article key={team.id}>
          <h2>{team.full_name}</h2>
          <p>
            {team.conference} — {team.division}
          </p>
        </article>
      ))}
    </main>
  );
}

export default Teams;
