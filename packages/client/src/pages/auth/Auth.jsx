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
    <div className="twoRow d-flex">
      <div className={styles.asideRow}>
        <Logo />
      </div>

      <div className="Row">
        <div>
          <img src={logoImg} alt="logo twitter" className={styles.logo} />
          <h1>Ça se passe maintenant</h1>
          <h2>Rejoignez Twitter dès aujourd'hui.</h2>
        </div>

        <div className="form">
          <Button variant="primary" onClick={handleShowRegister}>
            Inscrivez-vous
          </Button>

          <p>Ou</p>

          <Button variant="outline-primary" onClick={handleShowLogin}>
            Connectez vous
          </Button>

          <RegisterModal show={showRegister} onClose={handleCloseRegister} />
          <LoginModal show={showLogin} onClose={handleCloseLogin} />
        </div>

        <div className="quote">
          <p>
            En vous inscrivant, vous acceptez les Conditions d'Utilisation et la
            Politique de Confidentialité, incluant l'Utilisation de Cookies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
