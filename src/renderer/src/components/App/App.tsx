import { useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import GameInterface from '../GameInterface/GameInterface';
import Login from '../Login/Login';
import Signin from '../Signin/Signin';
import Transition from '../Transition/Transition';

const App: React.FC = () => {
  const [mode, setMode] = useState<Multiplix.Mode>('login');
  const notify = useNotification();

  const handleLogOut = () => {
    setMode('login');
    notify({ type: 'info', title: 'Tu es bien déconnecté.e', message: 'A bientôt !' });
  };

  return (
    <Transition<Multiplix.Mode>
      ContainerProps={{ className: 'app-transitionner' }}
      state={mode}
      components={[
        {
          stateValue: 'login',
          animations: ['opacity', 'slide-to-left'],
          duration: 300,
          content: <Login goSignIn={() => setMode('signin')} setLogged={() => setMode('logged')} />
        },
        {
          stateValue: 'signin',
          animations: ['opacity', 'slide-to-left'],
          duration: 300,
          content: <Signin goLogIn={() => setMode('login')} />
        },
        {
          stateValue: 'logged',
          animations: ['opacity'],
          duration: 300,
          content: <GameInterface logOut={handleLogOut} />
        }
      ]}
    />
  );
};

export default App;
