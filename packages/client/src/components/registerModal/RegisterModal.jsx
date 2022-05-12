import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Logo from '../Logo';
import styles from './register.module.css';
import { useForm } from 'react-hook-form';

function RegisterModal(props) {
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
              type="text"
              class="form-control hover-border-primary"
              placeholder="username"
              {...register('username', {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            <label for="username" class="form-label">
              Nom et prénom
            </label>
            {errors.username?.type === 'required' && (
              <span>Le nom est obligatoire</span>
            )}
            {errors.username?.type === 'minLength' && (
              <span>Le nom doit contenir plus de 4 caractère </span>
            )}
            {errors.username?.type === 'maxLength' && (
              <span>Le nom doit contenir moins de 10 caractère </span>
            )}
          </div>

          <div class="form-floating mb-4">
            <input
              type="email"
              class="form-control hover-border-primary "
              placeholder="email"
              {...register('email', { required: true })}
            />
            <label for="email" class="form-label hover-text-danger">
              Adresse Email
            </label>
            {errors.email?.type === 'required' && (
              <span>L'adresse est requise</span>
            )}
          </div>

          <div class="form-floating mb-4">
            <input
              type="password"
              class="form-control hover-border-primary"
              placeholder="password"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            <label for="password" class="form-label">
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
            S'inscrire
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default RegisterModal;
