import React, { useEffect, useState } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import Info from '../../public/components/Info';

const Signin = () => {
  const storedBingoNameTag = localStorage.getItem('bingo-name-tag');
  const [bingoNameTag, setBingoNameTag] = useState(storedBingoNameTag ? storedBingoNameTag : 'guest');
  const [editName, setEditName] = useState(false);

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
    window.location.href = `/bingo?code=${code}&name_tag=${bingoNameTag}`;
  };

  const changeName = () => {
    setEditName(true);
    const edit = document.querySelector("#edit");
    edit.style.display = 'flex';
    edit.focus();
  };

  const setNameToLocalStorage = (event) => {
    let value = event.target.value.trim().toLowerCase()
    if (value == '') {
      value = 'guest'
      localStorage.removeItem('bingo-name-tag');
    }else {
      localStorage.setItem('bingo-name-tag', value);
    }
    setEditName(false);
    setBingoNameTag(value);
    const edit = document.querySelector("#edit");
    edit.style.display = 'none';
  };

  return (
    <div className='signin wrap'>
      <Info />
      <LogoComponent largeSize={true} />
      <div className={`name ${!editName ? 'active' : ''}`}>
        <span>{bingoNameTag}</span>
        <img
          onClick={changeName}
          className='icon'
          src="../pen.svg"
          alt=""
          style={{ width: '25px', height: '25px' }}
        />
      </div>
      <input
        id='edit'
        className={`change-name ${editName ? 'active' : ''}`}
        onBlur={setNameToLocalStorage}
        onChange={(event) => {setBingoNameTag(event.target.value)}}
        value={bingoNameTag}
        maxlength="50"
      />
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
