import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/navBar.module.css'
import { useHistory } from 'react-router'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import Password from '../pages/Password';
import usersAction from '../redux/actions/usersAction'
import ModalCart from './ModalCart';


const NavBar = (props) => {  
    const [visible, setVisible] =useState(false)
    const [modalLogIn, setModalLogIn] = useState(false)
    const [modalPass,setmodalPass]=useState(false)
    const [modalCart,setModalCart]=useState(false)
    const [visibleMenu, setVisibleMenu] =useState(false)
    const history = useHistory()

    

    const clickHandler= ()=>{
        setVisible(!visible)  
    }

    const clickHandlerMenu= ()=>{
        setVisibleMenu(!visibleMenu)
    }
    const clickCart =()=>{
        setModalCart(!modalCart)
    }

    const logOut = () => {
        props.signOut()
        if(history.location.pathname === "/mi-cuenta") history.push("/")
    }


    const homeLocationsPathFlag = [ "/como-comprar", "/contacto"].includes(history.location.pathname) || (history.location.pathname === "/")
    return(
        <header className={styles.headerContainer}>
            <nav className={styles.navWeb}>
                <Link to='/'>LUXXOR</Link>
                <div className={styles.navIntermedio}>
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
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/KzhQNPLP/Dise-o-sin-t-tulo-73.png")'}} onClick={clickCart}>
                    <p className={styles.cartLength}>{props.cartProduct.length}</p>
                </div>
                </nav>
                {visibleMenu &&   
                    <nav className={styles.navContainerMobile}>
                        <Link to='/productos'>
                            <div className={styles.icon} style={{backgroundImage: "url('https://i.postimg.cc/t4K4jpzj/abrir-caja.png')"}}></div>
                            <span>Productos</span>
                        </Link>
                        {homeLocationsPathFlag && 
                            <a href="#contacto">
                                <div className={styles.icon} style={{backgroundImage: "url('https://i.postimg.cc/8zMVLWL2/correo.png')"}}></div>
                                <span>Contacto</span>
                            </a>
                        }
                        {!homeLocationsPathFlag && 
                            <Link to='/contacto' >
                                <div className={styles.icon} style={{backgroundImage: "url('https://i.postimg.cc/8zMVLWL2/correo.png')"}}></div>
                                <span>Contacto</span>
                            </Link>
                        }
                            <a>
                                <div className={styles.dropDown}>
                                <div className={styles.icon} style={{backgroundImage: "url('https://i.postimg.cc/kM2MB2hm/programmer.png')"}}></div>
                                        {!props.token && <Link to="#" ><p onClick={()=>setModalLogIn(!modalLogIn)}>Ingresar</p></Link>}
                                            {modalLogIn && <SignIn modalLogIn={modalLogIn} setModalLogIn={setModalLogIn} setmodalPass={setmodalPass} setVisible={setVisible}/>}
                                        {!props.token && <Link to="/registro"><p>Registrarme</p></Link>}
                                        {props.token && <Link to="#"><p onClick={logOut}>Cerrar Sesión</p></Link> }
                                        {props.token && <Link to="/mi-cuenta">Mi Cuenta</Link>}
                                        {props.admin && <Link to="/admin"><p>Admin</p></Link>}
                                    </div>
                            </a>
                            <a>
                                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/Qtnz2xpg/carrito-de-compras.png")'}}>
                                    
                                </div>
                                <span>Carrito</span>
                            </a>
                    </nav>}
            <div className={styles.menu} style={{backgroundImage: 'url("https://i.postimg.cc/jj31jRt1/Diseño_sin_título_(59).png")'}}  onClick={clickHandlerMenu}></div>
                { visible &&  <div className={styles.dropDown}>
                    {!props.token && <Link to="#" ><p onClick={()=>setModalLogIn(!modalLogIn)}>Ingresar </p></Link>}
                        {modalLogIn && <SignIn modalLogIn={modalLogIn} setModalLogIn={setModalLogIn} setmodalPass={setmodalPass} setVisible={setVisible}/>}
                    {!props.token && <Link to="/registro"><p>Registrarme</p></Link>}
                    {props.token && <Link to="#"><p onClick={logOut}>Cerrar Sesión</p></Link>}
                    {props.token && <Link to="/mi-cuenta">Mi Cuenta</Link>}
                    {props.admin && <Link to="/admin"><p>Admin</p></Link>}
                </div>}
                {modalPass && <Password setmodalPass={setmodalPass} setVisible={setVisible}/>}
                {modalCart && <ModalCart setModalCart={setModalCart}/>}
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
        admin: state.users.admin,
        cartProduct:state.shopCart,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)