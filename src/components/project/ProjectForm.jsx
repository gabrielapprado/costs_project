import { useEffect, useState } from 'react'
import Input from '../form/Input'
import style from './ProjectForm.module.css'
import Select from '../form/Select'
import Submit from '../form/Submit'
function ProjectForm({handleSubmit, btnText, projectData}){
    const [categories,setCategories] = useState([])
    const [project, setProject]= useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) =>{
                setCategories(data)
            })
            .catch((err)=> console.log(err))
    },[])

    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project,[e.target.name] : e.target.value})
        console.log(project)
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
            />
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Insira o orçamento total" 
            />
            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}
            />
            <Submit text={btnText}/>
        </form>
    )
}

export default ProjectForm
