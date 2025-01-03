import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import Card from "../components/Card";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Welcome to Netflix Clone</h1>
            {users.map((user) => (
                <Card key={user.userId} title={user.name} genre="User" rating="-" />
            ))}
        </div>
    );
};

export default Home;
