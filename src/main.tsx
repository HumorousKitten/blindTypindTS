import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./state/store"
import { router } from './routes/Routes'
import {RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './mainStyles.scss';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    // <Provider store={store}>
      // <RouterProvider router={router}/>
    // </Provider>
  // </React.StrictMode>,
  <QueryClientProvider client = {queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen = {false}/>
  </QueryClientProvider>
)
