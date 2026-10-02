export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="background-layer"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.45)), url('/background.jpg')",
      }}
    />
  );
}
