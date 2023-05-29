import { JSXElementConstructor } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { IRoomsContext, RoomsProvider } from '../../contexts/RoomsContext';
import { RoomsDocument } from '../../graphql';
import fixtures from '../e2e/testFixtures.json';

export const renderWithContext = (
  ui: React.ReactElement<any, string | JSXElementConstructor<any>>,
  contextValue?: IRoomsContext,
) =>
  contextValue ? (
    <RoomsProvider value={contextValue}>{ui}</RoomsProvider>
  ) : (
    <RoomsProvider>{ui}</RoomsProvider>
  );

export const renderWithContextAndMockedProvider = (
  ui: React.ReactElement<any, string | JSXElementConstructor<any>>,
  contextValue?: IRoomsContext,
) =>
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: RoomsDocument,
          },
          result: {
            data: {
              rooms: fixtures.data.rooms,
            },
          },
        },
      ]}
      addTypename={false}
    >
      {renderWithContext(ui, contextValue)}
    </MockedProvider>,
  );

export const waitALittleBit = () =>
  new Promise(resolve => setTimeout(resolve, 0));
