import { useContext } from "react";
import { StudioContext } from "../../context/StudioContext";
import { useNavigate } from "react-router-dom";

export default function Step2Script() {
  const { players, script, setScript } = useContext(StudioContext);
  const navigate = useNavigate();

  function generateScript() {
    const text = `Top players include: ${players.join(", ")}. This video highlights their skills and achievements.`;
    setScript(text);
  }

  return (
    <div className="container">
      <h1>Step 2: Generate Script</h1>

      <button onClick={generateScript}>Generate Script</button>

      <p>{script}</p>

      <button onClick={() => navigate("/studio")}>← Back</button>
      <button onClick={() => navigate("/studio/video")}>Next →</button>
    </div>
  );
}