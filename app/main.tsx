import { hydrateRoot } from 'react-dom/client';
import Home from './page';
import './globals.css';
hydrateRoot(document.getElementById('root')!, <Home />);
