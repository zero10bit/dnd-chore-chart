// src/components/CharacterCreation.js
import React, { useState } from 'react';

function CharacterCreation({ onCreate }) {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('warrior');
  const [isNewUser, setIsNewUser] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const character = { name, characterClass };
    localStorage.setItem('dndChoreChartCharacter', JSON.stringify(character));
    onCreate(character);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedCharacter = JSON.parse(localStorage.getItem('dndChoreChartCharacter'));
    if (savedCharacter && savedCharacter.name === name) {
      onCreate(savedCharacter);
    } else {
      alert('Character not found. Please create a new character.');
    }
  };

  return (
    <form onSubmit={isNewUser ? handleSubmit : handleLogin} className="character-creation">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
        required
      />
      {isNewUser && (
        <select
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
        >
          <option value="warrior">Warrior</option>
          <option value="mage">Mage</option>
          <option value="rogue">Rogue</option>
        </select>
      )}
      <button type="submit">{isNewUser ? 'Create Character' : 'Login'}</button>
      <button type="button" onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? 'Login' : 'Create New Character'}
      </button>
    </form>
  );
}

export default CharacterCreation;
