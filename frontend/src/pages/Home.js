import { useEffect, useRef } from "react"
import { useHistory } from "react-router"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SectionInfo from "../components/SectionInfo"

const Home = ({  }) => {
    const sectionInfo = useRef({})
    const contact = useRef({})
    const history = useHistory()
    
    useEffect(()=>{
        if(history.location.pathname.length > 1 && history.location.pathname === "/contacto") {
            if (Object.entries(contact.current).length > 0) contact.current.scrollIntoView()
        } else {
            if (Object.entries(sectionInfo.current).length > 0) sectionInfo.current.scrollIntoView()
        }

    }, [])

    return(
        <>
            <Header/>
            <SectionInfo reference={sectionInfo} />
            <Contact reference={contact} />
            <Footer/>
        </>
    )
}

export default Home