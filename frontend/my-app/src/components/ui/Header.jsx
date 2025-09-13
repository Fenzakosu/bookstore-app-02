import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header
            style={{
                backgroundColor: "#222",
                color: "#fff",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <h2>Bookstore App</h2>
            <nav style={{ display: "flex", gap: "15px" }}>
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
                <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
                <Link to="/books" style={{ color: "#fff", textDecoration: "none" }}>Books</Link>
                <Link to="/publishers" style={{ color: "#fff", textDecoration: "none" }}>Publishers</Link>
                <Link to="/books/new" style={{ color: "#fff", textDecoration: "none" }}>Add Book</Link>
            </nav>
        </header>
    );
};

export default Header;
