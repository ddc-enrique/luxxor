import React,  {  useEffect }from "react";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import NavBar from "../components/NavBar";
import styles from "../styles/banned.module.css";
import toast, { Toaster } from "react-hot-toast";
const Banned = (props) =>{
    useEffect(()=>{
        props.verifyIdMail(props.match.params.id)
        .then(res=>{
            console.log(res)
            if(!res){
                props.history.push("/") 
            }else{
                props.banAccount(props.match.params.id)
                .then(()=>{
                    notificationToast("Cuenta bloqueada con éxito", "👏");
                })     
            }
       })
       .catch(e=>{
            toast("Problemas tecnicos.", {
                icon: "🚫",
                style: {
                borderRadius: "1rem",
                background: "#fff",
                color: "#545454",
                },
            })
        })
       // eslint-disable-next-line
    },[])
    const notificationToast = (message, icon) => {
        return toast(message, {
          icon: icon,
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
        });
      };
    return(
       <>
        <NavBar/>
        <div className={styles.containerBanned}>
            <Toaster />
            
        </div>
       </>
    )
}
const mapDispatchToProps ={
    verifyIdMail: usersAction.verifyIdMail,
    banAccount: usersAction.banAccount
}
export default connect(null,mapDispatchToProps)(Banned)