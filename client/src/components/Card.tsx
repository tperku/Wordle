import { useEffect, useState } from "react";
import Popup from "./Popup";
import Delete from "./Delete";

function Card({ word, id }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const closePopup = () => setIsOpen(false);
  const closeDeletePopup = () => setDeleteIsOpen(false);

  function togglePopup() {
    setIsOpen(!isOpen);
  }
  function toggleDeletePopup() {
    setDeleteIsOpen(!deleteIsOpen);
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpen &&
        event.target &&
        !(event.target as Element).closest(".popup")
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        deleteIsOpen &&
        event.target &&
        !(event.target as Element).closest(".popup")
      ) {
        setDeleteIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [deleteIsOpen]);

  return (
    <div className="card">
      {isOpen && <Popup word={word} id={id} closePopup={closePopup} />}
      {deleteIsOpen && (
        <Delete word={word} id={id} closePopup={closeDeletePopup} />
      )}
      <div>{word}</div>
      <button onClick={togglePopup}>Edit</button>
      <button onClick={toggleDeletePopup}>Delete</button>
    </div>
  );
}
export default Card;
