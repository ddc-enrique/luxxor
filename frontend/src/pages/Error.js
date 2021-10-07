import { Link } from 'react-router-dom'
import styles from '../styles/error.module.css'
const Error = () =>{
    return(
        <div className={styles.divError} style={{backgroundImage: 'url("https://i.postimg.cc/3JMnbG14/error.png")'}}>
            <Link to='/'><button><img src="https://i.postimg.cc/02BWd43v/Dise-o-sin-t-tulo-55.png"/></button></Link>
        </div>
    )
}
export default Error