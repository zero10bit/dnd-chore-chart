// src/components/BossFight.js
import React, { useState, useEffect } from 'react';

// List of bosses with image paths
const bossList = [
  { name: 'Tiamat', image: '/src/img/tiamat.webp' },
  { name: 'Demogorgon', image: '/src/img/demogorgon.webp' },
  { name: 'Orcus', image: '/src/img/orcus.png' },
  { name: 'Acererak', image: '/src/img/acererak.png' },
  { name: 'Zariel', image: '/src/img/zariel.png' },
  { name: 'Vecna', image: '/src/img/vecna.png' },
  { name: 'Beholder', image: '/src/img/beholder.png' },
  { name: 'Mind Flayer', image: '/src/img/mind_flayer.png' },
  { name: 'Lich', image: '/src/img/lich.png' },
  { name: 'Dracolich', image: '/src/img/dracolich.png' }
];

function BossFight({ character }) {
  const [boss, setBoss] = useState({});
  const [chores, setChores] = useState([]);
  const [bossHP, setBossHP] = useState(0);
  const [maxHP, setMaxHP] = useState(0);
  const [diceRoll, setDiceRoll] = useState(0);

  // Set the boss and HP based on the number of chores
  useEffect(() => {
    if (chores.length) {
      const numChores = chores.length;
      const bossHP = numChores * (Math.floor(Math.random() * 10) + 1);
      const randomBoss = bossList[Math.floor(Math.random() * bossList.length)];
      setBoss(randomBoss);
      setBossHP(bossHP);
      setMaxHP(bossHP);
    }
  }, [chores]);

  const handleAddChore = (chore) => {
    setChores([...chores, chore]);
  };

  const handleCompleteChore = (chore) => {
    const newChores = chores.filter((c) => c !== chore);
    setChores(newChores);
    setBossHP(bossHP - chore.points);
  };

  // Update boss image grayscale based on HP
  useEffect(() => {
    if (maxHP > 0) {
      const grayscaleValue = 100 - Math.floor((bossHP / maxHP) * 100);
      document.getElementById('boss-image').style.filter = `grayscale(${grayscaleValue}%)`;
    }
  }, [bossHP, maxHP]);

  const rollDice = () => {
    if (chores.length) {
      const roll = Math.floor(Math.random() * chores.length);
      setDiceRoll(roll);
    }
  };

  return (
    <div className="boss-fight">
      <h2>{character.name} the {character.characterClass}</h2>
      {boss.image && <img id="boss-image" src={boss.image} alt={boss.name} />}
      <div>Boss HP: {bossHP}/{maxHP}</div>
      <ul>
        {chores.map((chore, index) => (
          <li key={index} className={diceRoll === index ? 'highlight' : ''}>
            {chore.name} - {chore.points} points
            <button onClick={() => handleCompleteChore(chore)}>Complete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddChore({ name: 'New Chore', points: Math.floor(Math.random() * 10) + 1 })}>
        Add Chore
      </button>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
}

export default BossFight;
