import React,{useState} from 'react'
import Cards from '../../components/Cards';
import Navbar from '../../components/Navbar';


const Delivery = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
  return (
    <>
    <Navbar/>
    <h1>Delivery</h1>  
        <div className="search-bar"> 
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <button>Search</button>
        </div>
        <Cards/> 
    <div>
               
    </div>
            

    </>
  )
}

export default Delivery;
