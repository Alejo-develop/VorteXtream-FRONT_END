import '../styles/gridcrudmovies.css'


interface FormContentProps {
    formContent: JSX.Element
    contentDeleteAndEdit: JSX.Element | JSX.Element[];
}

const ridCrudComponent = ({ formContent, contentDeleteAndEdit  }: FormContentProps) => {
    return (
        <div className="container-grid-crud">
            <div className="container-create">
                {formContent}
            </div>
            <div className="container-edit-delete">
                {contentDeleteAndEdit}
            </div>
        </div>
    )
}

export default GridCrudComponent;
