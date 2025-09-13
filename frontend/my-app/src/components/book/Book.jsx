import React from "react";
import { Link } from "react-router-dom";

const Book = ({ id, title, pageCount, publishedDate, isbn, author, publisher, onDelete }) => {
    return (
        <div className="book-card">
            <div className="book-header">
                <h3>{title}</h3>
                <div className="book-id">#{id}</div>
            </div>
            
            <div className="book-details">
                <div className="detail-row author">
                    <span className="label">👤 Autor:</span>
                    <span className="value">{author}</span>
                </div>
                
                <div className="detail-row publisher">
                    <span className="label">🏢 Izdavač:</span>
                    <span className="value">{publisher}</span>
                </div>
                
                <div className="detail-row isbn">
                    <span className="label">🔖 ISBN:</span>
                    <span className="value">{isbn}</span>
                </div>
                
                <div className="detail-row pages">
                    <span className="label">📄 Strane:</span>
                    <span className="value">{pageCount}</span>
                </div>
                
                <div className="detail-row date">
                    <span className="label">📅 Datum:</span>
                    <span className="value">
                        {new Date(publishedDate).toLocaleDateString('sr-RS')}
                    </span>
                </div>
            </div>
            
            <div className="book-actions">
                <Link to={`/books/${id}/edit`} className="btn btn-edit">
                    Izmeni
                </Link>
                <button 
                    className="btn btn-delete" 
                    onClick={() => onDelete(id)}
                >
                    Obriši
                </button>
            </div>
        </div>
    );
};

export default Book;
