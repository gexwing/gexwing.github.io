function cKeyDraw(canvas, notes)
{
  // keyboard dimensions
  const xsize = 30;
  const xsizeblack = 20;
  const ysize = 100;
  const ysizeblack = 70;
  const ymargin = 10;
  const xmargin = 30;
  const keystart = 3; // start at 'C'
  const keynum = 24;
  const circsize = 9;

  function isBlackKey(key)
  {
    // keys, starting from 'C'
    const blackKeys = [false, true, false, true, false, false, true, false, true, false, true, false];
    return blackKeys[key % 12] == 1;
  };

  function calcKeyOffset(key)
  {
    // key offsets from 'C'
    const blackKeysOffset = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5];
    let val = (Math.floor(key / 12)*7 + blackKeysOffset[key % 12]);
    return val;
  };

  if (canvas.getContext)
  {
    // Resize
    canvas.height = ysize + 2*ymargin;
    canvas.width = calcKeyOffset(keynum)*xsize + xmargin;

    // Clear
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Default Values
    ctx.font = '11px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';

    // White Keys
    for (var j = 0; j < keynum; j++)
    {
      if (isBlackKey(j) == true) { continue; }
      ctx.strokeRect(xmargin + (calcKeyOffset(j)-0.5)*xsize, ymargin, xsize, ysize);
    };
        
    // Black Keys
    for (var j = 0; j < keynum; j++)
    {
      if (isBlackKey(j) == false) { continue; }
      ctx.fillRect(xmargin + calcKeyOffset(j)*xsize-xsizeblack/2, ymargin, xsizeblack, ysizeblack);
    };

    for (var j = 0; j < keynum; j++)
    {
      let note = (j + keystart) % 12;

      if (notes.includes(note))
      {
        ctx.beginPath();
        ctx.strokeStyle = (note == notes[0]) ? 'white' : 'black';
        ctx.fillStyle   = (note == notes[0]) ? 'red' : 'white';
        if (isBlackKey(j) == true)
        {
          ctx.arc(xmargin + calcKeyOffset(j)*xsize, ymargin + ysizeblack - 2*circsize, circsize, 0, Math.PI * 2, true);
        }
        else
        {
          ctx.arc(xmargin + calcKeyOffset(j)*xsize, ymargin + ysize - 2*circsize, circsize, 0, Math.PI * 2, true);
        }
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        if (isBlackKey(j) == true)
        {
          ctx.fillText(notesNames[note], xmargin + calcKeyOffset(j)*xsize, ymargin + ysizeblack - 2*circsize);
        }
        else
        {
          ctx.fillText(notesNames[note], xmargin + calcKeyOffset(j)*xsize, ymargin + ysize - 2*circsize);
        }
      }
    }
  }
}