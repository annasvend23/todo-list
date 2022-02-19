import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { popupReducer } from '../redux/reducers/popupReducer';
import { toDoListReducer } from '../redux/reducers/toDoListReducer';

function render(
  ui: any,
  {
    preloadedState,
    store = configureStore({
      reducer: { popupReducer, toDoListReducer } as any,
      preloadedState,
    }),
    ...renderOptions
  } = {} as any
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
