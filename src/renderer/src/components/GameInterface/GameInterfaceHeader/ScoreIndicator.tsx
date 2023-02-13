import { observer } from 'mobx-react-lite';
import { Popover, Tag, Whisper } from 'rsuite';
import { IoMdTrophy as TrophyIcon } from 'react-icons/io';
import { useEffect } from 'react';
import { User } from '../../../services/classes/userModel';
import { Game } from '../../../services/classes/gameModel';

interface ScoreIndicatorProps {
  user: User;
  game: Game;
}

const ScoreIndicator = observer(({ user, game }: ScoreIndicatorProps) => {
  useEffect(() => {
    if (user.score >= game.nextLevel) game.setNextLevel(user.score);
  }, [user.score]);

  return (
    <Whisper
      trigger="hover"
      placement="bottom"
      speaker={
        <Popover
          title={
            <div className="gameinterface__navbar__scorepopuptitle">
              <TrophyIcon style={{ transform: 'scale(1.2)' }} />
              Prochain palier à {game.nextLevel}
            </div>
          }
        >
          Encore {game.nextLevel - user.score} points !
        </Popover>
      }
    >
      <Tag size="lg" color="violet">
        Tu as <span style={{ fontWeight: 'bold' }}>{user.score}</span> points !
      </Tag>
    </Whisper>
  );
});

export default ScoreIndicator;
