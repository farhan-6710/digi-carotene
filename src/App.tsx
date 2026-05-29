import { RouterProvider } from "react-router";

import { AuthProvider } from "./providers/AuthProvider";
import { ThemePreferenceProvider } from "./providers/admin/ThemePreferenceProvider";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <ThemePreferenceProvider>
        <RouterProvider router={router} />
      </ThemePreferenceProvider>
    </AuthProvider>
  );
}

export default App;
