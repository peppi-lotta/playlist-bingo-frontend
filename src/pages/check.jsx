import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import Info from '../../public/components/Info';

const Check = () => {

    const current_track = sessionStorage.getItem('currentTrack')
    const game = JSON.parse(sessionStorage.getItem('game'))
    const gameCode = game.code
    const [wins, setWins] = useState(parseInt(sessionStorage.getItem('wins')))
    const [isBingo, setIsBingo] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const check = (event) => {
        event.preventDefault();
        let checkVal = event.target.bingo_code.value.trim().toLowerCase();
        checkBingo(checkVal)
    }

    const back = () => {
        window.location.href = `/game`;
    }

    const checkBingo = (bingoCode) => {
        fetch(import.meta.env.VITE_BASE_URL + `/check-bingo?current_track=${current_track}&game_code=${gameCode}&bingo_code=${bingoCode}&win=${wins}`, {
            credentials: "include",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success === true) {
                    setIsBingo(true);
                    const next = wins + 1;
                    sessionStorage.setItem('wins', next);
                } else {
                    setIsBingo(false);
                }
                setShowResult(true);
            })
            .catch((error) => {
                console.error('Error fetching game data:', error);
            });
    };


    return (
        <div className="check wrap">
            <Info />
            <button onClick={back} className='tertiary fit'>Back</button>
            <LogoComponent largeSize={false} />
            {showResult ? (
                isBingo ? (
                    <div className='answer'>
                        <p>It is</p>
                        <span className='win'>BINGO!</span>
                        <button onClick={back}>Continue game</button>
                        <ul>
                            {game.game_tracks.slice(0, current_track).map((track) => (
                                <li key={track.artist_id}>{track.artist_name}</li>
                            ))}
                        </ul>

                    </div>
                ) : (
                    <div className='answer'>
                        <p>It is not bingo.</p>
                        <button onClick={back}>Continue game</button>
                    </div>
                )
            ) : (
                <form onSubmit={check}>
                    <p>Check bingo:</p>
                    <input name='bingo_code' placeholder='BINGO CODE' required />
                    <input type='submit' value='CHECK' />
                </form>
            )}
        </div>
    );
};

export default Check;