import "./App.css";
import Modal from "react-modal";
import Layout from "./Layout";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const appRoot = document.getElementById("root");

  if (appRoot) {
    Modal.setAppElement(appRoot);
  }

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
