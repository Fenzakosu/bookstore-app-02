import React from "react";
import { Link } from "react-router-dom";

const Publisher = ({ id, name, address, website, onDelete }) => {
    return (
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{name}</h3>
            <p>Adresa: {address}</p>
            <p>
                Website:{" "}
                <a href={website} target="_blank" rel="noreferrer">
                    {website}
                </a>
            </p>

            <Link to={`/publishers/${id}/edit`}>
                <button>Izmeni</button>
            </Link>
            <button onClick={() => onDelete(id)}>Obriši</button>
        </div>
    );
};

export default Publisher;
