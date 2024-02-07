import { useEffect, useState } from "react";
import { ProductCard } from "../ProductsPage/ProductCard.component.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderComponent } from "../loader/loader.component.jsx";

function UserProductsComponent() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("login")) navigate("/");

    id &&
      fetch(`${import.meta.env.VITE_API}/user/about/${id}`)
        .then((res) => res.json())
        .then((data) => setUserName(data.doc.info.about.username));

    const uid = id || localStorage.getItem("uid");

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/product/owner/${uid}`
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching user products:", error);
      }
    };

    fetchProducts();
  }, [id, navigate]);

  return (
    <>
      <div className=" container mx-auto my-8 mt-16">
        <h2 className="text-3xl font-bold mb-4">
          {id ? `Anzeigen von ${userName}` : "Eigene Produkte"}
        </h2>
        {products.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    favoriteText="Aus Favoriten entfernen"
                  />
                ))
              ) : (
                <p>Keine Produkte vorhanden.</p>
              )}
            </div>
          </>
        ) : (
          <LoaderComponent />
        )}
      </div>
    </>
  );
}

export default UserProductsComponent;
