import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";
import "./FormSize.css";

const sizeType = {
  quantity: 0,
  size_id: 0,
  product_id: 0,
};

function sizeForm({ hideForm, hideadd, hideFormadd }) {
  const { slug } = useParams();

  const [size, setSize] = useState(sizeType);
  const [sizes, setSizes] = useState([]);
  const [allsetSizes] = useState([]);
  const [allsizes2, allsetSizes2] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
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

  const openModal = (mode) => {
    setFormMode(mode);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSize(sizeType);
  };

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

  const getAllSizes2 = async () => {
    try {
      const myAllSizes = await connexion
        .get("/sizeslabel")
        .then((res) => res.data);
      allsetSizes2(myAllSizes);
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
    getAllSizes2();
  }, []);

  /* eslint-disable */
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
  /* eslint-enable */
  const putsize = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/products/size/${size.id}`, size);
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
      await connexion.delete(`/sizes/${id}`);
      getProducts();
      toast.success("Produit supprimé avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite.");
    }
  };

  const loadsize = async (sizeall) => {
    setSize(sizeall);
    openModal("put");
  };

  const handleRequest = (event) => {
    if (size.id) {
      putsize(event);
      closeModal();
    } else {
      postsize(event);
      closeModal();
    }
  };

  return (
    <div>
      {!hideForm && (
        <div>
          {!hideadd && (
            <div>
              {!hideFormadd && <h1>size Form</h1>}
              <button
                type="button"
                onClick={() => openModal("add")}
                className="form-button"
              >
                AJOUTER
              </button>
            </div>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <form onSubmit={handleRequest}>
              <label>
                Quantity
                <input
                  type="number"
                  name="quantity"
                  className="handle-size"
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
                  className="handle-size"
                  required
                  value={size.size_id}
                >
                  <option value={null}>Select Type</option>
                  {allsizes2 &&
                    allsizes2.map((allsize) => (
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
                  className="handle-size"
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
              <button type="submit" className="formsize-button">
                {formMode === "put" ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </Modal>
        </div>
      )}
      <section>
        {!hideFormadd && (
          <div>
            <h2 className="productsize-title">Toute les tailles du produit</h2>
            <table className="table-size">
              <tbody>
                {sizes.stock &&
                  sizes.stock.map((sizeall) => (
                    <tr key={sizeall.id}>
                      <div className="quantity">
                        <td className="quantity">
                          Quantité : {sizeall.quantity}
                        </td>
                        <td className="quantity">Taille : {sizeall.label}</td>
                      </div>
                      <td>
                        <button
                          type="button"
                          className="form-button"
                          onClick={() => loadsize(sizeall)}
                        >
                          MODIFIER
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="form-button"
                          onClick={() => deleteProduct(sizeall.id)}
                        >
                          SUPPRIMER
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default sizeForm;
