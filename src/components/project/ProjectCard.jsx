import styles from "./ProjectCard.module.css"
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({id,name,budget,category,handleRemove}){
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento </span> R$ {budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> R$ {category}
            </p>
            <div className={styles.project_card_actions}>
                <p>Editar</p>
                <p>Remover</p>
            </div>
        </div>
    )
}
export default ProjectCard