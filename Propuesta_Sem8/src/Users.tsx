import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    age: number;
};

function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:9090/')
        .then((result) => setUsers(result.data))
        .catch((err) => console.log(err))
    }, [])

    const handleDelete = (_id: string) => {
        axios.delete(`http://localhost:9090/${_id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className='btn btn-success'>Add + </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                    <tr key = {index}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.age}</td>
                                    <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;