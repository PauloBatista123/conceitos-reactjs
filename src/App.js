import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(Response => {
          setRepositories(Response.data);
      });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
        title: document.getElementById('title').value,
        techs: ['JAVA', 'DEV++'],
        url: 'HTTP:JAVA',
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    api.delete('/repositories/'+id).then(function(response){
      console.log(response);
    });

    document.getElementById(id).remove();
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(function(repository, indice){
        return <li key={repository.id} id={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
        </li>
      }
      )}
      </ul>
      <input type="text" name="title" id="title" placeholder="titulo do texto"/> <br></br>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
