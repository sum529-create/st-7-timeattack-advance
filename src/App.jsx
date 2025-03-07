import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import Router from "./shared/Router";

function App() {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
