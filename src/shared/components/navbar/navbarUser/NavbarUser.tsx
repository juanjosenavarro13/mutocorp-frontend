import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonsFooterModal } from '../..';
import { http_Logout } from '../../../../api';
import { UserStateContext } from '../../../../context/user';
import Modal from '../../modal/Modal';
import { useTranslation } from 'react-i18next';
import { LocalStorageService } from '../../../services';

export default function NavbarUser() {
  const [showModal, setShowModal] = useState(false);

  const userContext = useContext(UserStateContext);

  const navigate = useNavigate();

  const [t] = useTranslation('navbar', { keyPrefix: 'navbar' });

  return (
    <div className="flex gap-2">
      <Link to="/profile">
        <Button label={t('button.profile')} type="button" />
      </Link>
      <Button
        label={t('button.exit')}
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      />
      <Modal
        modalTitle={t('modalLogout.title')}
        show={showModal}
        footer={
          <ButtonsFooterModal
            onCancel={() => {
              setShowModal(false);
            }}
            onExit={() => {
              http_Logout().finally(() => {
                LocalStorageService.Instance.delete('token');
                setShowModal(false);
                userContext.setUser({
                  name: '',
                  email: '',
                  created_at: new Date(),
                  updated_at: new Date(),
                  refreshToken: '',
                  role: '',
                  auth: false,
                });
                navigate('/');
              });
            }}
          />
        }
        onCloseModal={() => {
          setShowModal(false);
        }}
      >
        {t('modalLogout.body')}
      </Modal>
    </div>
  );
}
