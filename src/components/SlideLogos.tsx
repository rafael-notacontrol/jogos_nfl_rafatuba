import { useEffect, useState } from "react";
import {
  buscarClassificacao,
  type TimeNFL,
} from "../services/estatisticasService";

export default function SlideLogos() {
  const [times, setTimes] = useState<TimeNFL[]>([]);

  useEffect(() => {
    async function carregarTimes() {
      try {
        const dados = await buscarClassificacao();
        setTimes(dados);
      } catch (error) {
        console.error(error);
      }
    }

    carregarTimes();
  }, []);

  return (
    <div className="w-full overflow-hidden my-8">
      <div className="marquee-track">
        <div className="marquee-group">
          {times.map((time) => (
            <img
              key={time.id}
              src={time.logo}
              alt={time.nome}
              className="w-18 h-18 object-contain shrink-0"
            />
          ))}
        </div>

        <div className="marquee-group" aria-hidden="true">
          {times.map((time) => (
            <img
              key={time.id}
              src={time.logo}
              alt=""
              className="w-16 h-16 object-contain shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
