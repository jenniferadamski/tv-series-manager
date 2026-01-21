interface MainTitleProps {
    title: string;
}

export default function MainTitle({ title }: MainTitleProps) {
    return (
        <h1 className="text-xl text-[#0f396d] font-bold mb-5">{title}</h1>
    )
}