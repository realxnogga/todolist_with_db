import { Provider } from "react-redux";
import { LandingPage } from "./page/landingpage";
import { Store } from "./store";

function App() {
  return (
    <Provider store={Store}>
      <LandingPage />
    </Provider>
  );
}

export default App;
