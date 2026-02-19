'use client';

import useTheme from "@/hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="flex items-center cursor-pointer">
            {theme === 'light' ?
                <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    width={30} flip="horizontal"
                    className="min-w-[30px] min-h-[30px] shrink-0"
                /> :
                <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    width={30}
                    className="min-w-[30px] min-h-[30px] shrink-0 dark:text-[#EBECF0]"
                />
            }
        </button>
    )
}