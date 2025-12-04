import Link from "next/link"

export default function Footer() {
    return (
        <div className="bg-[#0f396d] h-[4rem] flex justify-center items-center w-full shrink-0">
            <nav className="text-white">
                <Link href="/legal">Mentions légales</Link>
            </nav>
        </div>
    )
}