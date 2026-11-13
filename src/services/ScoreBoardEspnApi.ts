const API_URL =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

export interface Team {
  id: string;
  name: string;
  displayName: string;
  abbreviation: string;
  logo: string;
}

export interface Highlight {
  id: number;
  headline: string;
  links?: {
    source?: {
      href: string;
    };
  };
}

export interface Competitor {
  id: string;
  homeAway: string;
  score: string;
  team: Team;
  records?: {
    name: string;
    abbreviation?: string;
    type: string;
    summary: string;
  }[];
}

export interface Competition {
  id: string;
  date: string;
  venue: {
    fullName: string;
  };
  competitors: Competitor[];
  status: {
    type: {
      state: string;
      completed: boolean;
    };
  };
  highlights?: Highlight[];
}

export interface Event {
  id: string;
  date: string;
  competitions: Competition[];
}

export interface ScoreBoardResponse {
  leagues: {
    season: {
      year: number;
    };
  }[];
  week: {
    number: number;
    teamsOnBye: Team[];
  };
  events: Event[];
}

export async function ScoreBoardEspnApi(): Promise<ScoreBoardResponse> {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar dados da ESPN");
  }

  return await resposta.json();
}
