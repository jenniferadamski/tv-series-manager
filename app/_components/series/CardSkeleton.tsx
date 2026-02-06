import Image from "next/image";
import posterAlternative from "@/public/assets/poster-not-available.jpg";

export default function CardSkeleton() {
    return (
        <li className="w-45/100 md:w-30/100 lg:w-20/100 mb-5 lg:mb-10 lg:mr-5 shadow-xl/10 motion-safe:animate-pulse">
            <Image
                src={posterAlternative}
                alt={"Affiche manquante"}
                height={500}
                width={500}
                className="min-h-[236px] md:min-h-[340px] min-[51rem]:min-h-[400px] min-[59rem]:min-h-[420px] min-[62rem]:min-h-[428px] lg:min-h-[420px] m-auto object-cover bg-neutral-200"
            />

            <div className="h-[12rem] bg-white flex flex-col justify-around items-center text-center rounded-b-lg">
                <span className="bg-neutral-300 h-[24px] w-[120px] rounded"></span>
                <span className="bg-neutral-300 h-[20px] w-[35px] rounded"></span>
                <span className="bg-neutral-300 h-[48px] w-[120px] md:w-[200px] rounded"></span>
                <span className="bg-neutral-300 h-[24px] w-[90px] rounded"></span>
            </div>
        </li>
    )
}