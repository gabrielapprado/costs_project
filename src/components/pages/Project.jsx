import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
function Project(){

    const {id} = useParams()
    console.log(id)

    const [project, seProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

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

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
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
                                    <p>Detalhes</p>
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
