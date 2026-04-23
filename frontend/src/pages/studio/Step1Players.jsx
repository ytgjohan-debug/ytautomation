import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step1Players() {
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newCount, setNewCount] = useState(0);
  const [totalDB, setTotalDB] = useState(0);

  const navigate = useNavigate();

  async function generatePlayers() {
    if (!sport) {
      alert("Enter a sport");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/scan-players?sport=${encodeURIComponent(sport)}`
      );

      const data = await res.json();

      console.log("API RESPONSE:", data); // 🔍 debug

      setPlayers(data.players || []);
      setNewCount(data.new_count || 0);
      setTotalDB(data.total_database || 0);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Error fetching players");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Step 1: Scan Players</h1>

      <input
        type="text"
        placeholder="Enter sport (e.g. rugby)"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button
        onClick={generatePlayers}
        style={{
          background: "red",
          color: "white",
          padding: "8px 15px",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Scanning..." : "Scan Players"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <p><strong>New Players:</strong> {newCount}</p>
        <p><strong>Total Database:</strong> {totalDB}</p>
      </div>

      <ul>
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      {players.length > 0 && (
        <button
          onClick={() => navigate("/studio/script")}
          style={{
            marginTop: "20px",
            background: "red",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}