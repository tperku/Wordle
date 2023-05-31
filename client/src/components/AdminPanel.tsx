import { useEffect, useState } from "react";
import Card from "./Card";
import NavBar from "./NavBar";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const LOGIN_URL = "/admin/words";

function AdminPanel() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  function setNumber() {
    setCounter(counter + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(LOGIN_URL);
        setData(response.data.body);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [counter]);
  return (
    <>
      <NavBar />
      <div>
        {data.map((val: any) => {
          return <Card key={val.id} id={val.id} word={val.word} />;
        })}
      </div>
      <div className="refreshButton">
        <button onClick={setNumber}>New Words</button>
      </div>
    </>
  );
}

export default AdminPanel;
