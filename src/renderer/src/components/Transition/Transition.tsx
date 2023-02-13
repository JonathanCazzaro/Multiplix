import { useEffect, useRef, useState } from 'react';

const setCss = (
  element: HTMLElement,
  animations: Multiplix.Transition.Animations[],
  stage: Multiplix.Transition.Stage
) => {
  for (const animation of animations) {
    switch (animation) {
      case 'opacity':
        element.style.opacity = ['off', 'leave'].includes(stage) ? '0' : '1';
        break;
      case 'slide-to-left':
        element.style.transform = `translateX(${stage === 'off' ? '2rem' : stage === 'enter' ? '0' : '-2rem'})`;
        break;
      case 'zoom':
        element.style.transform = `scale(${['off', 'leave'].includes(stage) ? '0' : '1'})`;
    }
  }
};

const Transition = <T,>({
  components,
  state,
  initialMount = false,
  delay = 0,
  ContainerProps
}: Multiplix.Transition.Props<T>) => {
  const [mounted, setMounted] = useState(initialMount);
  const [shouldMount, setShouldMount] = useState<T>(state);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { animations, duration = 200 } = components.find(({ stateValue }) => stateValue === state)!;
    if (wrapperRef.current) {
      const { current: wrapper } = wrapperRef;
      wrapper.style.transition = `all ${duration}ms ease`;
      if (mounted) {
        setCss(wrapper, animations, 'leave');
        setTimeout(() => {
          setShouldMount(state);
          setCss(wrapper, animations, 'off');
          setTimeout(() => {
            setCss(wrapper, animations, 'enter');
          }, delay | duration);
        }, duration);
      } else {
        setCss(wrapper, animations, 'off');
        setTimeout(() => {
          setCss(wrapper, animations, 'enter');
          setMounted(true);
        }, 0);
      }
    }
  }, [state]);

  return (
    <div ref={wrapperRef} {...ContainerProps}>
      {components.find(({ stateValue }) => stateValue === shouldMount)?.content}
    </div>
  );
};

export default Transition;
