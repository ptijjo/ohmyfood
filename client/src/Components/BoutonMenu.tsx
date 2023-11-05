import { ReactNode } from "react"

interface Props {
    icone: ReactNode,
    numero: number,
    titre: string,

}


const BoutonMenu = (props: Props) => {
    return (
        <button>
            <span>{props.numero}</span>
            <span>{props.icone}</span>
            <span>{props.titre}</span>
        </button>
    )
}

export default BoutonMenu