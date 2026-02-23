interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher une série..."
            className="w-full md:w-1/2 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-700 shadow-lg focus:border-[#0f396d] dark:focus:border-[#4b83c6] focus:outline-none transition-all dark:text-[#EBECF0]"
        />
    );
}