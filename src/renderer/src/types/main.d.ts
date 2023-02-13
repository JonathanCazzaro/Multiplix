/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Multiplix {
  type Mode = 'login' | 'signin' | 'logged';

  type Page = 'home' | 'rewards' | 'game' | 'revising';

  type PlayState = 'start' | 'ongoing' | 'finished';

  type Notification = {
    type: 'error' | 'success' | 'info' | 'warning';
    title: string;
    message?: string;
    placement?: 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';
    closable?: boolean;
  };

  type CommentType = 'instructions' | 'correct-answer' | 'wrong-answer' | 'times-up' | 'waiting';

  type RewardPicture = {
    id: number;
    src: string;
    thumbnail: string;
  };
}
