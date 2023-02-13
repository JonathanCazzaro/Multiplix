import { useToaster, Notification } from 'rsuite';

export const useNotification = () => {
  const toaster = useToaster();

  return ({ message, title, type, closable = true, placement = 'bottomEnd' }: Multiplix.Notification) => {
    toaster.push(
      <Notification closable={closable} type={type} header={title} duration={5000}>
        {message}
      </Notification>,
      { placement }
    );
  };
};
