export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0
        z-0
        bg-cover bg-center bg-no-repeat
      "
      style={{
        backgroundImage:
          "linear-gradient(rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.45)), url('/background.jpg')",
      }}
    />
  );
}
