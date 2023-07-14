import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { textApi } from '../services/api'
import { configureStore } from '@reduxjs/toolkit'

type WrapperProps = {
  children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const middleware = [thunk, textApi.middleware]
  const store = configureStore({
    middleware,
    reducer: {
      [textApi.reducerPath]: textApi.reducer,
    },
  })

  return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: JSX.Element) => render(ui, { wrapper: Wrapper })

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
// eslint-disable-next-line react-refresh/only-export-components
export { customRender as render }
