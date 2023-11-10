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
    const name_tag = localStorage.getItem('bingo-name-tag')
    console.log(name_tag)
    window.location.href = `/bingo?code=${code}&name_tag=${name_tag}`;
  };

  return (
    <div className='signin wrap'>
      <Info />
      <LogoComponent largeSize={true} />
      <BingoNameTag update={false} />
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
