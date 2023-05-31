import { useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const EDIT_URL = "/admin/word";

function Popup({ word, id, closePopup }: any) {
  const axiosPrivate = useAxiosPrivate();
  const [newWord, setNewWord] = useState(word);
  async function handleEdit() {
    try {
      const response = await axiosPrivate.put(EDIT_URL, { word: newWord, id });
      console.log(response.data);
      closePopup();
    } catch (err) {
      console.log(err);
      closePopup();
    }
  }

  return (
    <>
      <div className="popup">
        <h1>Edit word: {word} </h1>
        <div className="popupBody">
          <label htmlFor="editword">New word</label>
          <input
            type="text"
            id="editword"
            onChange={(e) => setNewWord(e.target.value)}
            value={newWord}
          />
          <button onClick={handleEdit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Popup;
