import React, { useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';


const Signin = () => {

  useEffect(() => {
    if (sessionStorage.getItem('bingo')) {
      window.location.href = `/bingo`;
    }
    if (sessionStorage.getItem('game')) {
      window.location.href = `/game`;
    }
  }, []);

  const handleSpotifySignin = () => {
    window.location.href = `http://localhost:5001/auth/spotify`;
  };

  const handleBingoSignin = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    window.location.href = `/bingo?code=${code}`;
  };

  return (
    <div className='signin wrap'>
      <LogoComponent largeSize={true} />
      <form onSubmit={handleBingoSignin}>
        <input type='number' name='code' placeholder='CODE' />
        <input type='submit' value='PLAY' />
      </form>
      <div className='want-to-host'>
        <span>Want to host a game?</span>
        <button className='secondary' onClick={handleSpotifySignin}>Log in with Spotify</button>
      </div>
    </div>
  );
};

export default Signin;
