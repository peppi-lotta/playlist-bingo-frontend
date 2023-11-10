import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import Info from '../../public/components/Info';

const Host = () => {

  const [playlists, setPlaylists] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchPlaylists = () => {
    fetch(import.meta.env.VITE_BASE_URL + `/api/playlists?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      credentials: "include",
      redirect: 'follow'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPlaylists(data.playlists);
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
  }, [offset]);

  return (
    <div className="host wrap">
      <Info />
      <LogoComponent largeSize={false} />
      <form onSubmit={handleSubmit}>
{/*         <select name="type">
          <option value="artist">New Artist Bingo</option>
          <option vlaue="song">New Song Bingo</option>
        </select> */}
        <div className="playlist-list">
          <p>Choose a playlist:</p>
          {playlists.map(playlist => (
            <div className='playlist' key={playlist.id}>
              <input type="radio" id={playlist.id} name="playlist" value={playlist.id} required />
              <label htmlFor={playlist.id}>{playlist.name}</label>
            </div>
          ))}
        </div>
        <div className='controls'>
          <button
            onClick={(event) => {event.preventDefault(); setOffset(offset - limit);}}
            className={`tertiary fit ${offset === 0 ? 'disabled-button' : ''}`}
            disabled={offset === 0}
          >
            Previous page
          </button>
          <button
            onClick={(event) => {event.preventDefault(); setOffset(offset + limit);}}
            className={`tertiary fit ${playlists.length < limit ? 'disabled-button' : ''}`}
            disabled={playlists.length < limit}
          >
            Next page
          </button>
        </div>
        <input type='submit' value="START" />
      </form>
    </div>
  );
};

export default Host;
