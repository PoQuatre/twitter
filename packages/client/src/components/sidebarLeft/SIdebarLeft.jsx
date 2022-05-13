import React from 'react';
import styles from './sidebarLeft.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';

function SidebarLeft() {
  return (
    <Col md={3}>
      <Navbar
        bg="light"
        variant="light"
        className="flex-column align-items-end border "
        style={{ height: '100vh' }}
      >
        <div className={styles.navWidth}>
          <Logo className={styles.logo} />
          <Nav className="me-auto Nav">
            <div className="d-flex flex-column align-items-center">
              <Nav.Link
                className="d-flex gap-3 align-items-center"
                href="#home"
              >
                <FontAwesomeIcon icon={faHouseChimney} />
                Home
              </Nav.Link>
              <Nav.Link className="d-flex gap-3 align-items-center" href="#">
                <FontAwesomeIcon icon={faUser} />
                Profile
              </Nav.Link>
              <Nav.Link className="d-flex gap-3 align-items-center" href="#">
                <FontAwesomeIcon icon={faFeather} />
                tweet
              </Nav.Link>
            </div>
          </Nav>
        </div>
      </Navbar>
    </Col>
  );
}

export default SidebarLeft;
