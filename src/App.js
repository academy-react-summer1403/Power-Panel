import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

// ** Router Import
import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
