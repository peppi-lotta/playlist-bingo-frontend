import React from 'react';

function GameLoading() {

    const endGame = () => {
        sessionStorage.removeItem('game');
        sessionStorage.removeItem('currentTrack');
        sessionStorage.removeItem('wins');
        window.location.href = `.`;
    }
    return (
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
    );

}

export default GameLoading;
