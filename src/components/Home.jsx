import React, { useState } from 'react';
import Search from './Search';
import Information from './PageInfo';

const Home = (selectValue) => {
  
  
 
   

   
    return (
        <main className='home'>
        
           
                    <Search selectValue={selectValue} ></Search>
        
        </main>
    );
}

export default Home;
