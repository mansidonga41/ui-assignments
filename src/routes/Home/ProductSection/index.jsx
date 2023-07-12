import React, { useEffect, useState } from "react";
import ProductDetails from "../../../components/ProductDetails";
import SingleProduct from "../../../components/SingleProduct";
import "./ProductSection.scss";
import { ApiGetNoAuth } from "../../../services/api";
import { useAtom } from "jotai";
import { originalProductsData, productsData } from "../../../jotai/addToCart";

export default function ProductSection(props) {
  const [products, setProducts] = useAtom(productsData);
  const [originalProducts, setOriginalProducts] = useAtom(originalProductsData);
  const [toogle, setToogle] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getAllProducts = async () => {
    let productsData = await ApiGetNoAuth("products");

    if (productsData) {
      let categoryData = [];
      let tempProductsData = [];
      productsData?.data?.products?.map((data) => {
        categoryData.push(data?.category);
        tempProductsData.push({
          ...data,
          quantity: 1,
          totalPrice: data?.price,
        });
      });
      setCategoryList([...new Set(categoryData)]);
      setProductsList(tempProductsData);
      setProducts(tempProductsData);
      setOriginalProducts(tempProductsData);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    setProductsList(products);
  }, [products]);

  return (
    <div>
      <div className="product-section-all-contnet-alignment">
        <div className="container">
          <div className="title">
            <h1>Best Selling Products</h1>
          </div>
          <div className="grid">
            {productsList &&
              productsList.map((product, index) => {
                return (
                  <div className="grid-items" key={index}>
                    <SingleProduct
                      index={index}
                      setToogle={setToogle}
                      toogle={toogle}
                      product={product}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      productsList={productsList}
                      setProductsList={setProductsList}
                      setSelectedIndex={setSelectedIndex}
                      selectedIndex={selectedIndex}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ProductDetails
        setToogle={setToogle}
        toogle={toogle}
        selectedProduct={selectedProduct}
        productsList={productsList}
        setProductsList={setProductsList}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}
