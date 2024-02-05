import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";
import "./FormProduct.css";

const productType = {
  name: "",
  price: 0,
  description: "",
  img_front: "",
  img_back: "",
  img_zoom: "",
  type_id: null,
  season_id: null,
};

function ProductForm({
  preFilledProduct,
  hideAllProducts,
  isCreation,
  hideForm,
  AddButton,
}) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(preFilledProduct || productType);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const getTypes = async () => {
    try {
      const myTypes = await connexion.get("/types").then((res) => res.data);
      setTypes(myTypes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProduct(preFilledProduct || productType);
  }, [preFilledProduct]);

  const getSeasons = async () => {
    try {
      const mySeasons = await connexion.get("/seasons").then((res) => res.data);
      setSeasons(mySeasons);
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const myProducts = await connexion
        .get("/products")
        .then((res) => res.data);
      setProducts(myProducts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTypes();
    getSeasons();
    getProducts();
  }, []);

  const handleProduct = (event) => {
    if (event.target.name === "type_id") {
      setProduct((previousState) => ({
        ...previousState,
        [event.target.name]: +event.target.value,
      }));
    } else {
      setProduct((previousState) => ({
        ...previousState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const putProduct = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/products/${product.id}`, product);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const postProduct = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/products", product);
      getProducts();
      toast.success("Produit ajouté avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await connexion.delete(`/products/${id}`);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const loadProduct = async (prod) => {
    navigate(`/products/edit/${prod.slug}`);
  };

  const handleRequest = (event) => {
    if (isCreation) {
      postProduct(event);
    } else {
      putProduct(event);
    }
  };

  return (
    <div>
      {!AddButton && (
        <Link to="/products/add">
          <button type="button" className="form-button">
            AJOUTER
          </button>
        </Link>
      )}
      {!hideForm && (
        <form onSubmit={handleRequest} className="form-product">
          <h1 className="title-product">FORMULAIRE D'AJOUT</h1>
          <label>
            Name
            <input
              type="text"
              name="name"
              className="handle-product"
              required
              value={product.name}
              onChange={handleProduct}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              name="price"
              className="handle-product"
              required
              value={product.price}
              onChange={handleProduct}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              className="handle-product"
              required
              value={product.description}
              onChange={handleProduct}
            />
          </label>
          <label>
            Image Front
            <input
              type="url"
              name="img_front"
              className="handle-product"
              required
              value={product.img_front}
              onChange={handleProduct}
            />
          </label>
          <label>
            Image Back
            <input
              type="url"
              name="img_back"
              className="handle-product"
              required
              value={product.img_back}
              onChange={handleProduct}
            />
          </label>
          <label>
            Image Zoom
            <input
              type="url"
              name="img_zoom"
              className="handle-product"
              value={product.img_zoom}
              onChange={handleProduct}
            />
          </label>
          <label>
            Type
            <select
              name="type_id"
              className="handle-product"
              onChange={handleProduct}
              required
              value={product.type_id}
            >
              <option value={null}>Select Type</option>
              {types.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Season
            <select
              name="season_id"
              className="handle-product"
              onChange={handleProduct}
              required
              value={product.season_id}
            >
              <option value={null}>Select Season</option>
              {seasons.map((season) => (
                <option value={season.id} key={season.id}>
                  {season.label}
                </option>
              ))}
            </select>
          </label>
          <button className="form-button" type="submit">
            {isCreation ? "AJOUTER" : "MODIFIER"}
          </button>
        </form>
      )}
      {!hideAllProducts && (
        <section>
          <tbody className="body-card">
            {products.map((prod) => (
              <tr key={prod.id}>
                <div className="formadmin-container">
                  <td>
                    <img src={prod.img_front} alt={`Product: ${prod.name}`} />
                  </td>
                  <td className="product-name">{prod.name}</td>
                  <td>
                    <button
                      className="form-button"
                      type="button"
                      onClick={() => loadProduct(prod)}
                    >
                      MODIFIER
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="form-button-del"
                      onClick={() => deleteProduct(prod.id)}
                    >
                      SUPPRIMER
                    </button>
                  </td>
                </div>
              </tr>
            ))}
          </tbody>
        </section>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
}

ProductForm.propTypes = {
  preFilledProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    img_front: PropTypes.string,
    img_back: PropTypes.string,
    img_zoom: PropTypes.string,
    type_id: PropTypes.number,
    season_id: PropTypes.number,
  }),
  hideAllProducts: PropTypes.bool,
  hideForm: PropTypes.bool,
  isCreation: PropTypes.bool,
  AddButton: PropTypes.bool,
};

ProductForm.defaultProps = {
  preFilledProduct: null,
  hideAllProducts: false,
  hideForm: true,
  isCreation: false,
  AddButton: false,
};

export default ProductForm;
