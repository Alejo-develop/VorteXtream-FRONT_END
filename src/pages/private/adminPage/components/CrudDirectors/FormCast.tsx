import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component"

const FormCrudDirecetors = () => {
    return(
        <div>
              <h2 style={{fontSize: '1.7rem', textAlign:'start'}}>Create new Director</h2>
              <form className="form-create">
                <Input type="text" placeholder="name" label="Name"/>
                <Input type="number" placeholder="name" label="Age"/>
                <Input type="text" placeholder="Synopsis" label="Synopsis"/>
                <Input type="file" placeholder="image" label="Image"/>
                <div style={{marginTop:"30px", marginRight:"90px"} }>
                   <ButtonSubmitAdmin />
                 </div>
              </form>
        </div>
    )
}


export default FormCrudDirecetors;