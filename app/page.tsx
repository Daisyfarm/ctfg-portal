const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    
    // Adjusted sizes to cover more area
    const width = 45;   // Increased from 35 to stretch wider
    const height = 30;  // Increased from 25 to stretch taller
    
    // Adjusted starting points to shift the grid
    const startX = 180;  // Moves the grid slightly higher up
    const startY = -250; // Moves the grid further to the left
    
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };
