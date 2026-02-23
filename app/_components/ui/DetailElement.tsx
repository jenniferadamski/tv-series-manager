interface DetailElementProps {
    elementTitle: string;
    element: string | number;
}

export default function DetailElement({ elementTitle, element }: DetailElementProps) {
    return (
        <div>
            <span className="font-bold text-[#0f396d] dark:text-[#4b83c6]">{elementTitle}&nbsp;:&nbsp;</span>
            <span className="dark:text-[#EBECF0]">{element}</span>
        </div>
    )
}