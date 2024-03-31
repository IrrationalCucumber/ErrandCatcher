import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavBarPage";

const AddAccount = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    lname: "",
    fname: "",
    gender: "",
    email: "",
    contact: "",
    age: "",
    bday: "",
    address: "",
    // desc:"",
    type: "",
    dateCreated: "",
    // profileImage:"",
  });
  // const formatDate = (dateString) => {
  //     // Input date format: MM/DD/YYYY
  //     const [month, day, year] = dateString.split('/');
  //     // Output date format: YYYY-MM-DD
  //     return `${year}-${month}-${day}`;
  //   };
  //get current date

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else if (e.target.name === "type") {
      setAccount((prev) => ({ ...prev, type: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //save the data into db
  const handleClick = async (e) => {
    //const updatedAccount = { ...account };
    //refresh the page when button is clicked
    e.preventDefault();
    try {
      account.dateCreated = getCurrentDate();
      await axios.post("http://localhost:8800/user", account);
      navigate("/accounts");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(account);
  return (
    <div>
    <Navbar />
    <div style={styles.container}>
      <h1 style={styles.heading}>NEW ACCOUNT</h1>
      <form onSubmit={handleClick} style={styles.form}>
        <input
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="password"
          onChange={handleChange}
          name="password"
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="first name"
          onChange={handleChange}
          name="fname"
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="last name"
          onChange={handleChange}
          name="lname"
          style={styles.input}
          required
        />
        <label htmlFor="gender" style={styles.input}>
          Gender
          <select
            name="gender"
            onChange={handleChange}
            value={account.gender}
            style={styles.select}
            required
          >
            <option value="">Choose gender....</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="contact number"
          onChange={handleChange}
          name="contact"
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Age"
          onChange={handleChange}
          name="age"
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          name="email"
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Address"
          onChange={handleChange}
          name="address"
          style={styles.input}
          required
        />
        <select
          name="type"
          onChange={handleChange}
          value={account.type}
          style={styles.select}
          required
        >
          <option value="">Choose Type</option>
          <option value="Employer">Employer</option>
          <option value="Catcher">Catcher</option>
        </select>

        <button type="submit" style={styles.button}>Add Account</button>
      </form>
    </div>
    </div>
  );
};

export default AddAccount;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  label: {
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

/**
 *      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/>
      <input type="text" placeholder='gender' onChange={handleChange} name='gender'/>

      <input type="text" placeholder='Account type' onChange={handleChange} name='type'/>
 */
