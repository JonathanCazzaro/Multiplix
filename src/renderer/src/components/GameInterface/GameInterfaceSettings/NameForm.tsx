import React from 'react';
import { Button, Form } from 'rsuite';
import { useNotification } from '../../../hooks/useNotification';
import user from '../../../services/user';
const { Control, ControlLabel, Group } = Form;

interface NameFormProps {
  name: string;
  setName: (name: string) => void;
  disabled: boolean;
}

const NameForm: React.FC<NameFormProps> = ({ name, setName, disabled }) => {
  const notify = useNotification();

  const handleModifyName = async () => {
    if (name === user.name) {
      notify({
        message: "Vérifie ce que tu as mis parce qu'on dirait que rien n'a changé 😁",
        type: 'info',
        title: 'Il y a une erreur ?',
        placement: 'bottomCenter'
      });
    } else {
      await user.setName(name);
      notify({
        message: `Voilà, maintenant tu t'appelles ${name} 👋`,
        type: 'success',
        title: "C'est tout bon !",
        placement: 'bottomCenter'
      });
    }
  };

  return (
    <Form
      fluid
      formValue={{ name }}
      onSubmit={handleModifyName}
      onChange={(form) => setName(form.name)}
      disabled={disabled}
    >
      <Group controlId="name">
        <ControlLabel>Mon nom d'utilisat.eur.rice</ControlLabel>
        <Control name="name" style={{ marginTop: '.5rem' }} />
      </Group>
      <Button type="submit" appearance="primary" color="cyan" disabled={disabled}>
        Modifier
      </Button>
    </Form>
  );
};

export default NameForm;
