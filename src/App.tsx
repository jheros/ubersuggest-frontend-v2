import { RouterProvider } from 'react-router-dom';
import UberRouter from 'routes';

import './App.css';

function App() {
  return <RouterProvider router={UberRouter} fallbackElement={<p>Loading...</p>} />;
}

export default App;
