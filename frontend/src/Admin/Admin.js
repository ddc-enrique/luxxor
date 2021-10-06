import styles from '../Admin/Admin.module.css'
import { Link } from 'react-router-dom'
const Admin =()=>{
return(
    <div className={styles.divContainer}>
        <header className={styles.headerAdmin}>
        <Link to='/'>
                <h1>Lu<span className={styles.orange}>x</span><span className={styles.violet}>x</span>or</h1>
            </Link>
        </header>
    </div>
)
}
export default Admin