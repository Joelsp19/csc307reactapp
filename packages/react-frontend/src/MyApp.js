// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table"
import Form from './Form'

  function MyApp() {
    const [characters,setCharacters] = useState([]);

    //promises
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      return promise;
    }

    function deleteUser(id) {
      const url = `http://localhost:8000/users/${id}`;
      const promise = fetch(url, {
        method: "DELETE"
      });
      return promise;
    }

    function updateList(person) { 
      postUser(person)
        .then((res) => res.status == 201 ? 
            res.json() : undefined 
        )
        .then((json) => setCharacters([...characters,json]))
        .catch((error) => { 
          console.log(error);
        })
    }

    function removeOneCharacter(index) {
      let id = characters[index]['id'];
      deleteUser(id)
        .then((res) => {
            if (res.status != 204)
              throw new Error("Resource not found") 
        })
        .then(() => {
          const updated = characters.filter((character,i) => {
            return i !== index
          });
          setCharacters(updated);
        })
        .catch((error) => {console.log(error); });
    };
    

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
      <div className="container">
        <Table characterData ={characters}
          removeCharacter = {removeOneCharacter} />
        <Form handleSubmit = {updateList}/>
      </div>
    );
  }
export default MyApp;
    