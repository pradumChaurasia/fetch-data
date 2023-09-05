import logo from './logo.svg';
import React, {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [pastTerm, setPastTerm] = useState([])
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {

    const saved=localStorage.getItem('pastTerm')
    if(saved){
      setPastTerm(JSON.parse(saved))
    }

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((e) => {
        console.log('an error occurred')
      })
  }, [])

  // Function to filter users by name
  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const updatedSearchTerms = [...pastTerm, searchQuery];
      setPastTerm(updatedSearchTerms);

      // Save the updated search terms to localStorage
      localStorage.setItem('pastSearchTerms', JSON.stringify(updatedSearchTerms));
  
  
    }
  }

  const sortByName=()=>{
    const sortedData=[...data]
    if(sortOrder==='asc'){
      sortedData.sort((a,b)=>a.name.localeCompare(b.name))
      setSortOrder('desc')
    }
    else {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
      setSortOrder('asc');
    }
    setData(sortedData)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={sortByName}>
        sort by name ({sortOrder==='asc'?'A-Z':'Z-A'})
      </button>

      <h2>  
          {sortOrder=='asc'?'ascending':'descending'}
      </h2>

      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <>
            <li key={user.id}>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Username:</b> {user.username}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Website:</b> {user.website}</p>
              <p><b>Address:</b> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
              <p><b>Latitude:</b> {user.address.geo.lat}</p>
              <p><b>Longitude:</b> {user.address.geo.lng}</p>
              <p><b>Company:</b> {user.company.name}</p>
              <p><b>Catchphrase:</b> {user.company.catchPhrase}</p>
              <p><b>Business Description:</b> {user.company.bs}</p>
            </li>
            <br></br>
            </>
          ))
        ) : (
          <p>No matching users found.</p>
        )}
      </ul>

      <div>
        <h2>Past Search Terms:</h2>
        <ul>
          {pastTerm.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
