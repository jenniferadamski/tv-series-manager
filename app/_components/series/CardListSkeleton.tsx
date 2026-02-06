import CardSkeleton from "./CardSkeleton";

export default function CardListSkeleton() {
    return (
        <ul className="flex flex-row justify-between flex-wrap">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </ul>
    )
}