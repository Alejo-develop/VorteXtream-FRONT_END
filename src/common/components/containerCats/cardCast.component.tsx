interface cardCastProps{
    name: string;
    img: string
}

const CardCastComponent = ({ name, img }: cardCastProps) => {
    return(
        <div className='card-casts-porfile'>
            <img src={img} alt="imgProfile-casts" className='imgPorfile-casts'/>
            <h4>{name}</h4>
        </div>
    )
}

export default CardCastComponent