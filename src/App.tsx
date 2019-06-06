import React from "react";
import "./App.css";

import GameWrapper from "./components/2048/GameWrapper";

const App: React.FC = () => {
  return (
    <div className="App">
      <GameWrapper open={true} />
    </div>
  );
};

export default App;
