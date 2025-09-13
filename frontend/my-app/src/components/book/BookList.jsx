import React, { useState, useEffect } from "react";
import Book from "./Book";
import { getAllBooks, deleteBook } from "../../service/bookService";
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Naslov</th>
                            <th>Autor</th>
                            <th>Izdavač</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(b => (
                            <tr key={b.id}>
                                <td>{b.title}</td>
                                <td>{b.author.fullName}</td>
                                <td>{b.publisher.name}</td>
                                <td>
                                    <button className="edit" onClick={() => navigate(`/books/${b.id}/edit`)}>Izmeni</button>
                                    <button className="delete" onClick={() => handleDelete(b.id)} style={{ marginLeft: "10px" }}>Obriši</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default BookList;
