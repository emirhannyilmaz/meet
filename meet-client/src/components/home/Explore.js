import React, { useEffect, useState } from 'react';
import './Explore.css';
import io from 'socket.io-client';
import uniqid from 'uniqid';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';

var socket;

function Explore() {
    const [partner, setPartner] = useState();
    const [matching, setMatching] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        socket = io.connect('localhost:3000');

        socket.on('joinedToRoom', (partner) => {
            setPartner(partner);
            setMatching(false);
        });

        socket.on('userJoined', (partner) => {
            setPartner(partner);
            setMatching(false);
        });

        socket.on('message', (message) => {
            setMessages(prev => [
                ...prev,
                {
                    key: uniqid(),
                    message: message,
                    own: false
                }
            ]);
        });

        socket.on('partnerDisconnected', () => {
            socket.emit('leaveRoom');            
        });

        socket.on('leftFromRoom', () => {
            setPartner(undefined);
            setMessages([]);
            setMessageInput('');
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const match = () => {
        setMatching(true);
        socket.emit('match', {
            displayName: user.displayName,
            photoURL: user.photoURL
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput !== '') {
            setMessages(prev => [
                ...prev,
                {
                    key: uniqid(),
                    message: messageInput,
                    own: true
                }
            ]);
            socket.emit('message', {
                message: messageInput
            });
            setMessageInput('');
        }
    }

    const endChat = (e) => {
        e.preventDefault();
        socket.emit('leaveRoom');
    }

    let content;
    if (partner === undefined) {
        if (!matching) {
            content = (
                <>
                    <div className="match">
                        <h2 className="text">Meet someone new.</h2>
                        <button onClick={match} className="match-button">Match</button>
                    </div>
                </>
            );
        } else {
            content = (
                <>
                    <div className="match">
                        <h2 className="text">Matching...</h2>
                    </div>
                </>
            );
        }
    } else {
        content = (
            <>
                <div className="chat">
                    <div className="chat__header">
                        <div className="chat__header__left">
                            <Avatar src={partner.photoURL} alt={partner.displayName} />
                            <h3>{partner.displayName}</h3>
                        </div>
                        <div className="chat__header__right">
                            <button className="end-chat" onClick={endChat} type="submit">End</button>
                        </div>
                    </div>
                    <div className="chat__body">
                        {
                            messages.map(m => (
                                <p key={m.key} className={`chat__message ${m.own && "own"}`}>{m.message}</p>
                            ))
                        }
                    </div>
                    <div className="chat__footer">
                        <form>
                            <input className="message-input" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} type="text" placeholder="Enter Message" />
                            <button className="send-message" onClick={sendMessage} type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="explore">
            {content}
        </div>
    )
}

export default Explore;