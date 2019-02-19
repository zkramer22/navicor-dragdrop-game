export const CARDS = {
  0: [
    { word: "National" },
    { word: "League" },
    { word: "Hockey" },
    { word: "Nation" },
    { word: "Hangman" },
    { word: "Harlequin" },
    { word: "Language" },
    { word: "Naruto" },
    { word: "Nationwide" },
    { word: "Hoverboard" },
    { word: "License" },
    { word: "Natal" }
  ],
  1: [
    { word: "Major" },
    { word: "League" },
    { word: "Baseball" },
    { word: "Maternal" },
    { word: "Bing" },
    { word: "Baking" },
    { word: "Language" },
    { word: "Biking" },
    { word: "Master" },
    { word: "Barre" },
    { word: "Luxury" },
    { word: "Boarding" }
  ],
  2: [
    { word: "National" },
    { word: "Football" },
    { word: "League" },
    { word: "Nation" },
    { word: "Frisbee" },
    { word: "Field" },
    { word: "Language" },
    { word: "Naruto" },
    { word: "Nationwide" },
    { word: "Forestry" },
    { word: "License" },
    { word: "Natal" }
  ],
  3: [
    { word: "Major" },
    { word: "League" },
    { word: "Soccer" },
    { word: "Maternal" },
    { word: "Sorcery" },
    { word: "Skiing" },
    { word: "Language" },
    { word: "Spelling" },
    { word: "Master" },
    { word: "Spy" },
    { word: "Luxury" },
    { word: "Speech" }
  ],
  4: [
    { word: "Laugh" },
    { word: "Out" },
    { word: "Loud" },
    { word: "Like" },
    { word: "Our" },
    { word: "Love" },
    { word: "Lift" },
    { word: "Other" },
    { word: "Larry" },
    { word: "Loofah" },
    { word: "License" },
    { word: "Ostrich" }
  ],
  5: [
    { word: "For" },
    { word: "Your" },
    { word: "Information" },
    { word: "Four" },
    { word: "Year" },
    { word: "Inspection" },
    { word: "Five" },
    { word: "Yous" },
    { word: "Intel" },
    { word: "Free" },
    { word: "Yellow" },
    { word: "Ink" }
  ],
  6: [
    { word: "I" },
    { word: "Dont" },
    { word: "Know" },
    { word: "Identify" },
    { word: "Dumb" },
    { word: "Kids" },
    { word: "Inner" },
    { word: "Door" },
    { word: "Knob" },
    { word: "Iced" },
    { word: "Doughnut" },
    { word: "Knots" }
  ],
  7: [
    { word: "You" },
    { word: "Only" },
    { word: "Live" },
    { word: "Once" },
    { word: "Lay" },
    { word: "Lift" },
    { word: "Outward" },
    { word: "Ought" },
    { word: "Learn" },
    { word: "Online" },
    { word: "Like" },
    { word: "Ye" }
  ]
}

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
