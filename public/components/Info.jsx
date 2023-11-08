import React from 'react';

function Info() {
    return (
        <div className="info-ball">
            <a href='/info-page'>
                <img
                    className='icon'
                    src="../info.svg"
                    alt=""
                    style={{ width: '25px', height: '25px' }}
                />
            </a>
        </div>
    );
}

export default Info;
