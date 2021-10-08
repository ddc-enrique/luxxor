import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navBar.module.css'
import { useHistory } from 'react-router'
import SignIn from './SignIn'
import { connect } from 'react-redux'

const NavBar = (props) => {

    const [visible, setVisible] =useState(false)
    const [modalLogIn, setModalLogIn] = useState(true)
    const [visibleMenu, setVisibleMenu] =useState(false)
    const history = useHistory()

    const clickHandler= ()=>{
        setVisible(!visible)
    }
    const clickHandlerMenu= ()=>{
        setVisibleMenu(!visibleMenu)
    }

    return(
        <header className={styles.headerContainer}>
            <Link to='/'>
                {/* <h1>Lu<span className={styles.orange}>x</span><span className={styles.violet}>x</span>or</h1> */}
                <div className={styles.titleNav} style={{backgroundImage: 'url("https://i.postimg.cc/fTBDVNKz/LUXXOR-unscreen.gif")'}}></div>
            </Link>
            <nav className={styles.navContainer}>
                {history.location.pathname==="/" && 
                    <a href="#comoComprar">
                        ¿Cómo Comprar?
                    </a>
                }
                {(history.location.pathname.length > 1) && 
                    <Link to='/' >
                        ¿Cómo Comprar?
                    </Link>
                }                
                <Link to='/productos'>
                    Productos
                </Link>
                {history.location.pathname==="/" && 
                    <a href="#contacto">
                        Contacto 
                    </a>
                }
                {(history.location.pathname.length > 1) && 
                    <Link to='/' >
                        Contacto
                    </Link>
                }
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/R0TDV3LN/registrarse.png")'}} onClick={clickHandler}>
                </div>
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/HWtSbcjy/1-1-removebg-preview.png")'}}>
                </div>
            </nav>
                {visibleMenu && 
                <nav className={styles.navContainerMobile}>
                    {history.location.pathname==="/" && 
                            <a href="#comoComprar">
                            ¿Cómo Comprar?
                            </a>
                    }
                    {(history.location.pathname.length > 1) && 
                        <Link to='/' >
                            ¿Cómo Comprar?
                        </Link>
                    }
                    <Link to='/productos'>
                        Productos
                    </Link>
                    {history.location.pathname==="/" && 
                        <a href="#contacto">
                            Contacto 
                        </a>
                    }
                    {(history.location.pathname.length > 1) && 
                        <Link to='/' >
                            Contacto
                        </Link>
                    }
                    <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/jjnwNZtm/Dise-o-sin-t-tulo-44.png")'}} onClick={clickHandler}>
                    </div>
                    <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/1z2c686R/Dise-o-sin-t-tulo-46.png")'}}>
                    </div>
                </nav>}
            <div className={styles.menu} style={{backgroundImage: 'url("https://i.postimg.cc/R0X4cphc/menu-1.png")'}}  onClick={clickHandlerMenu}></div>
                { visible &&  <div className={styles.dropDown}>
                    <Link to="#" onClick={()=>setModalLogIn(!modalLogIn)}><p>Ingresar</p></Link>
                    {!modalLogIn && <SignIn/>}
                    <Link to="/registro"><p>Registrarme</p></Link>
                    <Link to="/admin"><p>Admin</p></Link>
                </div>}
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        profilePic: state.users.profilePic,
        firstName: state.users.firstName,
        lastName: state.users.lastName
    }
}

export default connect(mapStateToProps)(NavBar)