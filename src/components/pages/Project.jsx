import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
function Project(){

    const {id} = useParams()
    console.log(id)

    const [project, seProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() =>{

        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then( (data) =>{
            seProject(data)
        })
        .catch(err => console.log(err))
        },200)

    },[id])

    function editPost(project){
        if(project.budget<project.cost){
            setMessage("O Orçamento não pode ser maior que o custo do projeto!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then(data => {
            seProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType("sucess")
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total Orçamento: </span>{project.budget}
                                    </p>
                                     <p>
                                        <span>Total Utilizado: </span>{project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição" 
                                    projectData={project}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}
export default Project
