import React, {Fragment, useState, useEffect } from 'react';
import { music } from '../../services/music';
import styles from './Search.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ArtistCollection from './ArtistCollection/ArtistCollection';
import AlbumCollection from '../../components/AlbumCollection/AlbumCollection';
import PlaylistCollection from '../../components/PlaylistCollection/PlaylistCollection';
import NotFound from '../../components/NotFound/NotFound';

function Search({query}) {
  const [search, setSearch] = useState(null);

  useEffect(() => {
    music.api.search(query, {limit: 16}).then(res =>{
      setSearch(res);
      console.log(res);
    }).catch(err => console.log(err));
  }, [query]);

  return search ? (
    <Fragment>
      <h1 className={styles.title}>Search</h1>
      <h2 className={styles.heading}>Artists</h2>
      {search.artists ? <ArtistCollection data={search.artists.data} /> : <NotFound />}
      <h2 className={styles.heading}>Album</h2>
      { search.albums ? <AlbumCollection data={search.albums.data} /> : <NotFound /> }
      <h2 className={styles.heading}>Playlists</h2>
      { search.playlists ? <PlaylistCollection data={search.playlists.data} /> : <NotFound /> }
    </Fragment>
  ) : (
    <LoadingSpinner />
  );
}

export default Search;