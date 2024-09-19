import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component";


const FormCrudMovies = () => {
    return (
        <div>
            <h2 style={{fontSize: '1.7rem', textAlign:'start'}}>Create a new movie</h2>
            <form className="form-create">
                <Input type="text" placeholder="Enter movie title" label="Title" />
                <Input
                    type="text"
                    placeholder="Enter movie description"
                    label="Description"
                />
                <Input type="text" placeholder="Enter cast" label="Cast" />
                <Input type="text" placeholder="Enter studio name" label="Studio" />
                <Input type="text" placeholder="Enter movie category" label="Category" />
                <Input
                    type="text"
                    placeholder="Enter movie subcategory"
                    label="Subcategory"
                />
                <Input type="text" placeholder="Enter director name" label="Director" />
                <Input
                    type="text"
                    placeholder="Enter stream ID"
                    label="Stream ID"
                />
                <Input type="date" placeholder="Select publish date" label="Publish Date" />
                <Input type="file" placeholder="Upload image" label="Image" />
                 <div style={{marginTop:"30px", marginRight:"90px"} }>
                   <ButtonSubmitAdmin />
                 </div>
            </form>
        </div>
    )
}

export default FormCrudMovies;