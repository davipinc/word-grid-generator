
export async function getTheTime() {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/Europe/London`);
  const timeDetails = await res.json();
  return timeDetails;
}