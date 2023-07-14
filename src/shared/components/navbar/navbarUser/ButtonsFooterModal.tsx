import { useTranslation } from 'react-i18next';
import { Button } from '../..';

type Props = {
  onCancel: () => void;
  onExit: () => void;
};

export default function ButtonsFooterModal(props: Props) {
  const { onCancel, onExit } = props;
  const [t] = useTranslation('navbar', { keyPrefix: 'navbar' });
  return (
    <div className="flex gap-2 ">
      <div>
        <Button label={t('button.cancel')} type="button" onClick={onCancel} />
      </div>
      <div>
        <Button label={t('button.exit')} type="button" onClick={onExit} />
      </div>
    </div>
  );
}
