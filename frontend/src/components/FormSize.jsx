import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";

const sizeType = {
  quantity: 0,
  size_id: 0,
  product_id: 0,
};

function sizeForm(isCreation) {
  const { slug } = useParams();
  const [size, setSize] = useState(sizeType);
  const [sizes, setSizes] = useState([]);
  const [allsizes, allsetSizes] = useState([]);
  const [products, setProducts] = useState([]);

  const getSizes = async () => {
    try {
      const mySizes = await connexion
        .get(`/products/${slug}`)
        .then((res) => res.data);
      setSizes(mySizes);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllSizes = async () => {
    try {
      const myAllSizes = await connexion.get("/sizes").then((res) => res.data);
      allsetSizes(myAllSizes);
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
    getProducts();
    getAllSizes();
  }, []);

  const handlesize = (event) => {
    if (event.target.name === "size_id") {
      setSize((previousState) => ({
        ...previousState,
        [event.target.name]: +event.target.value,
      }));
    } else {
      setSize((previousState) => ({
        ...previousState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const putsize = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/size/${size.id}`, size);
      getSizes();
      toast.success("Produit modifié avec succès !");
    } catch (error) {
      toast.error("Une erreur s'est produite.");
      console.error(error);
    }
  };

  const postsize = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/products/size", size);
      getSizes();
      toast.success("Produit ajouté avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await connexion.delete(`/size/${id}`);
      getProducts();
      toast.success("Produit supprimé avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite.");
    }
  };

  const loadsize = async (prod) => {
    setSize(prod);
  };

  const handleRequest = (event) => {
    if (isCreation) {
      postsize(event);
    } else {
      putsize(event);
    }
  };

  return (
    <div>
      <h1>size Form</h1>
      <form onSubmit={handleRequest}>
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            required
            value={size.quantity}
            onChange={handlesize}
          />
        </label>
        <label>
          Size
          <select
            name="size_id"
            onChange={handlesize}
            required
            value={size.size_id}
          >
            <option value={null}>Select Type</option>
            {allsizes.map((allsize) => (
              <option value={allsize.id} key={allsize.id}>
                {allsize.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product
          <select
            name="product_id"
            onChange={handlesize}
            required
            value={size.product_id}
          >
            <option value={null}>Select Type</option>
            {products.map((product) => (
              <option value={product.id} key={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{isCreation ? "Ajouter" : "Modifier"}</button>
      </form>
      <section>
        <h2>All sizes</h2>
        <table>
          <thead>
            <tr>
              <td>quantity</td>
              <td>id</td>
              <td>label</td>
            </tr>
          </thead>
          <tbody>
            {sizes.stock &&
              sizes.stock.map((sizeall) => (
                <tr key={sizeall.id}>
                  <td>{sizeall.quantity}</td>
                  <td>{sizeall.id}</td>
                  <td>{sizeall.label}</td>
                  <td>
                    <button type="button" onClick={() => loadsize(size)}>
                      PUT
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteProduct(size.id)}
                    >
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

export default sizeForm;
