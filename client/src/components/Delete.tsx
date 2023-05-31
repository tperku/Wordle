import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const DELETE_URL = "/admin/word";

function Delete({ word, id, closePopup }: any) {
  const axiosPrivate = useAxiosPrivate();

  async function handleYes() {
    try {
      const response = await axiosPrivate.delete(DELETE_URL, {
        data: { word, id },
      });
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
        <h1>Delete word: {word} </h1>
        <div className="popupBody">
          <button className="submitButton" onClick={handleYes}>
            Yes
          </button>
          <button className="submitButton" onClick={closePopup}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
