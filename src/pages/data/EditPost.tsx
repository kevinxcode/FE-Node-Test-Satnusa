import React, { useState, useEffect } from 'react';
import {
    showSweetAlert,
    showLoadingSweetAlert,
    closeLoadingSweetAlert,
} from "../utils/SweetAlert";

interface View1Props {
    dataId: { id: string, title: string, body: string }; // Update dataId type
}

const AddPost: React.FC<View1Props> = ({ dataId }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        body: ''
    });

    useEffect(() => {
        setFormData({
            id: dataId.id,
            title: dataId.title,
            body: dataId.body
        });
    }, [dataId]); // Trigger effect when dataId changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData);
        // Submit logic...
        fetch(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: formData.id,
                title: formData.title,
                body: formData.body,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => { showSweetAlert(JSON.stringify(json), "success") });

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-bold">ID </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold">Title </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="body" className="block text-gray-700 font-bold">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
};

export default AddPost;
