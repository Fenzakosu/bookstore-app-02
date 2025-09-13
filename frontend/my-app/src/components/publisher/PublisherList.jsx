import React, { useState, useEffect } from "react";
import Publisher from "./Publisher";
import { getAllPublishers, deletePublisher } from "../../service/publisherService";
import { Link } from "react-router-dom";

const PublisherList = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadPublishers() {
        try {
            setLoading(true);
            const data = await getAllPublishers();
            setPublishers(data);
            setError("");
        } catch (err) {
            setError("Greška pri učitavanju izdavača.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPublishers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePublisher(id);
            await loadPublishers();
        } catch (err) {
            setError("Greška pri brisanju izdavača.");
        }
    };

    if (loading) return <p>Učitavanje izdavača...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Izdavači</h1>
            <Link to="/publishers/new">
                <button>Dodaj novog izdavača</button>
            </Link>

            {publishers.map((p) => (
                <Publisher
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    address={p.address}
                    website={p.website}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default PublisherList;
