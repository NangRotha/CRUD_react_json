import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateStudentPage = () => {
    const [data, setdata] = useState({});
    const { id } = useParams();
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/students/${id}`);
            if (response.ok) {
                const result = await response.json();
                setdata(result);
            } else {
                console.error('Error fetching student data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    }
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
            const request = await fetch(`http://localhost:3000/students/${id}`, { // Use backticks here
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (request.ok) {
                navigation('/');
                alert('Update successfully');
            } else {
                alert('Failed to update student');
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);
    
    return (
        <div className='container'>
            <h1 className='text-center'>Update Student</h1>  
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input
                        defaultValue={data.name} 
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
                        defaultValue={data.age}
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
                        defaultValue={data.major}
                        type='text' 
                        onChange={handleInput} 
                        className='form-control' 
                        id='major' 
                        name='major' 
                        placeholder='Enter student major' 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Update Student</button>
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

export default UpdateStudentPage
