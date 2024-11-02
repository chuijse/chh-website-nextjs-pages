export default function Divider({
  size = "long",
  thick = "normal",
  color = "normal",
}) {
  return (
    <div className="divider-root">
      <div className={`${size} ${thick} ${color}`} />
    </div>
  );
}
