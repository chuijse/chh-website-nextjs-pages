export default function Divider({ size = "normal" }) {
  return (
    <div className="divider-root">
      <div className={`${size}`} />
    </div>
  );
}
