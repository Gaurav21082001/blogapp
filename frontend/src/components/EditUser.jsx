import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const [id,setId]=useState();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profile_image, setProfile_image] = useState();

    const token = sessionStorage["token"];
    const onSave = () => {
        const token = sessionStorage["token"];
        const formData=new FormData();
        formData.append("fname",fname)
        formData.append("lname",lname)
        formData.append("email",email)
        formData.append("phone",phone)
        formData.append("image",profile_image)
        if (!token) {
            navigate("/");
            return;
        }
        axios.put(`http://localhost:4000/user/edit-user`,formData , { headers: { "x-token":token } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                if (result["status"] === "success") {
                    const data = result["data"];
                    toast.success("successfully update user");
                    navigate('/profile  ')
                } else {
                    toast.error("error while update user")
                }
            })


    };

    const loadProfile = () => {


        const token = sessionStorage["token"];

        axios.get(`http://localhost:4000/user/profile`, {
            headers: {
                "x-token": token,
            },
        })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    const data = result["data"];
                    setFname(data.fname);
                    setEmail(data.email);
                    setLname(data.lname);
                    setPhone(data.phone);
                   
                } else {
                    console.log("error")
                }
            })
    };
    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div>

            <div className="row">
                <div className="col"></div>
                <div className="col" style={{ boxShadow: "10px 10px 5px lightblue", border: "1px solid blue", borderRadius: 10, marginTop: 100 }}>
                    <h2 className="title">Edit Profile</h2>
                    
                    <div className="form-group">
                        <label htmlFor="">First Name :</label>
                        <input onChange={(e) => setFname(e.target.value)} value={fname} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Last Name :</label>
                        <input onChange={(e) => setLname(e.target.value)} value={lname} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mobile Number :</label>
                        <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email :</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Choose Photo :</label>
                        <input onChange={(e) => setProfile_image(e.target.files[0])}  type="file" className="form-control" />
                    </div>
                    
                    <div className="form-group" style={{ marginTop: 20, marginBottom: 20 }}>
                        <button style={{ marginLeft: 80 }} onClick={() => onSave(id)} className="btn btn-primary">Save</button>
                        <Link style={{ marginLeft: 40 }} to={"/profile"} className="btn btn-danger">
                            Cancel
                        </Link>
                    </div>

                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default EditUser;