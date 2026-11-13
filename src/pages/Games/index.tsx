import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "@heroui/react";
import { ArrowCircleLeftIcon, MonitorPlayIcon } from "@phosphor-icons/react";
import VideoPlayer from "../../components/VideoPlayer";

import {
  ScoreBoardEspnApi,
  type Event,
  type Competitor,
} from "../../services/ScoreBoardEspnApi";

import SkeletonComponent from "../../components/Skeleton";
import { ModalComponent } from "../../components/Modal";
import DescansoTimes from "../../components/DescansoTimes";

function Games() {
  const [games, setGames] = useState<Event[]>([]);
  const [week, setWeek] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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
        <DescansoTimes />

        {loading && <SkeletonComponent />}

        {error && <p>{error}</p>}

        {!loading && !error && games.length === 0 && (
          <p>Nenhum jogo encontrado para esta semana.</p>
        )}

        {videoUrl && (
          <VideoPlayer videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />
        )}

        {!loading &&
          !error &&
          games.map((game) => {
            const competition = game.competitions[0];

            const highlights = competition.highlights;

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
                <Card.Content className="flex flex-col items-center gap-2 p-2 relative">
                  {/* Times e logos */}
                  <div className="grid w-full grid-cols-2 items-center gap-2">
                    {/* Visitante */}
                    <div className="flex flex-col items-center">
                      <img
                        src={awayTeam.team.logo}
                        alt={awayTeam.team.displayName}
                        className="h-14 w-14 object-contain"
                      />

                      <h3 className="text-center text-sm font-bold">
                        {awayTeam.team.displayName}
                      </h3>

                      <p className="text-xs text-default-500">
                        {getCampaign(awayTeam)}
                      </p>
                    </div>

                    {/* Mandante */}
                    <div className="flex flex-col items-center">
                      <img
                        src={homeTeam.team.logo}
                        alt={homeTeam.team.displayName}
                        className="h-14 w-14 object-contain"
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
                  <div className="flex flex-col items-center">
                    {/* Data e horário */}
                    <p className="text-sm text-default-500">
                      {diaSemana} {dataFormatada}
                    </p>

                    {/* Estádio */}
                    <p className="text-sm text-default-500">
                      {competition.venue.fullName}
                    </p>
                  </div>

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

                  {highlights && highlights.length > 0 && (
                    <Button
                      className="absolute bottom-4 right-4"
                      isIconOnly
                      variant="outline"
                      size="sm"
                      onPress={() =>
                        setVideoUrl(highlights[0].links?.source?.href ?? null)
                      }
                      aria-label="Assistir aos melhores momentos"
                    >
                      <MonitorPlayIcon size={32} />
                    </Button>
                  )}
                </Card.Content>
              </Card>
            );
          })}
      </main>
    </>
  );
}

export default Games;
