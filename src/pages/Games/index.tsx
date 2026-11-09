import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "@heroui/react";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";

import {
  ScoreBoardEspnApi,
  type Event,
  type Competitor,
} from "../../services/ScoreBoardEspnApi";

import SkeletonComponent from "../../components/Skeleton";
import { ModalComponent } from "../../components/Modal";

function Games() {
  const [games, setGames] = useState<Event[]>([]);
  const [week, setWeek] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  function getGameStatus(game: Event) {
    const status = game.competitions[0].status;

    if (status.type.completed || status.type.state === "post") {
      return "Finalizado";
    }

    if (status.type.state === "in") {
      return "Em andamento";
    }

    return "Agendado";
  }

  function getCampaign(competitor: Competitor) {
    return (
      competitor.records?.find((record) => record.name === "overall")
        ?.summary ?? "-"
    );
  }

  useEffect(() => {
    async function loadGames() {
      setLoading(true);
      setError(null);

      try {
        const data = await ScoreBoardEspnApi();

        setGames(data.events);
        setWeek(data.week.number);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar os jogos.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return (
    <>
      <Button
        className="absolute top-4"
        variant="danger"
        onPress={() => navigate("/")}
      >
        <ArrowCircleLeftIcon size={32} />
      </Button>

      <ModalComponent />

      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Jogos da NFL</h1>

        {!loading && !error && (
          <h2 className="text-center text-lg font-semibold">Semana {week}</h2>
        )}

        {loading && <SkeletonComponent />}

        {error && <p>{error}</p>}

        {!loading && !error && games.length === 0 && (
          <p>Nenhum jogo encontrado para esta semana.</p>
        )}

        {!loading &&
          !error &&
          games.map((game) => {
            const competition = game.competitions[0];

            const awayTeam = competition.competitors.find(
              (team) => team.homeAway === "away",
            );

            const homeTeam = competition.competitors.find(
              (team) => team.homeAway === "home",
            );

            if (!awayTeam || !homeTeam) return null;

            const dataJogo = new Date(competition.date);

            const dataFormatada = dataJogo.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            const diaSemana = dataJogo.toLocaleDateString("pt-BR", {
              weekday: "long",
            });

            return (
              <Card
                key={game.id}
                className="w-full max-w-md overflow-hidden border border-accent/20 bg-linear-to-br from-accent/12 via-surface to-surface-secondary shadow-lg shadow-accent/10 dark:border-accent/30 dark:from-accent/20 dark:via-surface dark:to-accent/8 dark:shadow-accent/5"
              >
                <Card.Content className="flex flex-col items-center gap-3 p-3">
                  {/* Times e logos */}
                  <div className="grid w-full grid-cols-2 items-center gap-2">
                    {/* Visitante */}
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={awayTeam.team.logo}
                        alt={awayTeam.team.displayName}
                        className="h-16 w-16 object-contain"
                      />

                      <h3 className="text-center text-sm font-bold">
                        {awayTeam.team.displayName}
                      </h3>

                      <p className="text-xs text-default-500">
                        {getCampaign(awayTeam)}
                      </p>
                    </div>

                    {/* Mandante */}
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={homeTeam.team.logo}
                        alt={homeTeam.team.displayName}
                        className="h-16 w-16 object-contain"
                      />

                      <h3 className="text-center text-sm font-bold">
                        {homeTeam.team.displayName}
                      </h3>

                      <p className="text-xs text-default-500">
                        {getCampaign(homeTeam)}
                      </p>
                    </div>
                  </div>

                  {/* Placar */}
                  <p className="text-2xl font-extrabold">
                    {awayTeam.score ?? "-"} x {homeTeam.score ?? "-"}
                  </p>

                  {/* Data e horário */}
                  <p className="text-sm text-default-500">
                    {diaSemana} {dataFormatada}
                  </p>

                  {/* Estádio */}
                  <p className="text-sm text-default-500">
                    {competition.venue.fullName}
                  </p>

                  {/* Status */}
                  <p
                    className={`text-sm font-semibold ${
                      getGameStatus(game) === "Finalizado"
                        ? "text-success"
                        : "text-accent"
                    }`}
                  >
                    {getGameStatus(game)}
                  </p>
                </Card.Content>
              </Card>
            );
          })}
      </main>
    </>
  );
}

export default Games;
