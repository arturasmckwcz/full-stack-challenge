import { graphql } from 'graphql';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from './graphql/resolvers';

const typeDefs = readFileSync('./src/graphql/schema.graphql', {
  encoding: 'utf-8',
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

describe('Schema', () => {
  describe('rooms', () => {
    it('should return result of proper type', async () => {
      const roomsQueryDocument = `
        {
          rooms {
            id
            name
            description
            image
            booked
            desks
          }
        }
      `;
      const response = (await graphql({
        schema,
        source: roomsQueryDocument,
      })) as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { rooms: Record<string, any>[] };
      };

      expect(Object.keys(response?.data?.rooms[0])).toEqual([
        'id',
        'name',
        'description',
        'image',
        'booked',
        'desks',
      ]);
    });
  });
});
