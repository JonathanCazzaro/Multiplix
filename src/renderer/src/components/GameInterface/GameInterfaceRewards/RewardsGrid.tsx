import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { IconButton, Modal } from 'rsuite';
import { User } from '../../../services/classes/userModel';
import Reward from './Reward';
import { IoClose as CloseIcon } from 'react-icons/io5';

interface RewardsGridProps {
  user: User;
  images: Multiplix.RewardPicture[];
}

const RewardsGrid = observer(({ images, user }: RewardsGridProps) => {
  const [displayedRewardSrc, setDisplayedRewardSrc] = useState<string>();
  const [isRewardDisplayed, setIsRewardDisplayed] = useState(false);

  const displayReward = (src: string) => {
    setDisplayedRewardSrc(src);
    setIsRewardDisplayed(true);
  };

  const handleHideReward = () => setIsRewardDisplayed(false);

  return (
    <>
      <ul className="gameinterface__rewards__grid">
        {images.map((image) => (
          <Reward
            key={`reward-${image.id}`}
            {...image}
            userHasReward={user.rewards.find((reward) => reward.id === image.id)}
            displayReward={displayReward}
          />
        ))}
      </ul>
      <Modal
        size="md"
        open={isRewardDisplayed}
        onClose={handleHideReward}
        style={{ display: 'flex', margin: 0, alignItems: 'center', justifyContent: 'center' }}
      >
        <IconButton
          icon={<CloseIcon style={{ fontSize: '1.75rem' }} />}
          circle
          style={{ position: 'absolute', top: '-1.25rem', right: '-1.25rem', zIndex: 20, backgroundColor: 'white' }}
          size="lg"
          onClick={handleHideReward}
        />
        <img
          src={displayedRewardSrc}
          alt="image plein format"
          style={{ width: '100%', zIndex: 2000, position: 'relative', borderRadius: '.5rem' }}
        />
      </Modal>
    </>
  );
});

export default RewardsGrid;
