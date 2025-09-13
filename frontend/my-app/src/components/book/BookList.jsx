import React, { useState, useEffect } from "react";
import Book from "./Book";
import { getAllBooks, deleteBook } from "../../service/bookService";
import { Link } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadBooks() {
        try {
            setLoading(true);
            const data = await getAllBooks();
            setBooks(data);
            setError("");
        } catch (err) {
            setError("Greška pri učitavanju knjiga.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            await loadBooks();
        } catch (err) {
            setError("Greška pri brisanju knjige.");
        }
    };

    if (loading) return <p>Učitavanje knjiga...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Knjige</h1>
            <Link to="/books/new">
                <button>Dodaj novu knjigu</button>
            </Link>

            <div>
                {books.map(book => (
                    <Book
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        pageCount={book.pageCount}
                        publishedDate={book.publishedDate}
                        isbn={book.isbn}
                        author={book.author.fullName}
                        publisher={book.publisher.name}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
};

export default BookList;
