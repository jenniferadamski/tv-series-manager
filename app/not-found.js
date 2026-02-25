import Link from 'next/link';
import MainTitle from '../app/_components/ui/MainTitle';
 
export default function NotFound() {
    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15">
            <MainTitle title={"Page 404"} />

            <div className="flex flex-col dark:text-[#EBECF0]">
                <p className="mb-5">Désolée, nous n&apos;avons pas trouvé la page que vous avez demandé.</p>
                <Link href="/" className="underline cursor-pointer font-bold text-[#0f396d] dark:text-[#4b83c6]">Retour à l&apos;accueil</Link>
            </div>
        </section>
    )
}