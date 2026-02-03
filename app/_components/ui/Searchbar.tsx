interface SearchbarProps {
    placeholder: string;
    value?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Searchbar({ placeholder, value, onChange }: SearchbarProps) {
    return (
        <>
            <input
                className="border px-3 py-2 w-full rounded-lg"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}