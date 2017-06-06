import * as React from 'react';

interface IAppProps {
  children?: React.ReactNode;
}

const App: React.SFC<IAppProps> = ({ children }) => (
  <div>
    {children}
  </div>
);

export default App;
