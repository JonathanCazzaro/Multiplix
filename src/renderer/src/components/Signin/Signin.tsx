import React, { useState } from 'react';
import { Button, Divider, Form, Input, InputGroup } from 'rsuite';
import {
  IoPerson as AvatarIcon,
  IoLockClosed as LockIcon,
  IoEye as VisibleIcon,
  IoEyeOff as HiddenIcon
} from 'react-icons/io5';
import logoSrc from '../../assets/images/multiplix.png';
import user from '../../services/user';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useNotification } from '../../hooks/useNotification';

interface SigninProps {
  goLogIn: () => void;
}

const Signin: React.FC<SigninProps> = ({ goLogIn }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyPasswordError, setVerifyPasswordError] = useState(false);
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
      } else if (!verifyPassword || verifyPassword !== password) {
        setVerifyPasswordError(true);
        return;
      } else {
        await user.signIn({ name, password });
        notify({
          type: 'success',
          title: 'Inscription validée !',
          message: `Coucou ${name} ! Tu n'as plus qu'à te connecter !`
        });
        goLogIn();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <Form className="signin" onSubmit={handleSubmit}>
      <img src={logoSrc} alt="logo de Multiplix" className="login__logo" />
      <div className="login__content">
        <p>Formulaire d'inscription</p>
        <Divider style={{ margin: '0 0 .5rem' }} />
        <div className="login__inputs">
          <InputGroup>
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
            <Input
              name="name"
              placeholder="Ecris ton prénom ou ton surnom..."
              value={name}
              onInput={({ currentTarget: { value } }) => setName(value)}
              onFocus={() => setNameError(false)}
            />
            <Form.ErrorMessage placement="topStart" show={nameError}>
              Il faut que je sache comment tu t'appelles !
            </Form.ErrorMessage>
          </InputGroup>

          <InputGroup>
            <InputGroup.Addon>
              <LockIcon color={password ? 'green' : undefined} />
            </InputGroup.Addon>
            <Input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Choisis un mot de passe..."
              value={password}
              onInput={({ currentTarget: { value } }) => setPassword(value)}
              onFocus={() => setPasswordError(false)}
            />
            <InputGroup.Button onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <VisibleIcon /> : <HiddenIcon />}
            </InputGroup.Button>
            <Form.ErrorMessage placement="topStart" show={passwordError}>
              Il te faut un mot de passe !
            </Form.ErrorMessage>
          </InputGroup>

          <InputGroup>
            <InputGroup.Addon>
              <LockIcon color={!verifyPassword ? undefined : verifyPassword !== password ? 'red' : 'green'} />
            </InputGroup.Addon>
            <Input
              name="verifyPassword"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Et confirme-le ici !"
              value={verifyPassword}
              onInput={({ currentTarget: { value } }) => setVerifyPassword(value)}
              onFocus={() => setVerifyPasswordError(false)}
            />
            <InputGroup.Button onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <VisibleIcon /> : <HiddenIcon />}
            </InputGroup.Button>
            <Form.ErrorMessage placement="topStart" show={verifyPasswordError}>
              {verifyPassword
                ? 'Les deux mots de passe ne correspondent pas !'
                : 'Tu dois retaper ton mot de passe pour valider !'}
            </Form.ErrorMessage>
          </InputGroup>

          <Button appearance="primary" size="md" color="orange" type="submit" className="login__submit">
            Je m'inscris !
          </Button>
        </div>
        <Button className="login__signup" color="orange" appearance="link" onClick={goLogIn}>
          Tu es déjà inscrit.e ?<br />
          Clique ici pour te connecter !
        </Button>
      </div>
    </Form>
  );
};

export default Signin;
