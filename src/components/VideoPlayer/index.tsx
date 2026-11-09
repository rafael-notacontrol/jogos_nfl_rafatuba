import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function enterFullscreen() {
      try {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }

        // Tenta mudar a orientação para horizontal.
        if (screen.orientation?.lock) {
          await screen.orientation.lock("landscape");
        }

        // Inicia a reprodução.
        await videoRef.current?.play();
      } catch (error) {
        console.log("Não foi possível ativar algum recurso:", error);
      }
    }

    enterFullscreen();

    return () => {
      if (screen.orientation?.unlock) {
        screen.orientation.unlock();
      }
    };
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement) {
        onClose();
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        playsInline
        className="h-full w-full object-contain"
      />
    </div>
  );
}
