import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Home from "./components/Home";
import About from "./components/About";
import BookList from "./components/book/BookList";
import AddBookForm from "./components/book/AddBookForm";
import EditBookForm from "./components/book/EditBookForm";
import PublisherList from "./components/publisher/PublisherList";
import "./styles/main.scss"

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<AddBookForm />} />
          <Route path="/books/:id/edit" element={<EditBookForm />} />
          <Route path="/publishers" element={<PublisherList />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

