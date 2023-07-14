import ReactDOM from 'react-dom/client';
import '../i18n.ts';
import App from './App.tsx';
import { GlobalStateProvider } from './context/global';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
);
