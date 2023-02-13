/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Multiplix.Transition {
  type Stage = 'off' | 'enter' | 'leave';

  type Animations = 'opacity' | 'slide-to-left' | 'zoom';

  interface Component<T> {
    stateValue: T;
    content: React.ReactNode;
    animations: Animations[];
    duration?: number;
  }

  interface Props<T> {
    state: T;
    components: Component<T>[];
    initialMount?: boolean;
    delay?: number;
    ContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  }
}
