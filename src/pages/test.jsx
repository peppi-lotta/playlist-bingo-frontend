import React, { useEffect } from 'react';
import '../styles/components.scss';
import LogoComponent from '../../public/components/LogoComponent';


const Test = () => {

    fetch('https://playlist-bingo-back.vercel.app/test-token', {
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
