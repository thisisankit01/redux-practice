import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const itemsNumber = useSelector((state) => state.cart);

  return (
    <div className="flex w-full align-middle justify-around py-6 border-2">
      <span className="text-xl font-semibold">REDUX STORE</span>
      <div className="flex gap-14 text-lg">
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
      <span className="text-lg">
        Cart Items : {itemsNumber && itemsNumber.length}
      </span>
    </div>
  );
}

export default Navbar;
