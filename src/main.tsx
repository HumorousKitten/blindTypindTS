import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./state/store"
import { router } from './routes/Routes'
import {RouterProvider} from "react-router-dom";
import './mainStyles.scss';



ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>,
)
