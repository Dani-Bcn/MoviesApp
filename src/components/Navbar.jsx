import React ,{useState}from 'react'

export default function Navbar() { 

const [activePage,setActivePage] = useState(false)

 const handleClick=()=>{
  setActivePage(!activePage)
  console.log(activePage)
localStorage.setItem("activePage",activePage)
 }
 

  return (
    <main
        className='
        z-10
        '
    >
        <section
        className='
            w-80
            my-5
            flex
        '>
            <button>Movies</button>
            <button>Series</button>      
        <svg 
  onClick={()=> handleClick()}
        className='
            absolute
            ml-[90%]
        '
        width="25px" height="25px" viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg"><path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#599"/></svg>
          </section>
    </main>
  )
}
