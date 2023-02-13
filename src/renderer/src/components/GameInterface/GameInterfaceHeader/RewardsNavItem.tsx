import { Nav } from 'rsuite';
import { IoTrophy as RewardIcon } from 'react-icons/io5';
import { observer } from 'mobx-react-lite';
import { User } from '../../../services/classes/userModel';

interface RewardsNavItemProps {
  user: User;
}

const RewardsNavItem = observer(({ user }: RewardsNavItemProps) => {
  return (
    <Nav.Item
      eventKey="rewards"
      icon={<RewardIcon />}
      style={{ position: 'relative' }}
      className={user.rewards.find(({ isNew }) => isNew) ? 'has-new-rewards' : undefined}
    >
      Mes récompenses
    </Nav.Item>
  );
});

export default RewardsNavItem;
