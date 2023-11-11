import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LogoComponent from '../../public/components/LogoComponent';

const ShowStats = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const sixMonthsAgo = new Date(selectedStartDate);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        setSelectedStartDate(sixMonthsAgo);

        fetchStats();
    }, []);

    useEffect(() => {
        fetchStats();
    }, [selectedStartDate, selectedEndDate]);

    function formatDate(date) {
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${year}-${month}-${day}`;
    }

    const fetchStats = () => {
        fetch(import.meta.env.VITE_BASE_URL + `/bingo/get-stats?start=${formatDate(selectedStartDate)}&end=${formatDate(selectedEndDate)}`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    return (
        <div className='show-stats wrap'>
            <LogoComponent largeSize={false} />
            <p>Select dates:</p>
            <div className='dates'>
                <DatePicker selected={selectedStartDate} onChange={handleStartDateChange} dateFormat="dd-MM-yyyy" />
                {' - '}
                <DatePicker selected={selectedEndDate} onChange={handleEndDateChange} dateFormat="dd-MM-yyyy" />
            </div>
            {stats && (typeof stats !== "undefined") && stats !== null && stats.length > 0 ? (
                <>
                    <ul className='stats'>
                        {stats.map((stat) => (
                            <li key={stat.name_tag}>
                                <p>{stat.name_tag}</p> <p>{stat.total_points}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    Loading ...
                </>
            )}
        </div>
    );
};

export default ShowStats;
