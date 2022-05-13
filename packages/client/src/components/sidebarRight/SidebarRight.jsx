import React from 'react';
import styles from './sidebarRight.module.css';
import FollowBack from '../followBack/FollowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SidebarRight() {
  return (
    <div className="col-md-3 bg-light H-100 border  border-left-0 ">
      <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
        <div className="input-group">
          <div className="input-group-prepend">
            <button type="submit" className="btn btn-link text-dark">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <input
            type="search"
            placeholder="Recherche twitter"
            className="form-control border-0 bg-light"
          />
        </div>
      </div>
      <div className="text">
        <h1 className="fs-3">Nouveau sur Twitter ?</h1>
        <p>Inscrivez-vous pour profiter de votre propre fil personnalisé !</p>
      </div>
      <div
        className="trendingBlock bg-white text-dark fs-3 rounded"
        style={{ height: '300px' }}
      >
        <h1 className="fs-3">Tendances pour vous</h1>
      </div>
      <FollowBack />
    </div>
  );
}

export default SidebarRight;
