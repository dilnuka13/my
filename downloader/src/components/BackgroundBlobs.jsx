export default function BackgroundBlobs() {
  return (
    <>
      {/* Background photo - same as main site */}
      <div className="bg-custom-image" aria-hidden="true"></div>
      {/* Animated blobs on top */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </>
  );
}
