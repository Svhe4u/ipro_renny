"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./styles.css"; // CSS файлыг импортлох

// Chart.js-ийг тохируулах
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/product/", {
          method: "post",
          body: JSON.stringify({
            action: "product",
          }),
        });
        const data = await res.json();
        const apiProducts = data.data[0].products;
        const apiCategories = data.data[0].categories;

        const newApiPro = [];
        apiProducts.forEach((e) => {
          newApiPro.push(e);
        });
        setProducts(newApiPro);

        const apiCat = [];
        apiCategories.forEach((e) => {
          apiCat.push(e);
        });
        setCategories(apiCat);
      } catch (e) {
        console.log(`###########error: ${e.message}`);
      }
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Хэрэглэгчийн бүртгэлтэй холбоотой мэдээлэл
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Бүртгэл хийх
  const handleRegister = () => {
    alert("Бүртгүүлэх хэсэг");
    // Бүртгэлд шаардлагатай кодыг энд оруулж болно
  };

  // Нэвтрэх
  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Алдаа: Нэвтрэх мэдээлэл буруу байна.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Хэрэглэгч гарах үед
    setUsername(""); // Нэвтрэх нэрийг устгана
    setPassword(""); // Нууц үгийг устгана
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const [newProduct, setNewProduct] = useState({
    action: "addProduct",
    name: "",
    category_id: "",
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((newProduct) => ({ ...newProduct, [name]: value }));
  };

  const addProduct = async () => {
    const newProductData = { ...newProduct };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });
      const data = await res.json();
      const updatePro = data.data[0];

      const { action, ...updatedProductData } = newProductData; // action-г хасах

      console.log(`##########: ${JSON.stringify(updatedProductData)}`);
      if (newProductData.id) {
        if (newProductData.id === updatePro.id) {
          setProducts((prePro) => [...prePro, { ...updatePro }]);
          console.log("tiiimeee");
        }
      } else {
        setProducts((prevProducts) => [
          ...prevProducts, // Хуучин барааны жагсаалтыг хуулна
          { ...newProductData }, // Шинэ барааг нэмнэ
        ]);
        // { ...newProductData, id: Date.now() }, // Түр ID үүсгэж, жагсаалтад нэмэх
      }
      setNewProduct({
        action: "addProduct",
        name: "",
        category_id: "",
        quantity: 0,
        price: 0,
      });

      alert("Success");
    } catch (error) {
      console.log("Бараа нэмэхэд алдаа гарлаа:", error);
    }
  };

  const handleDelete = (id) => {
    const productDelete = { action: "deleteProduct", id: id };
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/product/", {
          method: "POST",
          body: JSON.stringify(productDelete),
        });
        setProducts(products.filter((product) => product.id !== id));
        alert("Амжилттай устгалаа");
      } catch {
        alert("Устгаж чадсангүй");
      }
    };
    fetchData();
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct({
      name: productToEdit.name,
      action: "updateProduct",
      id: productToEdit.id,
      category_id: productToEdit.category_id,
      quantity: productToEdit.quantity,
      price: productToEdit.price,
    });
    setProducts(products.filter((product) => product.id !== id));
  };

  const lowStockAlert = products.filter((product) => product.quantity < 20);

  // Графикт оруулах борлуулалтын мэдээлэл
  const salesData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Борлуулалт (Ширхэг)",
        data: products.map((product) => product.sales),
        fill: false,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  // Барааны эргэлтийн статистик
  const rotationData = products.map((product) => {
    const rotationRate = product.sales / product.quantity;
    return { name: product.name, rotationRate: rotationRate.toFixed(2) };
  });

  return (
    <div className="container">
      {/* Нэвтрэх болон Бүртгүүлэх хэсэг */}
      {!isLoggedIn ? (
        <div className="login-register">
          <h2>Бараа бүртгэл систем</h2>
          <div>
            <input
              type="text"
              placeholder="Нэвтрэх нэр"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="loginButton" onClick={handleLogin}>
            Нэвтрэх
          </button>

          <button className="loginButton">Бүртгүүлэх</button>
        </div>
      ) : (
        <div>
          <h2>Тавтай морилно уу, {username}!</h2>

          <button className="logoutButton" onClick={handleLogout}>
            Гарах
          </button>
          {/* Барааны жагсаалт эсвэл бусад контент */}

          <div>
            <input
              type="text"
              placeholder="Бараа хайх"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="low-stock-alert">
            Нөөц бага байгаа бараанууд
            {lowStockAlert.length > 0 ? (
              <ul>
                {lowStockAlert.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.quantity} ширхэг үлдсэн
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нийт барааны тоо хангалттай байна.</p>
            )}
          </div>

          <h2>Барааны Жагсаалт</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Нэр</th>
                <th>Ангилал</th>
                <th>Тоо хэмжээ</th>
                <th>Үнэ</th>
                <th>Үнэ</th>
                <th>Үнэ</th>
                <th>Үнэ</th>
                <th>Үнэ</th>
                <th>Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts
                // .sort((a, b) => a.id - b.id)
                .map((product, i) => (
                  <tr key={product.id}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price} ₮</td>
                    <td>
                      <button onClick={() => handleEdit(product.id)}>
                        Засах
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        Устгах
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h2>Шинэ Бараа Нэмэх</h2>
          <form>
            <label>
              Нэр:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ангилал:
              <select
                name="category_id"
                value={newProduct.category_id}
                onChange={handleInputChange}
              >
                <option value="">Сонгоно уу</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Тоо хэмжээ:
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Үнэ:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </label>
            <button type="button" onClick={addProduct}>
              Бараа Нэмэх
            </button>
          </form>

          <h2>Борлуулалтын Тайлан</h2>
          <div className="sales-report">
            <Line data={salesData} />
            <h3>Барааны эргэлт:</h3>
            <ul>
              {rotationData.map((item, index) => (
                <li key={index}>
                  {item.name}: Эргэлтийн хувь - {item.rotationRate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
