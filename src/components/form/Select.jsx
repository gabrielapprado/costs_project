import style from './Select.module.css'
function Select({name, text, value, options, handleOnChange}){
    return(
        <div className={style.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option>Selecione uma opção</option>
                {options.map(({name,id}) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
        </div>
    )
}
export default Select