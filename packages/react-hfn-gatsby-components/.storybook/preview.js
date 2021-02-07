import { ReactReduxFirebase, ReduxProvider } from './decorators'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [ReduxProvider, ReactReduxFirebase]
