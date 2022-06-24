import React, { useState, useEffect } from 'react';
import Artwork from '../../components/Artwork/Artwork';
import IconButton from '../../components/common/IconButton';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import styles from './Playlist.module.css';

function Playlist({ id }) {
	const music = window.MusicKit.getInstance();
	const [playlist, setPlaylist] = useState(null);

	function playAlbum() {
		music
			.setQueue({ playlist: id })
			.then(() => music.player.play())
			.catch(console.error.bind(console));
	}

	useEffect(() => {
		music.api
			.playlist(id)
			.then(setPlaylist)
			.catch((e) => console.error(e));
	}, [id, music]);

	if (!playlist) return null;

	let {
		attributes: { name, artwork, description, curatorName },
		relationships: {
			tracks: { data: tracks },
		},
	} = playlist;

	if (description) {
		description = description.standard || description.short;
	}

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
					{description && (
						<p
							className={styles.description}
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						/>
					)}
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
