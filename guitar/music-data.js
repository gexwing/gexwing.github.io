// todo: note names dependent on key...
var notesNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

var tunings = {
  "Guitar E Standard":  [7, 0, 5, 10, 2, 7],
  "Guitar Drop D":      [5, 0, 5, 10, 2, 7],
  "Guitar Eb Standard": [6, 11, 4, 9, 1, 6],
  "Guitar D Standard":  [5, 10, 3, 8, 0, 5],
  "Ukulele":            [10, 3, 7, 0],
};

var scales = {
  "Major":            [0, 2, 4, 5, 7, 9, 11],
  "Minor":            [0, 2, 3, 5 ,7, 8, 10],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
};

var chords = {
  // Triads
  "maj": [0, 4, 7],
  "min": [0, 3, 7],
  "dim": [0, 3, 6],

  // Suspended
  "sus4": [0, 5, 7],
  "sus2": [0, 2, 7],

  // 7th Chords
  "maj^7": [0, 4, 7, 11],
  "min^7": [0, 3, 7, 10],
  "^7": [0, 4, 7, 10],
  "dim^7": [0, 3, 6, 9],
  "min^7b5": [0, 3, 6, 10],
  "min^maj7": [0, 3, 7, 11],
  "maj^7b5": [0, 4, 8, 11],
};
