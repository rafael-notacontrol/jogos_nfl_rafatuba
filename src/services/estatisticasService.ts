const API_URL =
  "https://site.api.espn.com/apis/v2/sports/football/nfl/standings";

interface Estatistica {
  name: string;
  displayValue: string;
}

interface EntradaTime {
  team: {
    id: string;
    displayName: string;
    abbreviation: string;
    logos: {
      href: string;
    }[];
  };
  stats: Estatistica[];
}

interface Conferencia {
  name: string;
  abbreviation: string;
  standings: {
    entries: EntradaTime[];
  };
}

interface RespostaAPI {
  children: Conferencia[];
}

export interface TimeNFL {
  id: string;
  nome: string;
  sigla: string;
  logo: string;
  vitorias: number;
  derrotas: number;
  empates: number;
}

export async function buscarClassificacao(): Promise<TimeNFL[]> {
  const resposta = await fetch(`${API_URL}?season=2026`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar classificação da NFL.");
  }

  const dados: RespostaAPI = await resposta.json();

  return dados.children.flatMap((conferencia) =>
    conferencia.standings.entries.map((entrada) => {
      const obterEstatistica = (nome: string): number => {
        const estatistica = entrada.stats.find((item) => item.name === nome);

        return Number(estatistica?.displayValue ?? 0);
      };

      return {
        id: entrada.team.id,
        nome: entrada.team.displayName,
        sigla: entrada.team.abbreviation,
        logo: entrada.team.logos[0]?.href ?? "",
        vitorias: obterEstatistica("wins"),
        derrotas: obterEstatistica("losses"),
        empates: obterEstatistica("ties"),
      };
    }),
  );
}
