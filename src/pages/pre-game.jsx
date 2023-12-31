import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import { useLocation } from 'react-router-dom';
import Info from '../../public/components/Info';
import QRCode from "react-qr-code";
import GameLoading from '../../public/components/GameLoading';

const PreGame = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const playlist_id = queryParams.get('playlist_id');
    const [game, setGame] = useState(null);

    const start = () => {
        window.location.href = '/game';
    }

    const fetchGame = () => {
        fetch(import.meta.env.VITE_BASE_URL + `/api/start-game?playlist_id=${playlist_id}`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                setGame(data);
                sessionStorage.setItem('game', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
            });
    }

    useEffect(() => {
        if (sessionStorage.getItem('game')) {
            setGame(JSON.parse(sessionStorage.getItem('game')))
        } else {
            fetchGame();
        }
    }, []);

    return (
        <div className='pre-game wrap'>
            <Info />
            <LogoComponent largeSize={true} />
            {game?.code ? (
                <>
                    <p>Game code:</p>
                    <span className='code'>{game.code}</span>
                    <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode className="qr" value={import.meta.env.VITE_FRONT_URL + `/bingo?code=${game.code}`} />
                    </div>
                    <div className='options'>
                        <p>Everybody ready? Let's play!</p>
                        <button className='fit' onClick={start}>PLAY</button>
                    </div>

                </>
            ) : (
                <>
                    <GameLoading />
                </>
            )}
        </div>
    );
};

export default PreGame;
