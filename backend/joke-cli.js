// Import required modules
const fs = require('fs');
const request = require('request');

// Define API URL
const apiUrl = 'https://icanhazdadjoke.com/search';

// Function to make API request
const getJokes = (searchTerm, callback) => {
  const options = {
    url: `${apiUrl}?term=${encodeURIComponent(searchTerm)}`,
    headers: {
      'Accept': 'application/json',
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const jokes = JSON.parse(body).results;
      callback(null, jokes);
    } else {
      callback(error || 'Failed to fetch jokes from API');
    }
  });
};

// Function to save joke to file
const saveJokeToFile = (joke) => {
  fs.appendFile('jokes.txt', `${joke}\n`, (err) => {
    if (err) throw err;
    console.log('Joke saved to jokes.txt!');
  });
};

// Function to display a random joke
const displayRandomJoke = (jokes) => {
  if (jokes.length > 0) {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex].joke;
    console.log('\u{1F600} Here is a joke for you:');
    console.log(randomJoke);
    saveJokeToFile(randomJoke);
  } else {
    console.log('Sorry, no jokes found for the given search term. The joke gods are taking a day off!');
  }
};

// Function to display the leaderboard
const displayLeaderboard = () => {
  fs.readFile('jokes.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading jokes.txt file');
      return;
    }

    const jokes = data.split('\n').filter((line) => line.trim() !== '');
    if (jokes.length > 0) {
      const jokeCountMap = {};
      jokes.forEach((joke) => {
        if (!jokeCountMap[joke]) {
          jokeCountMap[joke] = 1;
        } else {
          jokeCountMap[joke]++;
        }
      });

      let mostPopularJoke = '';
      let maxCount = 0;

      Object.entries(jokeCountMap).forEach(([joke, count]) => {
        if (count > maxCount) {
          mostPopularJoke = joke;
          maxCount = count;
        }
      });

      console.log('And now, the most popular joke of all time:');
      console.log(mostPopularJoke);
      console.log(`With ${maxCount} laughs!`);
    } else {
      console.log('No jokes found in the jokes.txt file. The leaderboard is empty.');
    }
  });
};


// Command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Handle different commands
if (command === 'leaderboard') {
  displayLeaderboard();
} else {
  const searchTerm = command || 'random'; // Default to random joke if no search term is provided
  getJokes(searchTerm, (error, jokes) => {
    if (error) {
      console.error(error);
    } else {
      displayRandomJoke(jokes);
    }
  });
}