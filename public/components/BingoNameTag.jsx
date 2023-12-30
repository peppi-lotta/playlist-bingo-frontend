import React, { useEffect, useState } from 'react';

function BingoNameTag(props) {

    const storedBingoNameTag = localStorage.getItem('bingo-name-tag');
    const [bingoNameTag, setBingoNameTag] = useState(storedBingoNameTag ? storedBingoNameTag : 'guest');
    const [editName, setEditName] = useState(false);
    const update = props.update

    const changeName = () => {
        setEditName(true);
        const edit = document.querySelector("#edit");
        edit.style.display = 'flex';
        edit.focus();
    };

    const setNameToLocalStorage = (event) => {
        let value = event.target.value.trim().toLowerCase()
        if (value == '') {
            value = 'guest'
            localStorage.removeItem('bingo-name-tag');
        } else {
            localStorage.setItem('bingo-name-tag', value);
        }
        setEditName(false);
        setBingoNameTag(value);
        const edit = document.querySelector("#edit");
        edit.style.display = 'none';
        if (update) {
            fetch(import.meta.env.VITE_BASE_URL + `/bingo/update-name?code=${JSON.parse(sessionStorage.getItem('bingo')).code}&name_tag=${value}`, {
                credentials: "include",
            })
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    console.error('Error fetching bingo data:', error);
                });
        }
    };

    return (
        <div className="bingo-name-tag-edit">
            <div className={`name ${!editName ? 'active' : ''}`}>
                <span>{bingoNameTag}</span>
                <img
                    onClick={changeName}
                    className='icon'
                    src="../pen.svg"
                    alt=""
                    style={{ width: '25px', height: '25px' }}
                />
            </div>
            <input
                id='edit'
                className={`change-name ${editName ? 'active' : ''}`}
                onBlur={setNameToLocalStorage}
                onChange={(event) => { setBingoNameTag(event.target.value) }}
                value={bingoNameTag}
                maxlength="50"
            />
        </div>
    );
}

export default BingoNameTag;
