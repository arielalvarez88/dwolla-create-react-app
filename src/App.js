import { CreateCustomer } from "./CreateCustomer";
import "./App.css";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <div className="App">
      <Dialog visible="true">
        <CreateCustomer />
      </Dialog>
    </div>
  );
}

export default App;
