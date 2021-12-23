import React from "react";
import ProductForm from "./components/product-form";
import ProductList from "./components/product-list";
import './app.css';

const App = () => {
    return <main className="container">
        <ProductForm />
        <ProductList />
    </main>
};

export default App;