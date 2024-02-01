import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductForm from "../components/FormProduct";
import connexion from "../services/connexion";
import SizeForm from "../components/FormSize";

function EditProductForm() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [types] = useState([]);
  const [seasons] = useState([]);

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
      <Link to="/administration">Retour à l'administration</Link>
      <h1>Edit {product.name}</h1>
      <ProductForm
        preFilledProduct={product}
        types={types}
        seasons={seasons}
        formMode="put"
        hideAllProducts
        hideForm={false}
        AddButton
      />
      <SizeForm />
    </div>
  );
}

export default EditProductForm;
