import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./state/store"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './mainStyles.scss';
import { SimulatorPage } from './pages/SimulatorPage/SimulatorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SimulatorPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
