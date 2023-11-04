import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ['latin'] })

const SpecialText = ({children, extra=""}: {children: string, extra?: string}) => {
    return <span className={`bg-gradient-to-r gradient w-fit from-gradient-pink to-gradient-blue bg-clip-text fill text-transparent ${orbitron.className} ${extra}`}>{children}</span>;
}

export default SpecialText;