import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Explore from './Explore';

function Home() {
    return (
        <div className="home">
            <Sidebar />
            <Explore />
        </div>
    )
}

export default Home;