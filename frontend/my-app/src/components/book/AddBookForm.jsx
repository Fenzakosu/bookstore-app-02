import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createBook } from "../../service/bookService";
import { getAllPublishers } from "../../service/publisherService";
import { getAllAuthors } from "../../service/authorService";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [pubs, auths] = await Promise.all([
                    getAllPublishers(),
                    getAllAuthors(),
                ]);
                setPublishers(pubs);
                setAuthors(auths);
            } catch {
                alert("Greška pri učitavanju izdavača i autora.");
            }
        }
        loadData();
    }, []);

    const onSubmit = async (data) => {
        try {
            await createBook({
                ...data,
                pageCount: Number(data.pageCount),
                publisherId: Number(data.publisherId),
                authorId: Number(data.authorId),
            });
            navigate("/books");
        } catch {
            alert("Greška pri dodavanju knjige.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Dodaj novu knjigu</h2>

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
                    {publishers.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
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
                    {authors.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.fullName}
                        </option>
                    ))}
                </select>
            </label>
            {errors.authorId && (
                <p style={{ color: "red" }}>{errors.authorId.message}</p>
            )}
            <br />

            <button type="submit">Dodaj</button>
        </form>
    );
};

export default AddBookForm;
