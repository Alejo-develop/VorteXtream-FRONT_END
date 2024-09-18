import './style.css'

import CardCastComponent from "./cardCast.component"

const ContainerCastsComponent = () => {
    return(
        <div className='container-cast-scroll'>
            <h2 className='title-casts'>casts</h2>

            <div className='scroll-casts'>
                <CardCastComponent />
                <CardCastComponent />
                <CardCastComponent />
            </div>
        </div>
    )
}

export default ContainerCastsComponent