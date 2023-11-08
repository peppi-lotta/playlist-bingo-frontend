import React from 'react';

const InfoPage = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <>
            <button className='tertiary fit' onClick={goBack}>Go Back</button>
        </>
    );
};

export default InfoPage;