import React from 'react';
import styles from "../styles/Messages.module.css";

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Messages = ({ messages, name }) => {
    return (
        <div className={styles.messages}>
            {messages.map(({ user, message, timestamp }, i) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const className = itsMe ? styles.me : styles.user;
                return (
                    <div key={i} className={`${styles.message} ${className}`}>
                        <span className={styles.user}>
                            {user.name} <span className={styles.timestamp}>{formatTimestamp(timestamp)}</span>
                        </span>
                        <div className={styles.text}>
                            {message}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
