import style from './Submit.module.css'
function Submit({text}){

    return(
        <div >
           <button className={style.btn}>{text}</button>
        </div>
    )

}
export default Submit