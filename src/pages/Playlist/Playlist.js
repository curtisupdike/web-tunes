import React, { useState, useEffect } from 'react';
import Artwork from '../../components/Artwork/Artwork';
import IconButton from '../../components/common/IconButton';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import styles from './Playlist.module.css';
import Loading from '../../components/common/Loading';

function Playlist({ id }) {
	const music = window.MusicKit.getInstance();
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [playlist, setPlaylist] = useState(null);

	function playAlbum() {
		music
			.setQueue({ playlist: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	useEffect(() => {
		async function fetchPlaylist() {
			try {
				setIsLoading(true);
				let response;
				if (id.substring(0, 2) === 'pl') {
					response = await music.api.playlist(id);
				} else {
					response = await music.api.library.playlist(id);
				}
				setPlaylist(response);
				setIsLoading(false);
			} catch (err) {
				setHasError(true);
			}
		}

		fetchPlaylist(id);
	}, [id, music]);

	if (hasError) return <div>Sorry, we could not find the playlist.</div>;
	if (isLoading) return <Loading />;

	let {
		attributes: { name, artwork, description, curatorName },
		relationships: {
			tracks: { data: tracks },
		},
	} = playlist;

	description = description ? description.short : null;

	return (
		<div className={styles.playlist}>
			<div className={styles.about}>
				<div className={styles.left}>
					<Artwork
						className={styles.artwork}
						artwork={artwork}
						name={name}
						size="320"
					/>
				</div>
				<div className={styles.right}>
					<h1 className={styles.name}>{name}</h1>
					<h2 className={styles.curator}>{curatorName}</h2>
					{description && <p className={styles.description}>{description}</p>}
					<IconButton icon="play" className={styles.play} onClick={playAlbum}>
						Play
					</IconButton>
				</div>
			</div>
			{tracks && <PlaylistTracklist tracks={tracks} />}
			<p className={styles.footer}>{tracks && `${tracks.length} Songs`}</p>
		</div>
	);
}

export default Playlist;
