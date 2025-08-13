import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddNewStudent = () => {
    const [data, setdata] = useState({});
    const navigation = useNavigate();
    const handleInput = (e) => {
        setdata({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (request.ok) {
                navigation('/');
            } else {
                alert('Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }
    
    return (
        <div className='container'>
            <h1 className='text-center'>Add New Student</h1>  
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input 
                        type='text' 
                        onChange={handleInput} 
                        className='form-control' 
                        id='name' 
                        name='name'
                        placeholder='Enter student name' 
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='age' className='form-label'>Age</label>
                    <input 
                        type='number' 
                        onChange={handleInput} 
                        className='form-control' 
                        id='age' 
                        name='age'
                        placeholder='Enter student age' 
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='major' className='form-label'>Major</label>
                    <input 
                        type='text' 
                        onChange={handleInput} 
                        className='form-control' 
                        id='major' 
                        name='major'
                        placeholder='Enter student major' 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Add Student</button>
                <button type='button' className='btn btn-danger ms-2'>
                    <Link to='/' className='text-white text-decoration-none'>Back to Home</Link>
                </button>
                <div className="review mt-3">
                    <h2>Review</h2>
                    <p>Review your input before submitting.</p>
                    <ul>
                        <li>Name: {data.name}</li>
                        <li>Age: {data.age}</li>
                        <li>Major: {data.major}</li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default AddNewStudent