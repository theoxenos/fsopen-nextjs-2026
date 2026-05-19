import {removeBlogFromReadingList, toggleBlogReadStatus} from "@/app/actions/readingList";

interface ReadingListItemProps {
    item: {
        id: number;
        read: boolean;
        blog: {
            id: number;
            title: string;
        };
    };
}

const ReadingListItem = ({item}: ReadingListItemProps) => {
    return (
        <li className="py-1 flex items-center justify-between">
            <a href={`/blogs/${item.blog.id}`} className="text-blue-500 hover:underline">
                {item.blog.title}
            </a>
            <div className="flex gap-2 ml-4">
                <form action={toggleBlogReadStatus} className="inline">
                    <input type="hidden" name="id" value={item.id}/>
                    <button type="submit"
                            className={`rounded text-sm text-neutral-200 px-2 py-1 ${item.read ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {item.read ? 'Unread' : 'Read'}
                    </button>
                </form>
                <form action={removeBlogFromReadingList} className="inline">
                    <input type="hidden" name="id" value={item.id}/>
                    <button type="submit"
                            className="rounded text-sm text-neutral-200 bg-red-600 hover:bg-red-700 px-2 py-1"
                    >
                        Remove
                    </button>
                </form>
            </div>
        </li>
    );
};

export default ReadingListItem;
