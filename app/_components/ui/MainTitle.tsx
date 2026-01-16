interface MainTitleProps {
    title: string;
}

export default function MainTitle({ title }: MainTitleProps) {
    return (
        <h1 className="text-xl font-medium mb-5">{title}</h1>
    )
}