import React, { useState, useEffect, useRef} from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import Info from '../../public/components/Info';
import GameLoading from '../../public/components/GameLoading';

const Host = () => {

  const [playlists, setPlaylists] = useState([])
  const observerTarget = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchPlaylists = async () => {
    await fetch(import.meta.env.VITE_BASE_URL + `/api/playlists?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      credentials: "include",
      redirect: 'follow'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPlaylists(prevPlaylists => [...prevPlaylists, ...data.playlists]);
        setOffset(prevOffset => prevOffset + limit);
        setHasMore(data.playlists.length == limit)
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    /* const type = event.target.type.value; */
    const playlist_id = event.target.playlist.value;
    window.location.href = `/pre-game?playlist_id=${playlist_id}`;
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPlaylists();
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [offset]);

  return (
    <div className="host wrap">
      <Info />
      <LogoComponent largeSize={false} />
      {(typeof playlists !== "undefined") && playlists.length > 0 ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="playlist-list">
              <p>Choose a playlist:</p>
              {playlists.map(playlist => (
                <div className='playlist' key={playlist.id}>
                  <input type="radio" id={playlist.id} name="playlist" value={playlist.id} required />
                  <label htmlFor={playlist.id}>{playlist.name}</label>
                </div>
              ))}
            </div>
            {hasMore && <><p>Loading more playlists</p><div ref={observerTarget} /></> }
            <input type='submit' value="START" />
          </form>
        </>
      ) : (
        <GameLoading />
      )}
    </div>
  );
};

export default Host;
