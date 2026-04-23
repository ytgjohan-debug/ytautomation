import { useNavigate } from "react-router-dom";

export default function Step3Video() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Step 3: Create Video</h1>

      <p>Video generation coming soon...</p>

      <button onClick={() => navigate("/studio/script")}>← Back</button>
    </div>
  );
}