import React, { useState } from 'react';
import Search from './Search';

const Home = (selectValue) => {

    return (
        <main>
            <Search selectValue={selectValue} ></Search>
        </main>
    );
}

export default Home;
