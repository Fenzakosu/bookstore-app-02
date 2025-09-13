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

            <label htmlFor="title">
                Naslov:
            </label>
            <input 
                id="title"
                placeholder="Unesite naslov knjige"
                {...register("title", { required: "Obavezno polje" })} 
            />
            {errors.title && <p>{errors.title.message}</p>}

            <label htmlFor="pageCount">
                Broj strana:
            </label>
            <input 
                id="pageCount"
                type="number" 
                placeholder="npr. 300"
                {...register("pageCount", { min: 1 })} 
            />
            {errors.pageCount && <p>Broj strana mora biti veći od 0</p>}

            <label htmlFor="isbn">
                ISBN:
            </label>
            <input 
                id="isbn"
                placeholder="npr. 978-0-123456-78-9"
                {...register("isbn", { required: "Obavezno polje" })} 
            />
            {errors.isbn && <p>{errors.isbn.message}</p>}

            <label htmlFor="publishedDate">
                Datum objavljivanja:
            </label>
            <input 
                id="publishedDate"
                type="date" 
                {...register("publishedDate")} 
            />

            <label htmlFor="publisherId">
                Izdavač:
            </label>
            <select id="publisherId" {...register("publisherId", { required: "Odaberite izdavača" })}>
                <option value="">-- Odaberite izdavača --</option>
                {publishers.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
            {errors.publisherId && <p>{errors.publisherId.message}</p>}

            <label htmlFor="authorId">
                Autor:
            </label>
            <select id="authorId" {...register("authorId", { required: "Odaberite autora" })}>
                <option value="">-- Odaberite autora --</option>
                {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                        {a.fullName}
                    </option>
                ))}
            </select>
            {errors.authorId && <p>{errors.authorId.message}</p>}

            <button type="submit">Sačuvaj izmene</button>
        </form>
    );
};

export default EditBookForm;
