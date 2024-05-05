import axios from "axios";
import { useEffect, useState } from "react";


const Country = () => {
    const[countries, setCountry] = useState([]);
    const [search, setSearch] = useState("");

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(res => {
             console.log('success of promise');
             setCountry(res.data);
            })
    }
    useEffect(hook, []);
    
  return (
    <div className="container">
        <div className="hero">
        <h1 className="title">Country Search</h1>
        <input 
        placeholder="search country"
         value={search}
         onChange={(e)=> setSearch(e.target.value)
         }/>
        { search === '' ? '' : 
         <div className="hero-section">
            {countries.filter(
                (country) => search.toLowerCase() === '' ? 'Search Country' : country.name.common.toLowerCase().includes(search.toLowerCase())
            ).map((country) => {
                const myObject = country.languages || {}; 
                const valuesArray = Object.values(myObject);
                return (
                    <div key={country.ccn3} className="content">
                        <div className="header">
                        <h1>{country.name.common}</h1>
                        </div>
                       <div className="c-info">
                       <div className="info">
                        <p>capital: {country.capital}</p>
                        <p>region : {country.region}</p>
                        <p>subregion : {country.subregion}</p>
                        <p>population : {country.population}</p>
                        <p>fifa : {country.fifa}</p>
                        <p>language : {valuesArray.join(' , ')}</p>
                        </div>
                        <div className="img">
                        <img src={country.flags.png} alt={country.flags.alt} width={240}/>
                        </div>
                       </div>
                    </div>
                )
            })
            }
         </div>
         }
        </div>
    </div>
  )
}

export default Country