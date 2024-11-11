import React, { useState, useEffect } from 'react';
import styles from "../styles/Main.module.css";
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const FIELDS = {
    NAME: "name",
    ROOM: "room"
};

const socket = io('http://localhost:5001'); 

const Main = () => {
    const { NAME, ROOM } = FIELDS;
    const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        // Fetch initial room list from server
        const fetchRooms = async () => {
            const response = await fetch('http://localhost:5001/rooms');
            const data = await response.json();
            setAvailableRooms(data.rooms);
        };
    
        fetchRooms(); // Fetch rooms on mount
    
        const updateRooms = ({ rooms }) => {
            console.log('Updated available rooms:', rooms);
            setAvailableRooms(rooms);
        };
    
        // Listen for room updates via socket events
        socket.on('rooms', updateRooms);
    
        // Cleanup event listener on unmount
        return () => {
            socket.off('rooms', updateRooms);
        };
    }, []);

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some((v) => !v);
        if (isDisabled) e.preventDefault();
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Group Chat </h1>

                <form className={styles.form}>
                    <div className={styles.group}>
                        <input
                            type="text"
                            name="name"
                            value={values[NAME]}
                            placeholder='Your Name'
                            className={styles.input}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input
                            type="text"
                            name="room"
                            value={values[ROOM]}
                            placeholder='Room'
                            className={styles.input}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <Link
                        className={styles.group}
                        onClick={handleClick}
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
                        <button type="submit" className={styles.button}>Sign In</button>
                    </Link>
                </form>

                {/* Available rooms box */}
                <div className={styles.availableRoomsBox}>
                    <h2 className={styles.subheading}>Available Rooms</h2>
                    {availableRooms.length > 0 ? (
                        <ul className={styles.roomList}>
                            {availableRooms.map((room, index) => (
                                <li key={index} className={styles.roomItem}>
                                    {room}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.noRooms}>No available rooms at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
