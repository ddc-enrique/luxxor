import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navBar.module.css'
import { useHistory } from 'react-router'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import Password from '../pages/Password';
import usersAction from '../redux/actions/usersAction'

const NavBar = (props) => {  
    const [visible, setVisible] =useState(false)
    const [modalLogIn, setModalLogIn] = useState(false)
    const [modalPass,setmodalPass]=useState(false)
    const [visibleMenu, setVisibleMenu] =useState(false)
    const history = useHistory()

    const clickHandler= ()=>{
        setVisible(!visible)
    }

    const clickHandlerMenu= ()=>{
        setVisibleMenu(!visibleMenu)
        setVisible(false)
    }

    const logOut = () => {
        props.signOut()
        if(history.location.pathname === "/mi-cuenta") history.push("/")
    }

    const homeLocationsPathFlag = [ "/como-comprar", "/contacto"].includes(history.location.pathname) || (history.location.pathname === "/")
    return(
        <header>
            <nav>
            <Link to='/'>LUXXOR</Link>
            <div className={styles.navIntermedio}>
                {homeLocationsPathFlag && 
                    <a href="#novedades">
                        Novedades
                    </a>
                }
                {!homeLocationsPathFlag && 
                    <Link to='/novedades' >
                        Novedades
                    </Link>
                }                
                <Link to='/productos'>
                    Productos
                </Link>
                {homeLocationsPathFlag && 
                    <a href="#contacto">
                        Contacto 
                    </a>
                }
                {!homeLocationsPathFlag && 
                    <Link to='/contacto' >
                        Contacto
                    </Link>
                }
            </div>
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/pTZVv7n0/Diseño_sin_título_(66).png")'}} onClick={clickHandler}>
                </div>
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/KzhQNPLP/Dise-o-sin-t-tulo-73.png")'}}>
                </div>
                </nav>
                {visibleMenu && 
                    <nav className={styles.navContainerMobile}>
                        {homeLocationsPathFlag && 
                        <a href="#comoComprar">
                            ¿Cómo Comprar?
                        </a>
                    }
                    {!homeLocationsPathFlag && 
                        <Link to='/como-comprar' >
                            ¿Cómo Comprar?
                        </Link>
                    }                
                    <Link to='/productos'>
                        Productos
                    </Link>
                    {homeLocationsPathFlag && 
                        <a href="#contacto">
                            Contacto 
                        </a>
                    }
                    {!homeLocationsPathFlag && 
                        <Link to='/contacto' >
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
                    {!props.token && <Link to="#" ><p onClick={()=>setModalLogIn(!modalLogIn)}>Ingresar</p></Link>}
                        {modalLogIn && <SignIn modalLogIn={modalLogIn} setModalLogIn={setModalLogIn} setmodalPass={setmodalPass} setVisible={setVisible}/>}
                    {!props.token && <Link to="/registro"><p>Registrarme</p></Link>}
                    {props.token && <Link to="#"><p onClick={logOut}>Cerrar Sesión</p></Link> }
                    {props.token && <Link to="/mi-cuenta">Mi Cuenta</Link>}
                    {props.admin && <Link to="/admin"><p>Admin</p></Link>}
                </div>}
                {modalPass && <Password setmodalPass={setmodalPass} setVisible={setVisible}/>}
                
        
        </header>
    )
}

const mapDispatchToProps = {
    signOut: usersAction.signOut
}

const mapStateToProps = (state) => {
    return {
        profilePic: state.users.profilePic,
        firstName: state.users.firstName,
        lastName: state.users.lastName,
        token: state.users.token,
        admin: state.users.admin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)