// fretboard dimensions
const xspace = 20, yspace = 30;
const xoff = 30, yoff = 35;
const ynum = 12;
const circsize = 9;
const dotsize = 5;

function cFretDraw(canvas, strings, notes)
{
  if (canvas.getContext)
  {
    // Resize
    canvas.width = xoff + strings.length*xspace;
    canvas.height = yoff + (ynum+1)*yspace;

    // Clear
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Default Values
    ctx.font = '11px serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(xoff, yoff, (strings.length-1)*xspace, 5);

    for (var i = 0; i < strings.length; i++)
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
        ctx.arc(xoff + (strings.length-1)/2*xspace, yoff + (j - 0.5)*yspace, dotsize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.moveTo(xoff, yoff + j*yspace);
      ctx.lineTo(xoff + (strings.length-1)*xspace, yoff + j*yspace);
      ctx.stroke();
      ctx.fillText(j, xoff-15,  yoff + (j - 0.5)*yspace);
    }

    // draw notes
    ctx.textAlign = 'center';
    for (let i = 0; i < strings.length; i++)
    {
      for (let j = 0; j <= ynum; j++)
      {
        let note = (strings[i] + j) % 12;

        if (notes.includes(note))
        {
          ctx.beginPath();
          ctx.strokeStyle = (note == notes[0]) ? 'white' : 'black';
          ctx.fillStyle   = (note == notes[0]) ? 'red' : 'white';

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