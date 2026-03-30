const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Background Image */}
      <img
        src="/media/call-to-action.jpg"
        alt="background"
        className="w-full h-full object-cover object-center"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/100 md:bg-black/90 lg:bg-black/80 xl:bg-black/70" />
    </div>
  );
};

export default Background;