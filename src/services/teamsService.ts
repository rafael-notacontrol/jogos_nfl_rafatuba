export interface Team {
  id: number;
  conference: string;
  division: string;
  location: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

interface TeamsResponse {
  data: Team[];
}

export async function getTeams(): Promise<Team[]> {
  const response = await fetch("https://api.balldontlie.io/nfl/v1/teams", {
    headers: {
      Authorization: import.meta.env.VITE_BALLDONTLIE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar times: ${response.status}`);
  }

  const result: TeamsResponse = await response.json();

  return result.data;
}
