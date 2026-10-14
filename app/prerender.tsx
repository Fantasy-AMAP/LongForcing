import { renderToString } from 'react-dom/server';
import Home from './page';
export const render = () => renderToString(<Home />);
