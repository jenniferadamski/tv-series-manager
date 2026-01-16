import Link from 'next/link';
import MainTitle from '../app/_components/ui/MainTitle';
 
export default function NotFound() {
    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title={"Page 404"} />
            <p>Désolée, nous n&apos;avons pas trouvé la ressource que vous avez demandé.</p>
            <Link href="/">Retour à l&apos;accueil</Link>
        </section>
    )
}