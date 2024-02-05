import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/FormProduct";
import connexion from "../services/connexion";
import SizeForm from "../components/FormSize";
import { useAuthContext } from "../context/auth";
import "./EditProductForm.css";

function EditProductForm() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [types] = useState([]);
  const [seasons] = useState([]);

  const { connected } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (connected.role_id !== 2) {
      navigate("/");
    }
  }, [connected]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await connexion.get(`/products/${slug}`);
        setProduct(productResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slug]);
  return (
    <div>
      <Link to="/administration" className="link-return">
        <p className="link-return">🠔 Retour à l'administration</p>
      </Link>
      <ProductForm
        preFilledProduct={product}
        types={types}
        seasons={seasons}
        formMode="put"
        hideAllProducts
        hideForm={false}
        AddButton
      />
      <SizeForm hideadd />
    </div>
  );
}

export default EditProductForm;
