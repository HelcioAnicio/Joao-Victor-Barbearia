export function Diamond({ size = 10 }: { size?: number }) {
  return (
    <span
      className="djv-diamond"
      aria-hidden="true"
      style={{ width: size, height: size }}
    />
  );
}
