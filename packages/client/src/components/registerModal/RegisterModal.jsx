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
              className="form-control hover-border-primary"
              placeholder="username"
              {...register('username', {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            <label htmlFor="username" className="form-label">
              Nom et prénom
            </label>
            {errors.username?.type === 'required' && (
              <span>Le nom est obligatoire</span>
            )}
            {errors.username?.type === 'minLength' && (
              <span>Le nom doit contenir plus de 4 caractères</span>
            )}
            {errors.username?.type === 'maxLength' && (
              <span>Le nom doit contenir moins de 20 caractères</span>
            )}
          </div>

          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control hover-border-primary"
              placeholder="username"
              {...register('handle', {
                required: true,
                minLength: 4,
                maxLength: 20,
                pattern: /^[a-zA-Z0-9_-]{4,20}$/,
              })}
            />
            <label htmlFor="handle" className="form-label">
              Nom d'utilisateur
            </label>
            {errors.handle?.type === 'required' && (
              <span>Le nom d'utilisateur est requis</span>
            )}
            {errors.handle?.type === 'minLength' && (
              <span>
                Le nom d'utilisateur doit contenir plus de 4 caractères
              </span>
            )}
            {errors.handle?.type === 'maxLength' && (
              <span>
                Le nom d'utilisateur doit contenir moins de 20 caractères
              </span>
            )}
            {errors.handle?.type === 'pattern' && (
              <span>
                Le nom d'utilisateur ne peut contenir que des caractères
                alphanumériques, <code>_</code> et <code>-</code>.
              </span>
            )}
          </div>

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

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control hover-border-primary"
              placeholder="password"
              {...register('password', {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
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
            {errors.password?.type === 'pattern' && (
              <span>
                Le mot de passe doit contenir au minimum une lettre majuscule,
                une lettre minuscule, et un chiffre
              </span>
            )}
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control hover-border-primary"
              placeholder="password"
              {...register('passwordConfirm', {
                required: true,
                minLength: 8,
                validate: (value) => {
                  const password = getValues('password');
                  return value === password;
                },
              })}
            />
            <label htmlFor="password" className="form-label">
              Confirmation du mot de passe
            </label>
            {errors.passwordConfirm?.type === 'required' && (
              <span>La confirmation du mot de passe est requise</span>
            )}
            {errors.passwordConfirm?.type === 'validate' && (
              <span>Les mots de passe ne correspondent pas</span>
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
