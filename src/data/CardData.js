export const CARDS = [
  { word: "National" },
  { word: "Major" },
  { word: "League" },
  { word: "Hockey" },
  { word: "Baseball" },
  { word: "Football" },
  { word: "Soccer" },
  { word: "Laugh" },
  { word: "Out" },
  { word: "Loud" },
  { word: "For" },
  { word: "Your" },
  { word: "Information" },
  { word: "I" },
  { word: "Don't" },
  { word: "Know" },
];

export const shuffler = arr => {
  var i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;
}
