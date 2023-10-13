import {motion as m} from "framer-motion"

const Popularity_circle = () => {

  
  const visible={    
        pathLength:0.99,     
    }
  

  return(

  <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124">
   
  
    <rect width="100" height="2" x="0" fill="#008d46" />
    <rect width="1" height="2" x="1" fill="#ffffff" />
    <rect width="1" height="2" x="2" fill="#d2232c" />
    <m.circle id="circle"  cx="50" cy="50" r="20" fill="none" stroke="red" strokeWidth={10} 
    
     
     animate={visible}
    />
  </svg>

  )
};

export default Popularity_circle;
