import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

function Products() {
  // const [products, setproducts] = useState(null);
  const { data: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const productItems = await fetch(`http://fakestoreapi.com/products`);
    //   const jsonProducts = await productItems.json();
    //   setproducts(jsonProducts);
    // };
    // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2 className="text-2xl font-semibold pt-8">Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2 className="text-2xl font-semibold pt-8">
        OOPS!! Something went wrong...
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-3 max-w-7xl grid-flow-row py-10 justify-items-center gap-8">
      {products &&
        products.map((item) => (
          <div
            key={item?.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#" className="flex justify-center py-4">
              <img
                width={100}
                height={100}
                src={item?.image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5 pt-6">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item?.title}
                </h5>
              </a>
              <div className="flex items-center justify-between pt-8">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${item?.price}
                </span>
                <button
                  href="#"
                  onClick={() => handleAdd(item)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Products;
