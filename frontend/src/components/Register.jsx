import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createURL } from '../config';
import axios from 'axios';
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate()
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const onRegister = () => {
        if (fname.length === 0) {
            toast.warn("please enter email")
        } else if (lname.length === 0) {
            toast.warn("please enter password");
        } else if (phone.length === 0) {
            toast.warn("please enter password");
        } else if (email.length === 0) {
            toast.warn("please enter password");
        } else if (password !== confirmPassword) {
            toast.warn("password does not match");
        }
        else {
            const url = createURL("user/signup");
            axios.post(url, { fname, lname, email, password, confirmPassword, phone })
                .then((response) => {
                    const result = response.data;
                    if (result["status"] === "success") {
                        toast.success("Register successfully")
                        navigate('/')
                    } else {
                        toast.error("error while register");
                    }
                })
        }
    }
    return (
        <div>

            <div className="row">
                <div className="col"></div>
                <div className="col" style={{ boxShadow: "10px 10px 5px lightblue", border: "1px solid blue", marginTop: 50, borderRadius: 10 }}>
                    <h2 className="title">Register</h2>
                    <div className="form-group">
                        <label htmlFor="">First Name:</label>
                        <input onChange={(e) => setFname(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Last Name:</label>
                        <input onChange={(e) => setLname(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mobile Number:</label>
                        <input onChange={(e) => setPhone(e.target.value)} type="number" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Confirm Password</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
                    </div>
                    <button style={{ marginTop: 40, marginLeft: 70 }} onClick={onRegister} className="btn btn-primary mb-5">Register</button>
                    <Link style={{ marginLeft: 40, marginTop: 40 }} to={"/"} className="btn btn-danger mb-5">
                        Cancel
                    </Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default Register