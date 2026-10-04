import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const audioContext = Tone.getContext().rawContext as AudioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      // Connect master output to analyser
      const destination = audioContext.destination as any;
      if (destination.numberOfInputs > 0) {
        try {
          destination.connect(analyser);
        } catch (e) {
          // Already connected
        }
      }

      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas with gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(2, 2, 5, 0.9)');
        gradient.addColorStop(1, 'rgba(20, 5, 30, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw frequency bars with glow
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height;

          // Glow effect
          ctx.shadowColor = '#33ccff';
          ctx.shadowBlur = 8;
          ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      };

      draw();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } catch (e) {
      console.error('Visualizer error:', e);
    }
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-xs text-white/60 font-semibold">LIVE SPECTRUM</label>
      <canvas
        ref={canvasRef}
        width={256}
        height={80}
        className="w-full bg-black/30 border border-cyan-500/20 rounded-lg"
      />
    </div>
  );
}
