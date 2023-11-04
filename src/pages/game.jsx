import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import { useLocation } from 'react-router-dom';

const Game = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const playlist_id = queryParams.get('playlist_id');
    const type = queryParams.get('type');

    const [game, setGame] = useState()
    const [currentTrack, setCurrentTrack] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [trackVisible, setTrackVisible] = useState(false);
    const revealTrack = 19;
    const [artistVisible, setArtistVisible] = useState(false);
    const revealArtist = 24;
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
        setArtistVisible(false)
        setTrackVisible(false)
        setSeconds(0)
    }

    const check = () => {
        window.location.href = `/check?game_code=${game.code}`;
    }

    const fetchGame = () => {
        fetch(import.meta.env.VITE_BASE_URL + `/api/start-game?type=${type}&playlist_id=${playlist_id}`, {
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
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        if (seconds === revealTrack) {
            setTrackVisible(true);
        }

        if (seconds === revealArtist) {
            setArtistVisible(true)
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval);
        }
    }, [seconds]);

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
        }else {
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
                    <span className='currently-playing'>Currently playing:</span>
                    <div className="info">
                        {trackVisible && (
                            <span className='track-name'>{game.game_tracks[currentTrack]?.track_name}</span>
                        )}
                        {artistVisible && (
                            <span className='artist'>{game.game_tracks[currentTrack]?.artist_name}</span>
                        )}
                        <iframe className="preview" title="Embedded Content" src={game.game_tracks[currentTrack]?.track_preview_url} />
                        <p className='looking-for'>{lookingFor[lookingForWin]}</p>
                    </div>
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
                            disabled={currentTrack === 30}
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
                    <p>Game not loading? Try to start again</p>
                    <button
                        onClick={endGame}
                    >
                        Start new game
                    </button>
                </>
            )}
        </div>
    );
};

export default Game;
