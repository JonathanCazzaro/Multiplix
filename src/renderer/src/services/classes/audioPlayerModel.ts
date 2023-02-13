interface AudioPlayerProps {
  eventSource: Record<Multiplix.Services.AudioEvent, string>;
  backgroundSource: string[];
}

export class AudioPlayer implements Multiplix.Services.AudioPlayerModel {
  private readonly eventSource: Record<Multiplix.Services.AudioEvent, string>;
  private readonly backgroundSource: string[];
  private readonly eventPlayer = new Audio();
  private readonly backgroundPlayer = new Audio();

  constructor({ backgroundSource, eventSource }: AudioPlayerProps) {
    this.backgroundSource = backgroundSource;
    this.eventSource = eventSource;
    this.backgroundPlayer.loop = true;
    this.backgroundPlayer.volume = 0;
  }

  playEvent(event: Multiplix.Services.AudioEvent) {
    this.eventPlayer.src = this.eventSource[event];
    this.eventPlayer.currentTime = 0;
    this.eventPlayer.play();
  }

  setRandomBackgroundSource() {
    this.backgroundPlayer.src = this.backgroundSource[Math.floor(Math.random() * this.backgroundSource.length)];
    this.backgroundPlayer.currentTime = 0;
  }

  playBackground() {
    this.backgroundPlayer.play();
    const fadeInInterval = setInterval(() => {
      if (this.backgroundPlayer.volume >= 0.1) {
        clearInterval(fadeInInterval);
      } else this.backgroundPlayer.volume = +(this.backgroundPlayer.volume + 0.025).toFixed(3);
    }, 100);
  }

  stopBackground() {
    const fadeOutInterval = setInterval(() => {
      if (this.backgroundPlayer.volume === 0) {
        this.backgroundPlayer.pause();
        clearInterval(fadeOutInterval);
      } else this.backgroundPlayer.volume = +(this.backgroundPlayer.volume - 0.025).toFixed(3);
    }, 100);
  }
}
