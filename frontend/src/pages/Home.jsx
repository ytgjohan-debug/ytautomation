import { useEffect, useState } from "react";
import Card from "../components/Card";
import StatsChart from "../components/StatsChart";
import { getChannelData } from "../services/youtubeAPI";

export default function Home() {
  const [channel, setChannel] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChannelData();
        setChannel(data);
      } catch (err) {
        console.error("API ERROR:", err);
      }
    }

    fetchData();
  }, []);

  // 📊 Save daily stats to localStorage
  useEffect(() => {
    if (!channel) return;

    const today = new Date().toLocaleDateString();

    let stored = JSON.parse(localStorage.getItem("statsHistory")) || [];

    const exists = stored.find((d) => d.date === today);

    if (!exists) {
      stored.push({
        date: today,
        views: Number(channel.statistics.viewCount),
      });

      localStorage.setItem("statsHistory", JSON.stringify(stored));
    }

    setChartData(stored);
  }, [channel]);

  if (!channel) {
    return <p style={{ padding: "30px" }}>Loading...</p>;
  }

  const stats = channel.statistics;
  const snippet = channel.snippet;

  // 🤖 AI Suggestions
  function getSuggestions() {
    const subs = Number(stats.subscriberCount);
    const videos = Number(stats.videoCount);
    const views = Number(stats.viewCount);

    let suggestions = [];
    const avgViews = views / videos;

    if (videos < 50) {
      suggestions.push("📹 You have low content volume — aim for 50+ videos.");
    }

    if (subs < 100) {
      suggestions.push("🚀 Use Shorts to grow subscribers faster.");
    }

    if (avgViews < 500) {
      suggestions.push("📉 Improve thumbnails and titles for more clicks.");
    } else {
      suggestions.push("📈 Your content performs well — double down.");
    }

    suggestions.push("⏱️ Stay consistent: 3–5 uploads per week.");

    return suggestions;
  }

  // 📊 Growth Score
  function getGrowthScore() {
    const subs = Number(stats.subscriberCount);
    const videos = Number(stats.videoCount);
    const views = Number(stats.viewCount);

    let score = 0;

    if (videos > 30) score += 30;
    if (subs > 50) score += 30;
    if (views / videos > 500) score += 40;

    return score;
  }

  return (
    <>
      <Navbar />

      <div className="container">

        {/* CHANNEL HEADER */}
        <div className="channel-header">
          <img src={snippet.thumbnails.default.url} alt="channel" />
          <div>
            <h2>{snippet.title}</h2>
            <p>{Number(stats.subscriberCount).toLocaleString()} subscribers</p>
          </div>
        </div>

        {/* GROWTH SCORE */}
        <div className="growth-score">
          <h2>Growth Score</h2>
          <p>{getGrowthScore()}/100</p>
        </div>

        <h1>Dashboard</h1>

        {/* STATS */}
        <div className="cards">
          <Card
            title="Views"
            value={Number(stats.viewCount).toLocaleString()}
          />
          <Card
            title="Subscribers"
            value={Number(stats.subscriberCount).toLocaleString()}
          />
          <Card
            title="Videos"
            value={Number(stats.videoCount).toLocaleString()}
          />
        </div>

        {/* 📈 REAL GRAPH */}
        <StatsChart data={chartData} />

        {/* AI SUGGESTIONS */}
        <div className="insights">
          <h2>AI Suggestions</h2>
          <ul>
            {getSuggestions().map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}