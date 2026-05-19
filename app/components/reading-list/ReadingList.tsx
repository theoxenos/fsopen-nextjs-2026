import ReadingListGroup from "./ReadingListGroup";

interface ReadingListProps {
    items: {
        id: number;
        read: boolean;
        blog: {
            id: number;
            title: string;
        };
    }[];
}

const ReadingList = ({items}: ReadingListProps) => {
    const unReadList = items.filter(item => !item.read);
    const readList = items.filter(item => item.read);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Reading List</h1>
            <ReadingListGroup
                title="Unread"
                items={unReadList}
                emptyMessage="No unread items"
            />
            <ReadingListGroup
                title="Read"
                items={readList}
                emptyMessage="No read items"
            />
        </div>
    );
};

export default ReadingList;
