import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-[#0f396d] h-16 flex justify-center items-center w-full shrink-0">
            <nav className="text-white dark:text-[#EBECF0]">
                <Link href="/legal">Mentions légales</Link>
            </nav>
        </div>
    )
}