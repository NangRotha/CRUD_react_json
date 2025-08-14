import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [data, setdata] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/students');
            if(response.ok) {
                const result = await response.json();
                setdata(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/students/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setdata(data.filter(item => item.id !== id));
                // console.log('Delete successful'); // Debug log
                alert('Item deleted successfully');
            } else {
                console.error('Error deleting item:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
  return (
    <div className='container'>
        <h1 className='text-center'>Wellcome to React JS + Json server</h1>
        <p className='text-center'>Hello</p>
        <Link to='/add' className="btn btn-success mb-3">Add Student</Link> 
        <table className='table table-striped text-center'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Age</th>
                    <th scope='col'>Major</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.major}</td>
                        <td>
                            <Link to={`/update/${item.id}`} className='btn btn-primary me-3'>Edit</Link>
                            <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default HomePage