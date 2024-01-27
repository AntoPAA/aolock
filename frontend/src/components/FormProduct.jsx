import React, { useState, useEffect } from "react";
import Modal from "react-modal";
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
  size_id: null,
  type_id: null,
  season_id: null,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ProductForm() {
  const [product, setProduct] = useState(productType);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");

  const openModal = (mode) => {
    setFormMode(mode);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setProduct(productType);
  };

  const getSizes = async () => {
    try {
      const mySizes = await connexion.get("/sizes").then((res) => res.data);
      setSizes(mySizes);
    } catch (error) {
      console.error(error);
    }
  };

  const getTypes = async () => {
    try {
      const myTypes = await connexion.get("/types").then((res) => res.data);
      setTypes(myTypes);
    } catch (error) {
      console.error(error);
    }
  };

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
    getSizes();
    getTypes();
    getSeasons();
    getProducts();
  }, []);

  const handleProduct = (event) => {
    if (event.target.name === "size_id") {
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
      toast.success("Produit modifié avec succès !");
    } catch (error) {
      toast.error("Une erreur s'est produite.");
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
      toast.success("Produit supprimé avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite.");
    }
  };

  const loadProduct = async (prod) => {
    setProduct(prod);
    openModal("put");
  };

  const handleRequest = (event) => {
    if (product.id) {
      putProduct(event);
      closeModal();
    } else {
      postProduct(event);
      closeModal();
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <button type="button" onClick={() => openModal("add")}>
        ADD
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Product Form Modal"
      >
        <form onSubmit={handleRequest}>
          <label>
            Name
            <input
              type="text"
              name="name"
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
              required
              value={product.price}
              onChange={handleProduct}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
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
              value={product.img_zoom}
              onChange={handleProduct}
            />
          </label>
          <label>
            Size
            <select
              name="size_id"
              onChange={handleProduct}
              required
              value={product.size_id}
            >
              <option value={null}>Select Size</option>
              {sizes.map((size) => (
                <option value={size.id} key={size.id}>
                  {size.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select
              name="type_id"
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
          <button type="submit">
            {formMode === "put" ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </Modal>
      <section>
        <h2>All Products</h2>
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>price</td>
              <td>Image</td>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>
                  <img src={prod.img_front} alt={`Product: ${prod.name}`} />
                </td>
                <td>
                  <button type="button" onClick={() => loadProduct(prod)}>
                    PUT
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteProduct(prod.id)}>
                    del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default ProductForm;
