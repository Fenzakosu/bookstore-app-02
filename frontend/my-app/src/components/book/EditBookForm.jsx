import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../../service/bookService";
import { getAllPublishers } from "../../service/publisherService";
import { getAllAuthors } from "../../service/authorService";

const EditBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [book, pubs, auths] = await Promise.all([
                    getBookById(id),
                    getAllPublishers(),
                    getAllAuthors(),
                ]);
                setPublishers(pubs);
                setAuthors(auths);

                setValue("title", book.title);
                setValue("pageCount", book.pageCount);
                setValue("isbn", book.isbn);
                setValue("publishedDate", book.publishedDate.split("T")[0]);
                setValue("publisherId", book.publisherId);
                setValue("authorId", book.authorId);
            } catch {
                alert("Greška pri učitavanju podataka.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id, setValue]);


    const onSubmit = async (data) => {
        try {
            const bookData = {
                title: data.title,
                pageCount: data.pageCount ? Number(data.pageCount) : 0,
                isbn: data.isbn,
                publishedDate: data.publishedDate ? new Date(data.publishedDate).toISOString() : null,
                authorId: data.authorId ? Number(data.authorId) : null,
                publisherId: data.publisherId ? Number(data.publisherId) : null
            };
            await updateBook(id, bookData);
            navigate("/books");
        } catch (err) {
            console.error('Error updating book:', err);
            alert(`Greška pri izmeni knjige: ${err.response?.data?.message || err.message}`);
        }
    };


    if (loading) return <p>Učitavanje...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Izmeni knjigu</h2>

            <label>
                Naslov:
                <input {...register("title", { required: "Obavezno polje" })} />
            </label>
            {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
            <br />

            <label>
                Broj strana:
                <input type="number" {...register("pageCount", { min: 1 })} />
            </label>
            <br />

            <label>
                ISBN:
                <input {...register("isbn", { required: "Obavezno polje" })} />
            </label>
            <br />

            <label>
                Datum objavljivanja:
                <input type="date" {...register("publishedDate")} />
            </label>
            <br />

            <label>
                Izdavač:
                <select {...register("publisherId", { required: "Odaberite izdavača" })}>
                    <option value="">-- Odaberite izdavača --</option>
                    {publishers.map((publisher) => (
                        <option key={publisher.id} value={publisher.id}>
                            {publisher.name}
                        </option>
                    ))}
                </select>
            </label>
            {errors.publisherId && (
                <p style={{ color: "red" }}>{errors.publisherId.message}</p>
            )}
            <br />

            <label>
                Autor:
                <select {...register("authorId", { required: "Odaberite autora" })}>
                    <option value="">-- Odaberite autora --</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.fullName}
                        </option>
                    ))}
                </select>
            </label>
            {errors.authorId && (
                <p style={{ color: "red" }}>{errors.authorId.message}</p>
            )}
            <br />

            <button type="submit">Sačuvaj izmene</button>
        </form>
    );
};

export default EditBookForm;
