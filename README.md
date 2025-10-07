# Movies MCP Server

A Model Context Protocol (MCP) server that provides access to the TMDB (The Movie Database) API for searching and retrieving movie information.

## Features

This MCP server provides the following tools:

- **search_movies** - Search for movies by title or keywords
- **get_movie_details** - Get detailed information about a specific movie
- **get_popular_movies** - Get a list of currently popular movies
- **get_top_rated_movies** - Get a list of top rated movies
- **get_now_playing_movies** - Get a list of movies currently in theaters
- **get_upcoming_movies** - Get a list of upcoming movies

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

### Running the server

```bash
npm start
```

### Configuration for Claude Desktop

Add this to your Claude Desktop configuration file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "movies": {
      "command": "node",
      "args": [
        "/Users/ravikantcherukuri/src/github/rkdeexit/moviesmcp/dist/index.js"
      ]
    }
  }
}
```

## Example Queries

Once configured in Claude Desktop, you can ask Claude questions like:

- "Search for movies about space exploration"
- "What are the most popular movies right now?"
- "Get details about the movie with ID 550" (Fight Club)
- "What are the top rated movies?"
- "What movies are coming out soon?"

## Development

- Watch mode: `npm run watch`
- Build: `npm run build`

## API Key

The TMDB API key is embedded in the source code. For production use, consider moving it to environment variables.

## License

MIT
