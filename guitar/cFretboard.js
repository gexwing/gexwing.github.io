// fretboard dimensions
const xspace = 20, yspace = 30;
const xoff = 30, yoff = 35;
const ynum = 12;
const circsize = 9;
const dotsize = 5;

function draw() {
  var canvas = document.getElementById('cFretboard');
  if (canvas.getContext)
  {
    var ctx = canvas.getContext('2d');
    ctx.font = '11px serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    var tuning = tunings[document.getElementById("tuning").value];
    var chord = getNotesInChord();
    var xnum = tuning.length;

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(xoff, yoff, (xnum-1)*xspace, 5);

    for (var i = 0; i < xnum; i++)
    {
      ctx.beginPath();
      ctx.moveTo(xoff + i*xspace, yoff);
      ctx.lineTo(xoff + i*xspace, yoff + ynum*yspace);
      ctx.stroke();
    }
    for (var j = 1; j < (ynum + 1); j++)
    {
      // fret markers
      if (j % 12 == 0 && j != 0)
      {
        ctx.beginPath();
        ctx.arc(xoff + xspace, yoff + (j - 0.5)*yspace, dotsize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      else if ([3, 5, 7, 9].includes(j % 12))
      {
        ctx.beginPath();
        ctx.arc(xoff + (xnum-1)/2*xspace, yoff + (j - 0.5)*yspace, dotsize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.moveTo(xoff, yoff + j*yspace);
      ctx.lineTo(xoff + (xnum-1)*xspace, yoff + j*yspace);
      ctx.stroke();
      ctx.fillText(j, xoff-15,  yoff + (j - 0.5)*yspace);
    }

    // draw notes
    ctx.textAlign = 'center';
    for (let i = 0; i < xnum; i++)
    {
      for (let j = 0; j <= ynum; j++)
      {
        let note = (tuning[i] + j) % 12;

        if (chord.includes(note))
        {
          ctx.beginPath();
          ctx.strokeStyle = (note == chord[0]) ? 'white' : 'black';
          ctx.fillStyle   = (note == chord[0]) ? 'red' : 'white';

          ctx.arc(xoff + i*xspace, yoff + (j - 0.5)*yspace, circsize, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fillText(notesNames[note], xoff + i*xspace,  yoff + (j - 0.5)*yspace);
        }
        else if (j == 0)
        {
          ctx.beginPath();
          ctx.fillStyle = 'grey';
          ctx.fillText(notesNames[note], xoff + i*xspace,  yoff - 0.5*yspace);
        }
      }
    }
  }
}

function clear()
{
  var canvas = document.getElementById('cFretboard');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
  }

  //resize  // width="150" height="410"
  var xnum = tunings[document.getElementById("tuning").value].length;
  canvas.width = xoff + xnum*xspace;
  canvas.height = yoff + (ynum+1)*yspace;
}
