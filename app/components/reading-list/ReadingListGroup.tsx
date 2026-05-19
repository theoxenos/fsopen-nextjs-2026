import ReadingListItem from "./ReadingListItem";

interface ReadingListGroupProps {
    title: string;
    items: {
        id: number;
        read: boolean;
        blog: {
            id: number;
            title: string;
        };
    }[];
    emptyMessage: string;
}

const ReadingListGroup = ({title, items, emptyMessage}: ReadingListGroupProps) => {
    return (
        <div className="mb-3 bg-neutral-50 p-3 rounded">
            <strong>{title} ({items.length}):</strong>
            {items.length > 0 ? (
                <ul className="mt-2 space-y-1 divide-y divide-neutral-200">
                    {items.map(item => (
                        <ReadingListItem key={item.id} item={item}/>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-sm mt-1">{emptyMessage}</p>
            )}
        </div>
    );
};

export default ReadingListGroup;
