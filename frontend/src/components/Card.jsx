export default function Card({ title, value, change }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className="change">{change}</span>
      </div>
      <p>{value}</p>
    </div>
  );
}