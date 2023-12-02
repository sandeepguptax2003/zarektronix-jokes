# Joke API Command Line Tool

## Description
This command line tool interacts with the "icanhazdadjoke" API to fetch and display jokes based on user-defined search terms. Additionally, it provides functionality to save jokes for future laughs and showcases the most popular joke in a leaderboard format.

## Requirements
- Node.js
- fs module (for file reading and writing)
- process module (for command line arguments)
- request module (for making API requests)

## Features
- **Search Jokes**: Allows users to search for jokes based on a given search term.
- **Random Joke Display**: Displays a random joke fetched from the API matching the search term.
- **Saving Jokes**: Saves the selected joke to a 'jokes.txt' file for future amusement.
- **Error Handling**: Provides witty error messages when no jokes are found for the search term.
- **Leaderboard**: Implements a feature to display the most popular joke stored in 'jokes.txt' with the number of laughs it received.

## Example
To run the tool, use the following command:
```bash
1.Search for a Joke:
node joke-cli.js [searchTerm]

2.View Leaderboard:
node joke-cli.js [leaderboard]

## Usage
searchTerm: Search for jokes based on the provided term (e.g., `node jokeTool.js unicorn`).
leaderboard: Display the most popular joke stored in the 'jokes.txt' file.

## Code Overview
The code contains functions to interact with the API, handle file operations, display random jokes, and manage the leaderboard feature. It's organized into modular functions for ease of understanding and maintenance.