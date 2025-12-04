interface MainTitleProps {
    title: string;
}

export default function MainTitle({ title }: MainTitleProps) {
    return (
        <h1 className="text-lg">{title}</h1>
    )
}