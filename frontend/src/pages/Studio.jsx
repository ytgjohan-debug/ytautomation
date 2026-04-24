import { Link } from "react-router-dom";

export default function Studio() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Studio</h1>

      <p>Select a step to continue:</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/studio/players">
          <button>Step 1: Scan Players</button>
        </Link>

        <br /><br />

        <Link to="/studio/script">
          <button>Step 2: Generate Script</button>
        </Link>

        <br /><br />

        <Link to="/studio/video">
          <button>Step 3: Create Video</button>
        </Link>
      </div>
    </div>
  );
}
