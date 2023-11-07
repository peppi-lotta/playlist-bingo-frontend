import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import { useLocation } from 'react-router-dom';
import AudioPlayer from '../../public/components/AudioPlayer';

const Game = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const playlist_id = queryParams.get('playlist_id');

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
        const cur = currentTrack + val
        setCurrentTrack(cur)
        sessionStorage.setItem('currentTrack', cur);
    }

    const check = () => {
        window.location.href = `/check?game_code=${game.code}`;
    }

    const fetchGame = () => {
        fetch(import.meta.env.VITE_BASE_URL + `/api/start-game?playlist_id=${playlist_id}`, {
            credentials: "include",
        }).then(response => {
            return response.json();
        }).then(data => {
            setGame(data);
            sessionStorage.setItem('game', JSON.stringify(data));
        }).catch(error => {
            console.error('Error fetching game data:', error);
        });
    }

    useEffect(() => {
        if (sessionStorage.getItem('game')) {
            setGame(JSON.parse(sessionStorage.getItem('game')))
        } else {
            fetchGame();
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
            <LogoComponent largeSize={false} />
            {game && game.game_tracks ? (
                <>
                    <span className='code'>{game.code}</span>
                    <span className='track-count'>{currentTrack + 1} / 30</span>
                    <AudioPlayer game={game} currentTrack={currentTrack} lookingFor={lookingFor[lookingForWin]} />
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
                            className={`secondary fit ${currentTrack === 30 ? 'disabled-button' : ''}`}
                            disabled={currentTrack === 29}
                        >
                            Next
                        </button>
                    </div>
                    <div className='controls game-options'>
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
                <>
                    <p>Loading game data...</p>
                    <div className='bottom'>
                        <p>Game not loading? Try to start again</p>
                        <button
                            onClick={endGame}
                        >
                            Start new game
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;
