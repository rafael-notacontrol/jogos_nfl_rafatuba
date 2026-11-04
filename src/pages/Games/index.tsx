import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Label, ListBox, Select } from "@heroui/react";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";
import { getGames, type Game } from "../../services/gamesService";
import SkeletonComponent from "../../components/Skeleton";

function Games() {
  const season = 2026;

  const [week, setWeek] = useState(9);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  function getGameStatus(game: Game) {
    if (game.status === "Final" || game.status === "Final/OT") {
      return "Finalizado";
    }

    const gameDate = new Date(game.date);
    const now = new Date();

    if (now < gameDate) {
      return "Agendado";
    }

    return "Em andamento";
  }

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
  }, [week]);

  return (
    <>
      <Button
        className="absolute top-4"
        variant="danger"
        onPress={() => navigate("/")}
      >
        <ArrowCircleLeftIcon size={32} />
      </Button>

      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Jogos da NFL</h1>

        <h2 className="text-center text-2xl font-bold">Temporada {season}</h2>

        <Select
          className="w-[256px]"
          placeholder="Selecione uma semana"
          value={String(week)}
          onChange={(value) => {
            if (value !== null) {
              setWeek(Number(value));
            }
          }}
        >
          <Label>Semana</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox selectionMode="single">
              {Array.from({ length: 18 }, (_, i) => i + 1).map((number) => (
                <ListBox.Item
                  key={number}
                  id={String(number)}
                  textValue={`Semana ${number}`}
                >
                  Semana {number}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {loading && <SkeletonComponent />}

        {error && <p>{error}</p>}

        {!loading && !error && games.length === 0 && (
          <p>Nenhum jogo encontrado para esta semana.</p>
        )}

        {!loading &&
          !error &&
          games.map((game) => (
            <Card
              key={game.id}
              className="w-full max-w-md overflow-hidden border border-accent/20 bg-linear-to-br from-accent/12 via-surface to-surface-secondary shadow-lg shadow-accent/10 dark:border-accent/30 dark:from-accent/20 dark:via-surface dark:to-accent/8 dark:shadow-accent/5"
            >
              <Card.Content className="flex flex-col items-center gap-2 p-2">
                {/* Times */}
                <h3 className="text-center text-md font-bold">
                  {game.visitor_team.full_name} x {game.home_team.full_name}
                </h3>

                {/* Placar */}
                <p className="text-2xl font-extrabold">
                  {game.visitor_team_score ?? "-"} x{" "}
                  {game.home_team_score ?? "-"}
                </p>

                {/* Data e horário */}
                <p className="text-md text-default-500">
                  {new Date(game.date).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Local */}
                {game.venue && (
                  <p className="text-sm text-default-500">{game.venue}</p>
                )}

                <p className="text-sm font-semibold text-accent">
                  {getGameStatus(game)}
                </p>
              </Card.Content>
            </Card>
          ))}
      </main>
    </>
  );
}

export default Games;
