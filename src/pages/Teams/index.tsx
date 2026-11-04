import { useEffect, useState } from "react";
import {
  buscarClassificacao,
  type TimeNFL,
} from "../../services/estatisticasService";
import { Button, Card, CardContent } from "@heroui/react";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export default function Teams() {
  const [times, setTimes] = useState<TimeNFL[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function carregarClassificacao() {
      try {
        const dados = await buscarClassificacao();
        setTimes(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar a classificação.");
      } finally {
        setCarregando(false);
      }
    }

    carregarClassificacao();
  }, []);

  function exibirCampanha(time: TimeNFL) {
    if (time.empates > 0) {
      return `${time.vitorias} - ${time.derrotas} - ${time.empates}`;
    }

    return `${time.vitorias} - ${time.derrotas}`;
  }

  if (carregando) {
    return <p>Carregando times...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

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
        <h2 className="text-center text-2xl font-bold">Temporada 2026</h2>
        <div className="flex flex-col gap-3">
          {times.map((time) => (
            <Card
              key={time.id}
              className="w-full max-w-md overflow-hidden border border-accent/20 bg-linear-to-br from-accent/12 via-surface to-surface-secondary shadow-lg shadow-accent/10 dark:border-accent/30 dark:from-accent/20 dark:via-surface dark:to-accent/8 dark:shadow-accent/5"
            >
              <CardContent>
                <div className="flex items-center gap-3">
                  <img
                    src={time.logo}
                    alt={time.nome}
                    className="w-12 h-12 object-contain"
                  />

                  <div className="flex items-center gap-4 justify-center">
                    <span className="font-semibold">{time.nome}</span>

                    <span className="text-sm text-default-500">
                      {exibirCampanha(time)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
