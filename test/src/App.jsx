import React, { useState } from 'react';
import axios from 'axios';

const predefinedPrompts = [
  'Enhance the generated CV with better grammar and sentence structure. Dont increase the word count.Keep the format in JSON.',
  'Improve the punctuation and word usage in the generated CV. Dont increase the word count. Keep the format in JSON.',
];

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponses([]);

    let prompt = userPrompt + " in JSON format.";
    for (let i = 0; i <= predefinedPrompts.length; i++) {
      try {
        const res = await axios.post('http://localhost:3000/chat', { prompt });
        let responseText = res.data.text;
        // responseText = responseText.trim();
        const JSONtext = JSON.parse(responseText);
        console.log(JSONtext);
        setResponses((prevResponses) => [...prevResponses, responseText]);
        prompt = `${responseText}\n${predefinedPrompts[i]}`;
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {responses.map((response, index) => (
        <div key={index}>
          <h2>Response {index + 1}</h2>
          <p>{response}</p>
        </div>
      ))}
    </>
  );
}

export default App;