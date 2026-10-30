export interface Game {
  id: number;
  date: string;
  season: number | null;
  week: number;
  status: string;
  venue: string;
  home_team: {
    id: number;
    full_name: string;
    abbreviation: string;
  };
  visitor_team: {
    id: number;
    full_name: string;
    abbreviation: string;
  };
  home_team_score: number | null;
  visitor_team_score: number | null;
}

interface GamesResponse {
  data: Game[];
}

export async function getGames(season: number, week: number): Promise<Game[]> {
  const params = new URLSearchParams();

  params.append("seasons[]", String(season));
  params.append("weeks[]", String(week));
  params.append("per_page", "100");

  const response = await fetch(
    `https://api.balldontlie.io/nfl/v1/games?${params.toString()}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_BALLDONTLIE_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar jogos: ${response.status}`);
  }

  const result: GamesResponse = await response.json();

  return result.data;
}
