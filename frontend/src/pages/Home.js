import { useEffect, useRef } from "react"
import { useHistory } from "react-router"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SectionInfo from "../components/SectionInfo"
import styles from "../styles/home2.module.css"

const Home = ({  }) => {
    const sectionInfo = useRef({})
    const contact = useRef({})
    const history = useHistory()
    
    useEffect(()=>{        
        if (history.location.pathname.length > 1) {
            if (history.location.pathname === "/contacto") {
                if (Object.entries(contact.current).length > 0) contact.current.scrollIntoView()
            } else {
                if (Object.entries(sectionInfo.current).length > 0) sectionInfo.current.scrollIntoView()
            }
        }

    }, [])

    return(
        <div className={styles.containerHome}>
            <Header/>
            <SectionInfo reference={sectionInfo} />
            <Contact reference={contact} />
            <Footer/>
        </div>
    )
}

export default Home