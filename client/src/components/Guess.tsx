function Guess({ word, guesses, color }: any) {
  return (
    <div className="guessWord">
      {new Array(5).fill(0).map((_, i) => (
        <div
          key={i}
          className={`letterBox ${color[i]} ${
            word[i] && "letterBoxWithBorder"
          }`}
        >
          {guesses[i] || word[i]}
        </div>
      ))}
    </div>
  );
}

export default Guess;
