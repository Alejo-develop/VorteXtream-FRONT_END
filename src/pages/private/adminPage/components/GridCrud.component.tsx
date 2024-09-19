import '../styles/gridcrudmovies.css'


interface FormContentProps {
    formContent: JSX.Element
    contentDeleteAndEdit: JSX.Element | JSX.Element[];
}

const GridCrudComponent = ({ formContent, contentDeleteAndEdit  }: FormContentProps) => {
    return (
        <div className="container-grid-crud">
            <div className="container-create">
                {/* Aquí se renderiza el contenido del formulario pasado por props */}
                {formContent}
            </div>
            <div className="container-edit-delete">
                {/* Aquí se renderiza el contenido para editar y eliminar */}
                {contentDeleteAndEdit}
            </div>
        </div>
    )
}

export default GridCrudComponent;
