import {getUsers} from "@/app/services/userService";
import Link from "next/link";

const Users = async () => {
    const users = await getUsers();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <ul>
                {users.map(user =>
                    <li key={user.id} className="mb-2">
                        <Link href={`/users/${user.username}`}
                              className="text-blue-500 hover:underline">{user.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Users;