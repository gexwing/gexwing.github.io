// todo: note names dependent on key...
var notesNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var intervalNames = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7'];

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

var chords_basic = {
  // Triads
  "maj": [0, 4, 7],
  "min": [0, 3, 7],
  "dim": [0, 3, 6],
};

var chords_sus = {
  // Suspended
  "sus4": [0, 5, 7],
  "sus2": [0, 2, 7],
};

var chords_7th = {
  // 7th Chords
  "maj^7": [0, 4, 7, 11],
  "min^7": [0, 3, 7, 10],
  "^7": [0, 4, 7, 10],
  "dim^7": [0, 3, 6, 9],
  "min^7b5": [0, 3, 6, 10],
  "min^maj7": [0, 3, 7, 11],
  "maj^7b5": [0, 4, 8, 11],
};

var chords_extended = {
  // Extended Chords
  "^9": [0, 4, 7, 10, 13],
  "^11": [0, 4, 7, 10, 13, 16],
  "^13": [0, 4, 7, 10, 13, 16, 19],
};

var chords_all = Object.assign({}, chords_basic, chords_sus, chords_7th, chords_extended);

// find all possible chords in a set of notes/scale
function findChords(chorddict, notes)
{
  let result = [];
  for (let root of notes)
  {
    for (let [cname, cnotes] of Object.entries(chorddict))
    {
      if (cnotes.every(val => notes.includes((val + root + 12) % 12))) {
        result.push([root, cname]);
      }
    }
  }
  return result;
}