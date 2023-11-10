import React, { useEffect, useState } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import Info from '../../public/components/Info';
import BingoNameTag from '../../public/components/BingoNameTag';

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
    window.location.href = import.meta.env.VITE_BASE_URL + `/auth/spotify`;
  };

  const handleBingoSignin = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    window.location.href = `/bingo?code=${code}`;
  };

  return (
    <div className='signin wrap'>
      <Info />
      <LogoComponent largeSize={true} />
      <BingoNameTag update={false} />
      <form onSubmit={handleBingoSignin}>
        <input type='number' name='code' placeholder='CODE' required/>
        <input type='submit' value='JOIN BINGO' />
      </form>
      <div className='want-to-host'>
        <span>Want to host a game?</span>
        <button className='secondary' onClick={handleSpotifySignin}>Log in with Spotify</button>
      </div>
    </div>
  );
};

export default Signin;
