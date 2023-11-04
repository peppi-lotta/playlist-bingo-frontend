import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import { useLocation } from 'react-router-dom';

const Bingo = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    const [bingo, setBingo] = useState()
    const [selectedTracks, setSelectedTracks] = useState([]);

    const endGame = () => {
        sessionStorage.removeItem('bingo');
        sessionStorage.removeItem('selectedTracks');
        window.location.href = `.`;
    }

    const toggleTrack = (artistId) => {
        if (selectedTracks.includes(artistId)) {
            const updatedTracks = selectedTracks.filter((id) => id !== artistId);
            setSelectedTracks(updatedTracks);
            sessionStorage.setItem('selectedTracks', JSON.stringify(updatedTracks));
        } else {
            const updatedTracks = [...selectedTracks, artistId];
            setSelectedTracks(updatedTracks);
            sessionStorage.setItem('selectedTracks', JSON.stringify(updatedTracks));
        }
    };

    const fetchBingo = () => {
        fetch(import.meta.env.VITE_BASE_URL + `/auth/bingo?code=${code}`, {
            credentials: "include",
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setBingo(data);
                sessionStorage.setItem('bingo', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching bingo data:', error);
            });
    }

    useEffect(() => {
        if (sessionStorage.getItem('bingo')) {
            setBingo(JSON.parse(sessionStorage.getItem('bingo')))
        } else {
            fetchBingo();
        }
        if (sessionStorage.getItem('selectedTracks')) {
            setSelectedTracks(JSON.parse(sessionStorage.getItem('selectedTracks')))
        }
    }, []);

    return (
        <div className="wrap">
            <div className='bingo'>
                <div className='tracks'>
                    {bingo?.bingo_tracks.map((track) => (
                        <div
                            className={`track ${selectedTracks.includes(track.artist_id) ? 'active' : ''}`}
                            key={track.artist_id}
                            onClick={() => toggleTrack(track.artist_id)}
                        >
                            {track.artist_name}
                        </div>
                    ))}
                </div>
                <div className='options'>
                    <LogoComponent largeSize={false} />
                    {bingo?.code}
                    <button onClick={endGame} className="secondary">Exit</button>
                </div>
            </div>
        </div>
    );
};

export default Bingo;