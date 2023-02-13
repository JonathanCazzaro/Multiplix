import { UserAlreadyExistsError, WrongCredentialsError } from '../errors';
import { useNotification } from './useNotification';

export const useErrorHandler = () => {
  const notify = useNotification();

  const handler = (error: unknown) => {
    switch (true) {
      case error instanceof UserAlreadyExistsError:
        notify({
          type: 'error',
          title: 'Oups !',
          message: 'Ce nom est déjà pris par une autre utilisateur !'
        });
        break;
      case error instanceof WrongCredentialsError:
        notify({
          type: 'error',
          title: 'Oups !',
          message: "Le nom d'utilisateur et/ou le mot de passe ne sont pas corrects."
        });
        break;
      default:
        break;
    }
  };
  return handler;
};
