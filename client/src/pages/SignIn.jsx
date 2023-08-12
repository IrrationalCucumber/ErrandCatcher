import React, { useState } from 'react'

const SignIn = () => {
  const [account, setAccount] = ([useState])


  const fetchAccount = async () => {
    try {
        const res = await axios.get('http://192.168.1.47:8800/sign-in', {
            params: { term: user } // Pass the search term as a query parameter
        });
        setAccount(res.data);
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    fetchSearchResults();
}, [setAccount]); // Trigger the search whenever searchTerm changes


  return (
    <div>
      SignIn
    </div>
  )
}

export default SignIn
