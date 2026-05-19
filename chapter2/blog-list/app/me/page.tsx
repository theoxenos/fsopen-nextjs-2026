import {getCurrentUser} from "@/app/services/sessionService";
import {redirect} from "next/navigation";
import {generateToken} from "@/app/actions/token";
import {getReadingListForUserId} from "@/app/services/readingListService";
import {removeBlogFromReadingList, toggleBlogReadStatus} from "@/app/actions/readingList";

const MePage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const readingLists = await getReadingListForUserId(user.id);
    const readList = readingLists.filter(list => list.read);
    const unReadList = readingLists.filter(list => !list.read);

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
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">Reading List</h1>
                <div className="mb-3 bg-neutral-50 p-3 rounded">
                    <strong>Unread ({unReadList.length}):</strong>
                    {unReadList.length > 0 ? (
                        <ul className="mt-2 space-y-1 divide-y divide-neutral-200">
                            {unReadList.map(list => (
                                <li key={list.id} className="py-1 flex items-center justify-between">
                                    <a href={`/blogs/${list.blog.id}`} className="text-blue-500 hover:underline">
                                        {list.blog.title}
                                    </a>
                                    <div className="flex gap-2 ml-4">
                                        <form action={toggleBlogReadStatus} className="inline">
                                            <input type="hidden" name="id" value={list.id}/>
                                            <button type="submit"
                                                    className="rounded text-sm text-neutral-200 bg-green-600 hover:bg-green-700 px-2 py-1"
                                            >
                                                Read
                                            </button>
                                        </form>
                                        <form action={removeBlogFromReadingList} className="inline">
                                            <input type="hidden" name="id" value={list.id}/>
                                            <button type="submit"
                                                    className="rounded text-sm text-neutral-200 bg-red-600 hover:bg-red-700 px-2 py-1"
                                            >
                                                Remove
                                            </button>
                                        </form>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm mt-1">No unread items</p>
                    )}
                </div>
                <div className="mb-3 bg-neutral-50 p-3 rounded">
                    <strong>Read ({readList.length}):</strong>
                    {readList.length > 0 ? (
                        <ul className="mt-2 space-y-1 divide-y divide-neutral-200">
                            {readList.map(list => (
                                <li key={list.id} className="py-1 flex items-center justify-between">
                                    <a href={`/blogs/${list.blog.id}`} className="text-blue-500 hover:underline">
                                        {list.blog.title}
                                    </a>
                                    <div className="flex gap-2 ml-4">
                                        <form action={toggleBlogReadStatus} className="inline">
                                            <input type="hidden" name="id" value={list.id}/>
                                            <button type="submit"
                                                    className="rounded text-sm text-neutral-200 bg-yellow-600 hover:bg-yellow-700 px-2 py-1"
                                            >
                                                Unread
                                            </button>
                                        </form>
                                        <form action={removeBlogFromReadingList} className="inline">
                                            <input type="hidden" name="id" value={list.id}/>
                                            <button type="submit"
                                                    className="rounded text-sm text-neutral-200 bg-red-600 hover:bg-red-700 px-2 py-1"
                                            >
                                                Remove
                                            </button>
                                        </form>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm mt-1">No read items</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MePage;