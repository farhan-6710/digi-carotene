import { RouterProvider } from "react-router";

import { ThemePreferenceProvider } from "./providers/admin/ThemePreferenceProvider";
import { router } from "./router";

function App() {
  return (
    <ThemePreferenceProvider>
      <RouterProvider router={router} />
    </ThemePreferenceProvider>
  );
}

export default App;
