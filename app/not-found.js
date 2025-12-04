import Link from 'next/link';
import MainTitle from '../app/_components/MainTitle';
 
export default function NotFound() {
    return (
        <section className="flex-[1_0_auto]">
            <MainTitle title={"Page 404"} />
            <p>Désolée, nous n&apos;avons pas trouvé la ressource que vous avez demandé.</p>
            <Link href="/">Retour à l&apos;accueil</Link>
        </section>
    )
}