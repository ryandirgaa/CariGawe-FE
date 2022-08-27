import React from "react";
import { UserProvider } from "./services/user-context";

import AppRoutes from "./routes";

function App() {
  React.useEffect(() => {
    document.title = "CariGawe"
  }, [])
  
  return (
    <UserProvider>
      <AppRoutes></AppRoutes>
    </UserProvider>
  )
}

export default App;
