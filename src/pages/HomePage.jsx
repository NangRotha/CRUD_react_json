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
  return (
    <div className='container'>
        <h1 className='text-center'>Wellcome to React JS + Json server</h1>
        <p className='text-center'>Hello</p>
        <Link to='/add' className="btn btn-success mb-3">Add Student</Link> 
        <table className='table table-striped text-center'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
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
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.major}</td>
                        <td>
                            <button className='btn btn-primary'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default HomePage