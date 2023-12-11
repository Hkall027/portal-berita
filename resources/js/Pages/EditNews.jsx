import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Navbar from '@/Components/Navbar';

export default function EditNews(props) {
    if (!props.myNews) {
        return <div>Data berita tidak tersedia</div>;
      }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async () => {
        try {
            const data = { id: props.myNews.id, title, description, category }
            await Inertia.post('/news/update', data);
            setTitle('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error('Error updating news:', error);
        }
    }

    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full lg:w-96 sm:w-96 bg-base-100 shadow-xl m-2">
            <div className='p-4 text-2xl flex justify-center'>Edit Berita</div>
                <div className="card-body">
                <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title} />
                <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(description) => setDescription(description.target.value)} defaultValue={props.myNews.description} />
                <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(category) => setCategory(category.target.value)} defaultValue={props.myNews.category} />
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>UPDATE</button>
                </div>
            </div>
        </div>
    )
}