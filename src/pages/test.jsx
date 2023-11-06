import React, { useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';


const Test = () => {

    fetch('https://bingo.peppilottasaari.fi/api/start-game?playlist_id=56K8I1MSbmyn6DiOejTJT2', {
        method: 'GET',
        credentials: "include",
        redirect: 'follow'
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Error testing token:', error);
        });


    return (
        <>
            <p>Hello</p>
        </>
    );
};

export default Test;
