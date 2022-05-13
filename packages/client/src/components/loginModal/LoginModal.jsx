import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import Logo from '../Logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal(props) {
  const { show, onClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setGlobalError('');

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          navigate(`/profile/${res.user.handle}`);
        } else {
          setGlobalError("L'email ou le mot de passe est invalide");
        }
      })
      .catch((_err) => {
        setGlobalError(
          'Une erreur est survenue lors du traitement de votre requête',
        );
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <div className={styles.header}>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Logo className={styles.logo} />
        </Modal.Header>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column align-items-center"
      >
        <Modal.Body className="container px-5">
          {globalError && <p>{globalError}</p>}

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control hover-border-primary "
              placeholder="email"
              {...register('email', { required: true })}
            />
            <label htmlFor="email" className="form-label hover-text-danger">
              Adresse Email
            </label>
            {errors.email?.type === 'required' && (
              <span>L'adresse est requise</span>
            )}
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control hover-border-primary"
              placeholder="password"
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 25,
              })}
            />
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            {errors.password?.type === 'required' && (
              <span>Le mot de passe est requis</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span>Le mot de passe doit avoir plus de 8 caractère</span>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className={[styles.footer, 'container px-5']}>
          <Button
            type="submit"
            variant="outline-secondary"
            size="lg"
            className={[styles.button, 'rounded-pill']}
          >
            Se connecter
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default LoginModal;
