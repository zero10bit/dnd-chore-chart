// src/App.js
import React, { useState } from 'react';
import CharacterCreation from './components/CharacterCreation';
import BossFight from './components/BossFight';
import './App.css';

function App() {
  const [character, setCharacter] = useState(null);

  const handleCharacterCreate = (newCharacter) => {
    setCharacter(newCharacter);
  };

  return (
    <div className="App">
      {!character ? (
        <CharacterCreation onCreate={handleCharacterCreate} />
      ) : (
        <BossFight character={character} />
      )}
    </div>
  );
}

export default App;
