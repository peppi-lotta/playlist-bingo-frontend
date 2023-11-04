import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';

const Host = () => {

  const [playlists, setPlaylists] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 7

  const handleButtonClick = (event) => {
    event.preventDefault()
    setOffset(offset + limit);
  };

  const fetchPlaylists = () => {
    fetch(`http://localhost:5001/api/playlists?offset=${offset}&limit=${limit}`, {
      credentials: "include",
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
    const type = event.target.type.value;
    const playlist_id = event.target.playlist.value;
    window.location.href = `/game?type=${type}&playlist_id=${playlist_id}`;
  }

  useEffect(() => {
    fetchPlaylists();
  }, [offset]);

  return (
    <div className="host wrap">
      <LogoComponent largeSize={false} />
      <form onSubmit={handleSubmit}>
        <select name="type">
          <option value="artist">New Artist Bingo</option>
          <option vlaue="song">New Song Bingo</option>
        </select>
        <div className="playlist-list">
          <p>Choose a playlist:</p>
          {playlists.map(playlist => (
            <div className='playlist' key={playlist.id}>
              <input type="radio" id={playlist.id} name="playlist" value={playlist.id} />
              <label htmlFor={playlist.id}>{playlist.name}</label>
            </div>
          ))}
          {playlists.length == offset + limit && (
            <button className="tertiary" onClick={handleButtonClick}>Load more</button>
          )}
        </div>
        <input type='submit' value="START" />
      </form>
    </div>
  );
};

export default Host;
