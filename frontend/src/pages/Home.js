import { useHistory } from "react-router"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Main from "../components/Main"

const Home = () => {
    const history = useHistory()
    
    console.log(history);

    return(
        <>
            <Header/>
            <Main/>
            <Contact/>
            <Footer/>
        </>
    )
}

export default Home