import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RoutesApp } from "./routes";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "react-activity/dist/library.css";

import { ScreenSizeProvider } from "./context/screen-size/screen-size-context";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <ScreenSizeProvider>
        <RoutesApp />
      </ScreenSizeProvider>
    </QueryClientProvider>
  );
}

export default App;
