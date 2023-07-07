import React, { useState } from 'react';
import axios from 'axios';

const predefinedPrompts = [
  'Enhance the descriptions and update the data within the CV',
  'Enhance the social medias and update the data within the CV',
  // Add more predefined prompts as needed
];

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [responses, setResponses] = useState([]);

  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompts = [userPrompt, ...predefinedPrompts];

    const requests = prompts.map((prompt) =>
      axios.post('http://localhost:3000/chat', { prompt })
    );

    axios
      .all(requests)
      .then((responses) => {
        const updatedResponses = responses.map((res) => res.data.text);
        setResponses(updatedResponses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userPrompt}
          onChange={handleUserPromptChange}
          placeholder="Enter your text"
        />
        <button type="submit">Submit</button>
      </form>
      {responses.map((response, index) => (
        <p key={index}>{response}</p>
      ))}
    </>
  );
}

export default App;
