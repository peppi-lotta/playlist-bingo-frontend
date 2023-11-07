import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(true); // Initialize isPaused state
    const [trackVisible, setTrackVisible] = useState(false);
    const [artistVisible, setArtistVisible] = useState(false);
    const audioRef = useRef(null);
    const revealTrack = 19;
    const revealArtist = 24;
    const gameTracks = props.game.game_tracks

    useEffect(() => {
        setSeconds(0)
        setArtistVisible(false)
        setTrackVisible(false)
        setIsPaused(false)
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [props.currentTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        // Add an event listener to detect when the audio starts playing
        audio.addEventListener('play', () => {
            if (isPaused === true) {
                setIsPaused(false);
            }
        });

        audio.addEventListener('pause', () => {
            if (isPaused === false) {
                setIsPaused(true);
            }
        });

        // Cleanup when the component unmounts
        return () => {
            audio.removeEventListener('play', () => { });
        };
    }, [isPaused, audioRef]); // Add isPaused as a dependency

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }
        }, 1000);

        if (seconds === revealTrack) {
            setTrackVisible(true);
        }

        if (seconds === revealArtist) {
            setArtistVisible(true);
        }

        if (seconds === 29) {
            console.log('next track')
            clearInterval(interval);
            props.sendInfoToParent(true);
        }

        return () => {
            clearInterval(interval);
        };
    }, [seconds, isPaused]); // Add seconds and isPaused as dependencies

    return (
        <>
            <div className="info">
                {trackVisible && (
                    <span className='track-name'>{gameTracks[props.currentTrack]?.track_name}</span>
                )}
                {artistVisible && (
                    <span className='artist'>{gameTracks[props.currentTrack]?.artist_name}</span>
                )}
                <audio className="preview" ref={audioRef} controls autoplay="true">
                    <source src={gameTracks[props.currentTrack]?.track_preview_url} type="audio/mpeg" />
                </audio>
                <p className='looking-for'>{props.lookingFor}</p>
            </div>
        </>
    );
};

export default AudioPlayer;
