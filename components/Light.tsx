export default function Light() {
  return (
    <>
      <directionalLight position={[-2, 1.5, 3]} intensity={0.5} castShadow />
      <ambientLight intensity={0.5} />
    </>
  );
}
