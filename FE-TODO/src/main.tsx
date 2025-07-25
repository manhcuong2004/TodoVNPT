import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client.ts';
import 'antd/dist/reset.css';
import { NotificationProvider } from './components/Common/NotificationProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </NotificationProvider>

  </StrictMode>
);