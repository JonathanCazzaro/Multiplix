import React from 'react';
import user from '../../../services/user';

interface RewardProps extends Multiplix.RewardPicture {
  userHasReward?: Multiplix.Services.Reward;
  displayReward: (src: string) => void;
}

const Reward: React.FC<RewardProps> = ({ id, src, thumbnail, userHasReward, displayReward }) => {
  const handleClickReward = async () => {
    if (userHasReward?.isNew) await user.updateRewardState(id);
    displayReward(src);
  };

  return (
    <li className="gameinterface__rewards__item">
      {userHasReward ? (
        <a href="#" onClick={handleClickReward}>
          <div className={(userHasReward.isNew && 'new-reward') || undefined}>
            <img src={thumbnail} alt="miniature d'une image" />
          </div>
        </a>
      ) : (
        <div className="gameinterface__rewards__item__undiscovered">?</div>
      )}
    </li>
  );
};

export default Reward;
