// src/components/BossFight.js
import React, { useState, useEffect } from 'react';

// List of bosses with image paths
const bossList = [
  { name: 'Tiamat', image: require('../img/tiamat.webp') },
  { name: 'Demogorgon', image: require('../img/demogorgon.webp') },
  { name: 'Orcus', image: require('../img/orcus.webp') },
  { name: 'Acererak', image: require('../img/acererak.webp') },
  { name: 'Zariel', image: require('../img/zariel.webp') },
  { name: 'Vecna', image: require('../img/vecna.webp') },
  { name: 'Beholder', image: require('../img/beholder.webp') },
  { name: 'Mind Flayer', image: require('../img/mind_flayer.webp') },
  { name: 'Lich', image: require('../img/lich.webp') },
  { name: 'Dracolich', image: require('../img/dracolich.webp') }
];

function BossFight({ character }) {
  const [boss, setBoss] = useState({});
  const [chores, setChores] = useState([]);
  const [bossHP, setBossHP] = useState(0);
  const [maxHP, setMaxHP] = useState(0);
  const [diceRoll, setDiceRoll] = useState(0);
  const [newChore, setNewChore] = useState({ name: '', points: 0, isRandom: false });

  // Load chores from local storage
  useEffect(() => {
    const savedChores = JSON.parse(localStorage.getItem('dndChoreChartChores'));
    if (savedChores) {
      setChores(savedChores);
    }
  }, []);

  // Save chores to local storage
  useEffect(() => {
    localStorage.setItem('dndChoreChartChores', JSON.stringify(chores));
  }, [chores]);

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

  const handleAddChore = () => {
    const chorePoints = newChore.isRandom ? Math.floor(Math.random() * 10) + 1 : newChore.points;
    setChores([...chores, { name: newChore.name, points: chorePoints }]);
    setNewChore({ name: '', points: 0, isRandom: false });
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
      <div className="add-chore">
        <input
          type="text"
          value={newChore.name}
          onChange={(e) => setNewChore({ ...newChore, name: e.target.value })}
          placeholder="Chore Name"
          required
        />
        <input
          type="number"
          value={newChore.points}
          onChange={(e) => setNewChore({ ...newChore, points: parseInt(e.target.value, 10) })}
          placeholder="Chore Points"
          disabled={newChore.isRandom}
        />
        <label>
          <input
            type="checkbox"
            checked={newChore.isRandom}
            onChange={(e) => setNewChore({ ...newChore, isRandom: e.target.checked })}
          />
          Random Points
        </label>
        <button onClick={handleAddChore}>Add Chore</button>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
}

export default BossFight;
