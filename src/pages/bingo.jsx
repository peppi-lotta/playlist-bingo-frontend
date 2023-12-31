import React, { useState, useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';
import { useLocation } from 'react-router-dom';
import Info from '../../public/components/Info';
import BingoNameTag from '../../public/components/BingoNameTag';

const Bingo = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const name_tag = localStorage.getItem('bingo-name-tag')

    const [bingo, setBingo] = useState()
    const [selectedTracks, setSelectedTracks] = useState([]);

    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth && window.innerWidth < 800);

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
        fetch(import.meta.env.VITE_BASE_URL + `/auth/bingo?code=${code}&name_tag=${name_tag}`, {
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
            <Info />
            <div className='bingo'>
                <div className='tracks'>
                    {bingo?.bingo_tracks.map((track) => (
                        <div
                            className={`track ${selectedTracks.includes(track.artist_id) ? 'active' : ''}`}
                            key={track.artist_id}
                            onClick={() => toggleTrack(track.artist_id)}
                        >
                            <span>{track.artist_name}</span>
                        </div>
                    ))}
                </div>
                <div className='options'>
                    <div>
                        <LogoComponent largeSize={false} />
                        <BingoNameTag update={true} />
                    </div>
                    <div>
                        <button onClick={endGame} className="secondary">Exit</button>
                        {bingo?.code}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bingo;