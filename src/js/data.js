import classicDice from '../routes/dice/classic.json';
import newDice from '../routes/dice/new.json';

const diceTypes = {
  classic: classicDice,
  new: newDice
};

const DEFAULT_TYPE = 'classic';

export async function getDice(type = DEFAULT_TYPE) {
  return diceTypes[type] || diceTypes[DEFAULT_TYPE];
}