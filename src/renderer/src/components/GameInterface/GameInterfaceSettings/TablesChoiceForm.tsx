import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxGroup } from 'rsuite';
import { ValueType } from 'rsuite/esm/Checkbox';
import { useNotification } from '../../../hooks/useNotification';
import game from '../../../services/game';

interface TablesChoiceFormProps {
  user: Multiplix.Services.UserModel;
  disabled: boolean;
}

const TablesChoiceForm = observer(({ user, disabled }: TablesChoiceFormProps) => {
  const maxTable = game.maxTable;
  const notify = useNotification();

  const handleModifyTables = async (value: ValueType[]) => {
    if (value.length >= 3) await user.setChosenTables(value as number[]);
    else
      notify({
        type: 'info',
        title: 'Trois tables minimum !',
        message: 'Oui, je te vois venir, tu veux jouer que avec les table de 1 ?',
        placement: 'bottomCenter'
      });
  };

  return (
    <>
      <label>Je veux des questions sur la...</label>
      <CheckboxGroup
        name="chosenTables"
        value={user.chosenTables}
        onChange={handleModifyTables}
        style={{ marginTop: '.5rem' }}
        disabled={disabled}
      >
        {Array.from({ length: maxTable }, (_, index) => index + 1).map((numeral) => (
          <Checkbox key={`table-${numeral}`} checked={true} value={numeral}>
            Table de {numeral}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
});

export default TablesChoiceForm;
