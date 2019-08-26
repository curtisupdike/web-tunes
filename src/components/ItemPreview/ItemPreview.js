import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { music } from '../../services/music';
import styles from './ItemPreview.module.css';
import Artwork from '../Artwork/Artwork';
import PlayButton from '../PlayButton/PlayButton';

function ItemPreview({id, artwork, artworkLink, name, description, playParams, type}) {
  const [artistLink, setArtistLink] = useState(null);  
  useEffect(() => {
    if (type === 'album') {
      music.instance.api.album(id).then(res => {
        if (res.relationships.artists.data[0]) {
          setArtistLink(`/artist/${res.relationships.artists.data[0].id}`);
        }
      });
    }
  });

  return (
    <div>
      <div className={styles.item}>
        <Link to={artworkLink} className={styles.link}>
          <Artwork 
            artwork={artwork}
            name={name}
            size={160}
            className={styles.artwork}
          />
        </Link>
        <PlayButton className={styles.playButton} {...playParams} />
      </div>
      <p className={styles.name}>{name}</p>
      { artistLink ? (
          <Link to={artistLink} className={styles.artistLink}>
            <p className={styles.description}>{description}</p>
          </Link>
        ) : (
          <p className={styles.description}>{description}</p>
        )
      }
    </div>
  );
}

export default ItemPreview;