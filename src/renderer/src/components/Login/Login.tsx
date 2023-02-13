import React, { useState } from 'react';
import { Button, Divider, Form, Input, InputGroup } from 'rsuite';
import {
  IoPerson as AvatarIcon,
  IoLockClosed as LockIcon,
  IoEye as VisibleIcon,
  IoEyeOff as HiddenIcon
} from 'react-icons/io5';
import logoSrc from '../../assets/images/multiplix.png';
import { useNotification } from '../../hooks/useNotification';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import user from '../../services/user';

interface LoginProps {
  goSignIn: () => void;
  setLogged: () => void;
}

const Login: React.FC<LoginProps> = ({ goSignIn, setLogged }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleErrors = useErrorHandler();
  const notify = useNotification();

  const handleSubmit = async () => {
    try {
      if (!name) {
        setNameError(true);
        return;
      } else if (!password) {
        setPasswordError(true);
        return;
      } else {
        await user.logIn({ name, password });
        notify({
          type: 'success',
          title: 'Tu es connecté.e !',
          message: `Coucou ${name} ! Allez on joue ?`
        });
        setLogged();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <Form className="login" onSubmit={handleSubmit}>
      <img src={logoSrc} alt="logo de Multiplix" className="login__logo" />
      <div className="login__content">
        <p>Bienvenue !</p>
        <Divider style={{ margin: '0 0 .5rem' }} />
        <p>Je m'appelle Multiplix et je suis là pour t'aider à apprendre les tables de multiplication.</p>
        <p>Connecte-toi pour commencer à jouer !</p>
        <div className="login__inputs">
          <InputGroup>
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
            <Input
              name="name"
              placeholder="Ecris ton nom d'utilisat.eur.rice..."
              value={name}
              onInput={({ currentTarget: { value } }) => setName(value)}
              onFocus={() => setNameError(false)}
            />
            <Form.ErrorMessage placement="topStart" show={nameError}>
              Il faut que je sache qui tu es !
            </Form.ErrorMessage>
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>
              <LockIcon />
            </InputGroup.Addon>
            <Input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Et ton mot de passe !"
              value={password}
              onInput={({ currentTarget: { value } }) => setPassword(value)}
              onFocus={() => setPasswordError(false)}
            />
            <InputGroup.Button onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <VisibleIcon /> : <HiddenIcon />}
            </InputGroup.Button>
            <Form.ErrorMessage placement="topStart" show={passwordError}>
              Tu ne m'as pas donné ton mot de passe !
            </Form.ErrorMessage>
          </InputGroup>
          <Button appearance="primary" size="md" color="cyan" type="submit" className="login__submit">
            Je me connecte !
          </Button>
        </div>
        <Button className="login__signup" color="cyan" appearance="link" onClick={goSignIn}>
          Pas encore inscrit ? Clique ici !
        </Button>
      </div>
    </Form>
  );
};

export default Login;
