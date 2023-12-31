import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import AudioPlayer from '../../public/components/AudioPlayer';
import Info from '../../public/components/Info';
import GameLoading from '../../public/components/GameLoading';

const Game = () => {

    const [game, setGame] = useState()
    const [currentTrack, setCurrentTrack] = useState(0)
    const [lookingForWin, setLookingForWin] = useState(1)

    const lookingFor = {
        1: 'Looking for 5 anywhere',
        2: 'Looking for one row',
        3: 'Looking for 2 rows anywhere',
        4: 'Looking for full bingo'
    }

    const endGame = () => {
        sessionStorage.removeItem('game');
        sessionStorage.removeItem('currentTrack');
        sessionStorage.removeItem('wins');
        window.location.href = `.`;
    }

    const changeTrack = (val) => {
        if (currentTrack < 30) {
            const cur = currentTrack + val
            setCurrentTrack(cur)
            sessionStorage.setItem('currentTrack', cur);
        }
    }

    const check = () => {
        window.location.href = `/check?game_code=${game.code}`;
    }

    const changeTrackFromChild = (data) => {
        if (currentTrack < 29) {
            if (data === true) {
                setTimeout(() => {
                    changeTrack(1)
                }, 2000);
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('game')) {
            setGame(JSON.parse(sessionStorage.getItem('game')))
        } else {
            window.location.href = '/'
        }
        if (sessionStorage.getItem('currentTrack')) {
            setCurrentTrack(parseInt(sessionStorage.getItem('currentTrack')))
        }
        if (parseInt(sessionStorage.getItem('wins'))) {
            setLookingForWin(parseInt(sessionStorage.getItem('wins')))
        } else {
            sessionStorage.setItem('wins', 1)
        }
    }, []);

    return (
        <div className="game wrap">
            <Info />
            <LogoComponent largeSize={false} />
            {(typeof game !== "undefined") && game.game_tracks ? (
                <>
                    <span className='code'>{game.code}</span>
                    <span className='track-count'>{currentTrack + 1} / 30</span>
                    <AudioPlayer game={game} currentTrack={currentTrack} lookingFor={lookingFor[lookingForWin]} sendInfoToParent={changeTrackFromChild} />
                    <div className='controls'>
                        <button
                            onClick={() => changeTrack(-1)}
                            className={`secondary fit ${currentTrack === 0 ? 'disabled-button' : ''}`}
                            disabled={currentTrack === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => changeTrack(1)}
                            className={`secondary fit ${currentTrack === 29 ? 'disabled-button' : ''}`}
                            disabled={currentTrack === 29}
                        >
                            Next
                        </button>
                    </div>
                    <div className='controls'>
                        <button
                            onClick={endGame}
                            className='tertiary fit'
                        >
                            End game
                        </button>
                        <button
                            onClick={check}
                            className='fit'
                        >
                            BINGO
                        </button>
                    </div>
                </>
            ) : (
                <GameLoading />
            )}
        </div>
    );
};

export default Game;
