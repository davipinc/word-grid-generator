
export async function getTheTime() {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Europe/London`);
  const timeDetails = await res.json();
  return timeDetails;
}
	
export async function getWords() {
  const resWords = await fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0');
  let randomWords = await resWords.json();
  console.info('Random words: ', randomWords);
  return randomWords;
}