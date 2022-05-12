import { useState } from 'react';
import styles from './auth.module.css';
import logoImg from '../../assets/img/twitter.png';
import Logo from '../../components/Logo';
import Button from 'react-bootstrap/Button';
import RegisterModal from '../../components/registerModal/RegisterModal';
import LoginModal from '../../components/loginModal/LoginModal';

function Auth() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <div className="row gx-0 min-vh-100">
      <div className="col-12 col-lg-6 order-lg-1">
        <div className="container-sm px-3 py-5 px-sm-5">
          <Logo className={styles.smallLogo} />

          <h1 className="mt-5 fw-bolder">Ça se passe maintenant</h1>
          <h2 className="mt-4 mt-lg-5 fs-3">
            Rejoignez Twitter dès aujourd'hui.
          </h2>

          <div
            className={`${styles.btnContainer} my-5 d-flex flex-column gap-4 mx-auto mx-sm-0`}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleShowRegister}
              className="w-100 rounded-pill"
            >
              Inscrivez-vous
            </Button>

            <div className="d-flex align-items-center">
              <hr className="flex-grow-1 my-0" />
              <span className="mx-4">Ou</span>
              <hr className="flex-grow-1 my-0" />
            </div>

            <Button
              variant="outline-primary"
              size="lg"
              onClick={handleShowLogin}
              className="w-100 rounded-pill"
            >
              Connectez vous
            </Button>
          </div>

          <RegisterModal show={showRegister} onClose={handleCloseRegister} />
          <LoginModal show={showLogin} onClose={handleCloseLogin} />

          <p>
            En vous inscrivant, vous acceptez les Conditions d'Utilisation et la
            Politique de Confidentialité, incluant l'Utilisation de Cookies.
          </p>
        </div>
      </div>

      <div
        className={`
          ${styles.background} col-12 col-lg-6 d-flex justify-content-center
          align-items-center
        `}
      >
        <Logo className={styles.logo} />
      </div>
    </div>
  );
}

export default Auth;
