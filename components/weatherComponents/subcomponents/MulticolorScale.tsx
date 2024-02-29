const MulticolorScale = ({ percentage, gradient }: { percentage: number, gradient: string }) => {
  return (
    <div
      style={{
        background:
          gradient,
        width: "100%",
        height: "1vh",
        borderRadius: "0.5vh",
      }}>
      <div
        style={{
          background: "white",
          marginLeft: `calc(${percentage}% - 0.25vw)`,
          width: "0.4vw",
          height: "1vh",
          borderRadius: "0.4vh",
          border: "1px solid black",
        }}></div>
    </div>
  );
};

export default MulticolorScale;
