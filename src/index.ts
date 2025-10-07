#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from './tmdb.js';

/**
 * Movies MCP Server
 * Provides tools for interacting with the TMDB API
 */
const server = new Server(
  {
    name: 'movies-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_movies',
        description: 'Search for movies by title or keywords',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (movie title or keywords)',
            },
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
              default: 1,
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_movie_details',
        description: 'Get detailed information about a specific movie by ID',
        inputSchema: {
          type: 'object',
          properties: {
            movie_id: {
              type: 'number',
              description: 'TMDB movie ID',
            },
          },
          required: ['movie_id'],
        },
      },
      {
        name: 'get_popular_movies',
        description: 'Get a list of popular movies',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_top_rated_movies',
        description: 'Get a list of top rated movies',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_now_playing_movies',
        description: 'Get a list of movies currently in theaters',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_upcoming_movies',
        description: 'Get a list of upcoming movies',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination (default: 1)',
              default: 1,
            },
          },
        },
      },
    ],
  };
});

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error('Missing arguments');
    }

    switch (name) {
      case 'search_movies': {
        const query = args.query as string;
        const page = (args.page as number) || 1;
        const results = await searchMovies(query, page);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_movie_details': {
        const movieId = args.movie_id as number;
        const details = await getMovieDetails(movieId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(details, null, 2),
            },
          ],
        };
      }

      case 'get_popular_movies': {
        const page = (args.page as number) || 1;
        const results = await getPopularMovies(page);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_top_rated_movies': {
        const page = (args.page as number) || 1;
        const results = await getTopRatedMovies(page);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_now_playing_movies': {
        const page = (args.page as number) || 1;
        const results = await getNowPlayingMovies(page);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_upcoming_movies': {
        const page = (args.page as number) || 1;
        const results = await getUpcomingMovies(page);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Movies MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
