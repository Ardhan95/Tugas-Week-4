import { useState } from "react";

function Card({ nama, deskripsi, icon }) {
  const [likes, setLikes] = useState(0);

  const tambahLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="card">
      <div className="icon">{icon}</div>

      <h3>{nama}</h3>

      <p>{deskripsi}</p>

      <button onClick={tambahLike}>
        ❤️ Like ({likes})
      </button>
    </div>
  );
}

export default Card;