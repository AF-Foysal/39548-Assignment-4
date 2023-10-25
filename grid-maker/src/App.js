import "./App.css";
import { Button } from "@mui/material";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Button variant="contained" color="success" style={{ color: "white" }}>
        Generate Column
      </Button>
      <Button variant="contained" color="success" style={{ color: "white" }}>
        Generate Row
      </Button>
      <Button variant="contained" color="error" style={{ color: "white" }}>
        Remove Column
      </Button>
      <Button variant="contained" color="error" style={{ color: "white" }}>
        Remove Row
      </Button>
    </div>
  );
}

export default App;
