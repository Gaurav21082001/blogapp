import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { createURL } from "../config";
import { toast } from "react-toastify";
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const onLogin = () => {
        if (email.length === 0) {
            toast.warn("please enter email")
        } else if (password.length === 0) {
            toast.warn("please enter password");
        } else {
            const url = createURL("user/signin");
            axios.post(url, { email, password })
                .then((response) => {
                    const result = response.data;
                    if (result["status"] === "success") {
                        const { fname, lname, token } = result["data"];

                        sessionStorage["firstName"] = fname;
                        sessionStorage["lastName"] = lname;
                        sessionStorage["token"] = token;
                        navigate('/home')
                    }else{
                        toast.error("Invalid email or password");
                    }
                })
        }
    }
    const onRegister = () => {
        console.log("register")
        navigate('/register')
    }
    
    return (
        <div>
          

            <div className="row">
                <div className="col"></div>
                <div className="col" style={{boxShadow:"10px 10px 5px lightblue",border:"1px solid blue",marginTop:150,borderRadius:10}}>
                <h2 className="title">Login</h2>
                    <div className="form-group">
                        <label htmlFor="">Username:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    </div>
                    <div className="form-group mb-5" >
                        <button onClick={onLogin} className="btn btn-success" style={{ marginLeft: 100, marginTop: 40 }} >Login</button>
                        <button onClick={onRegister} className="btn btn-primary" style={{marginLeft:20,marginTop: 40 }}>Register</button>
                    </div>
                </div>
                <div className="col"></div>
            </div>

        </div>
    )
}
export default Login