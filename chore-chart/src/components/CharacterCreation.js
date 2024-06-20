// src/components/CharacterCreation.js
import React, { useState } from 'react';

// CharacterCreation component for creating a character
function CharacterCreation({ onCreate }) {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('warrior');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, characterClass });
  };

  return (
    <form onSubmit={handleSubmit} className="character-creation">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
        required
      />
      <select
        value={characterClass}
        onChange={(e) => setCharacterClass(e.target.value)}
      >
        <option value="warrior">Warrior</option>
        <option value="mage">Mage</option>
        <option value="rogue">Rogue</option>
      </select>
      <button type="submit">Create Character</button>
    </form>
  );
}

export default CharacterCreation;
