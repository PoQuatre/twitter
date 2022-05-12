import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import Logo from '../Logo';

function LoginModal(props) {
  const { show, onClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    delete data.confirmPassword;

    fetch('#', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('You are registered');
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
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control hover-border-primary "
              placeholder="email"
              {...register('email', { required: true })}
            />
            <label for="email" className="form-label hover-text-danger">
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
            <label for="password" className="form-label">
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
