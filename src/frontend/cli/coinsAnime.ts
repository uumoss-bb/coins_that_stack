import * as readline from 'readline';

// Define the interface for the Coin
interface Coin {
  x: number;
  y: number;
  falling: boolean;
}

// Clear the screen and set up for animation
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);

const width = 50; // Width of the terminal
const height = 10;   // Height of the terminal

// Array to hold positions of falling coins
let coins: Coin[] = [];
const dropDuration = 1000; // Duration to drop coins quickly (in milliseconds)
const stackHeight: number[] = Array(width).fill(height - 1); // Track stack height for each column

// Function to update coin positions
function updateCoins(): void {
  // Add new coins at random positions while still in the drop phase
  if (Date.now() - startTime < dropDuration) {
    const numOfNewCoins = Math.floor(Math.random() * 5)
    for (let index = 0; index <= numOfNewCoins; index++) {
      const newCoinX = Math.floor(Math.random() * width);
      coins.push({ x: newCoinX, y: 0, falling: true });
    }
  }

  // Move each falling coin down
  coins = coins.map(coin => {
    // If the coin has reached the stack height, it stops falling
    if (coin.falling && coin.y + 1 >= stackHeight[coin.x]) {
      coin.falling = false;
      stackHeight[coin.x]--; // Adjust the stack height for this column
    }
    return coin.falling ? { ...coin, y: coin.y + 1 } : coin;
  });
}

// Function to render coins
function render(): void {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  // Draw each coin at its current position
  coins.forEach(coin => {
    readline.cursorTo(process.stdout, coin.x, coin.y);
    if(coin.falling) {
      process.stdout.write('O'); // Coin symbol
    } else {
      process.stdout.write('='); // Coin symbol
    }
  });
}

const startTime = Date.now();

// Run the animation
const intervalId = setInterval(() => {
  updateCoins();
  render();
}, 50); // Faster interval for quicker animation

// Stop animation after a set time (optional)
setTimeout(() => {
  clearInterval(intervalId);
  process.exit(0);
}, dropDuration + 1500); // Run for 3 seconds after the drop duration to show the final stack
