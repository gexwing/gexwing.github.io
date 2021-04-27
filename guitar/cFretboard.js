function cFretDraw(canvas, strings, notes)
{
  // fretboard dimensions
  const yspace = 20;
  const xspace = 30;
  const yoff = 20;
  const xoff = 35;
  const fretnum = 24;
  const circsize = 9;
  const dotsize = 5;

  if (canvas.getContext)
  {
    // Resize
    canvas.height = yoff + strings.length*yspace;
    canvas.width = xoff + (fretnum + 1)*xspace;

    // Clear
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Default Values
    ctx.font = '11px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(xoff, canvas.height - yoff, 5, -(strings.length-1)*yspace);

    for (var i = 0; i < strings.length; i++)
    {
      ctx.beginPath();
      ctx.moveTo(xoff, canvas.height - (yoff + i*yspace));
      ctx.lineTo(xoff + fretnum*xspace, canvas.height - (yoff + i*yspace));
      ctx.stroke();
    }
    for (var j = 1; j < (fretnum + 1); j++)
    {
      // fret markers
      if ((j > 0) && (j % 12 == 0))
      {
        ctx.beginPath();
        ctx.arc(xoff + (j - 0.5)*xspace, canvas.height - (yoff + yspace), dotsize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      else if ([3, 5, 7, 9].includes(j % 12))
      {
        ctx.beginPath();
        ctx.arc(xoff + (j - 0.5)*xspace, canvas.height - (yoff + (strings.length-1)/2*yspace), dotsize, 0, Math.PI * 2, true);
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.moveTo(xoff + j*xspace, canvas.height - yoff);
      ctx.lineTo(xoff + j*xspace, canvas.height - (yoff + (strings.length-1)*yspace));
      ctx.stroke();
      ctx.fillText(j, xoff + (j - 0.5)*xspace, 5);
    }

    // draw notes
    for (let i = 0; i < strings.length; i++)
    {
      for (let j = 0; j <= fretnum; j++)
      {
        let note = (strings[i] + j) % 12;

        if (notes.includes(note))
        {
          ctx.beginPath();
          ctx.strokeStyle = (note == notes[0]) ? 'white' : 'black';
          ctx.fillStyle   = (note == notes[0]) ? 'red' : 'white';

          ctx.arc(xoff + (j - 0.5)*xspace, canvas.height - (yoff + i*yspace), circsize, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fillText(notesNames[note], xoff + (j - 0.5)*xspace, canvas.height - (yoff + i*yspace));
        }
        else if (j == 0)
        {
          ctx.beginPath();
          ctx.fillStyle = 'grey';
          ctx.fillText(notesNames[note], xoff - 0.5*xspace, canvas.height - (yoff + i*yspace));
        }
      }
    }
  }
}