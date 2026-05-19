import {getCurrentUser} from "@/app/services/sessionService";
import {redirect} from "next/navigation";
import {generateToken} from "@/app/actions/token";
import {getReadingListForUserId} from "@/app/services/readingListService";
import ReadingList from "@/app/components/reading-list/ReadingList";

const MePage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const readingLists = await getReadingListForUserId(user.id);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">My Profile</h1>
                <p className="text-gray-600">Name: {user?.name}</p>
                <p className="text-gray-600">Username: {user?.username}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">API Token</h1>
                <form action={generateToken}>
                    <div className="bg-neutral-50 mb-4 p-3">
                        <label htmlFor="token" className="block font-medium mb-2">Token:</label>
                        <input type="text" id="token" name="token" className="form-input w-full bg-neutral-100"
                               defaultValue={user.token ?? ""} readOnly/>
                    </div>
                    <button className="btn btn-primary" type="submit">Generate New Token</button>
                </form>
            </div>
            <ReadingList items={readingLists}/>
        </div>
    );
};

export default MePage;