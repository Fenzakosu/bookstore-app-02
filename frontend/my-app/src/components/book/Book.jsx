import React from "react";
import { Link } from "react-router-dom";

const Book = ({ id, title, pageCount, publishedDate, isbn, author, publisher, onDelete }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>{title}</h3>
            <p>
                Autor: {author} | Izdavač: {publisher}
            </p>
            <p>
                ISBN: {isbn} | Broj strana: {pageCount} | Datum objavljivanja:{" "}
                {new Date(publishedDate).toLocaleDateString()}
            </p>

            <Link to={`/books/${id}/edit`}>
                <button>Izmeni</button>
            </Link>
            <button onClick={() => onDelete(id)}>Obriši</button>
        </div>
    );
};

export default Book;
