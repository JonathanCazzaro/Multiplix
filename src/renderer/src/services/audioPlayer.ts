import { AudioPlayer } from './classes/audioPlayerModel';

import BackgroundMusic_1 from '../assets/sounds/background-1.mp3';
import BackgroundMusic_2 from '../assets/sounds/background-2.mp3';
import BackgroundMusic_3 from '../assets/sounds/background-3.mp3';
import BackgroundMusic_4 from '../assets/sounds/background-4.mp3';
import BackgroundMusic_5 from '../assets/sounds/background-5.mp3';
import BackgroundMusic_6 from '../assets/sounds/background-6.mp3';

import SuccessSound from '../assets/sounds/success.mp3';
import FailSound from '../assets/sounds/fail.mp3';
import TimesUpSound from '../assets/sounds/timesup.mp3';
import EndSerieSound from '../assets/sounds/serie-end.mp3';

const audioPlayer = new AudioPlayer({
  backgroundSource: [
    BackgroundMusic_1,
    BackgroundMusic_2,
    BackgroundMusic_3,
    BackgroundMusic_4,
    BackgroundMusic_5,
    BackgroundMusic_6
  ],
  eventSource: {
    success: SuccessSound,
    fail: FailSound,
    timesup: TimesUpSound,
    endserie: EndSerieSound
  }
});

export default audioPlayer;
