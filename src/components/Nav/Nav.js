import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import fetchAll from '../../utils/fetchAll';
import styles from './Nav.module.scss';

function Nav({ isAuthorized }) {
	const music = window.MusicKit.getInstance();
	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		async function getPlaylists() {
			const fetcher = music.api.library.playlists.bind(music.api.library);
			const data = await fetchAll(fetcher);
			setUserPlaylists(data);
		}

		if (isAuthorized) {
			getPlaylists();
		} else {
			setUserPlaylists(null);
		}
	}, [isAuthorized, music]);

	return (
		isAuthorized && (
			<nav className={styles.nav}>
				<Link to="/" className={styles.logo}>
					<Icon icon="record-vinyl" />
					<span>Webtunes</span>
				</Link>
				<NavLink to="/" className={styles.icon}>
					<Icon icon="home" />
					<span>Home</span>
				</NavLink>
				<NavLink to="/browse" className={styles.icon}>
					<Icon icon="headphones-alt" />
					<span>Browse</span>
				</NavLink>
				<div className={styles.list}>
					{/* <h2 className={styles.heading}>Your Library</h2> */}
					<NavLink to="/library/songs">Songs</NavLink>
					{/* <NavLink to="/library/albums">Albums</NavLink> */}
					{/* <NavLink to="/library/artists">Artists</NavLink> */}

					{userPlaylists && [
						<h2 className={styles.heading} key="header">
							Playlists
						</h2>,
						...userPlaylists.map((playlist) => (
							<NavLink to={`/playlist/${playlist.id}`} key={playlist.id}>
								{playlist.attributes.name}
							</NavLink>
						)),
					]}
				</div>
			</nav>
		)
	);
}

let NavLink = ({ children, ...props }) => (
	<Link className={styles.link} {...props}>
		<div>{children}</div>
	</Link>
);

export default Nav;
