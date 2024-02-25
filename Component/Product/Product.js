import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";

export default function Product() {
  const navigate = useNavigate();
  const id = useParams();
  console.log(id);
  const [data, setData] = useState({});
  console.log(id.id);
  useEffect(() => {
    handleClick();
  }, []);
  const handleClick = () => {
    axios.get(`https://dummyjson.com/products/${id.id}`)
    .then((res) => {
      setData(res.data);
    });
  };
  console.log(data);
  console.log();
  const handleCLick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="parent">
        <div className="subParent">
          <div className="child1">
            <img src={data.thumbnail} className="IMG" alt=".." />
          </div>
          <div className="child2">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <h4>🏷️RS ₹{data.price}</h4>
            <h4>⭐ {data.rating}</h4>
            <h4>{data.brand}</h4>
          </div>
          <center>
            <button className="btn" onClick={handleCLick}>
              Back
            </button>
          </center>
        </div>
      </div>
    </>
  );
}