import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./state/store"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './mainStyles.scss';
import { SimulatorPage } from './pages/SimulatorPage/SimulatorPage'
import { LevelsPage } from './pages/LevelsPage/LevelsPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SimulatorPage />
  },

  {
    path: '/levels',
    element: <LevelsPage />
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>,
)
