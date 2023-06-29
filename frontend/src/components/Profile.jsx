import { useEffect, useState } from "react";
import { createURL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
const Profile = () => {
    const [items, setItems] = useState();
    const [profile_image, setProfile_image] = useState("");
    const navigate = useNavigate();

    const loadProfile = () => {
        const url = createURL("user/profile");

        const token = sessionStorage["token"];
        if (!token) {
            navigate("/");
            return;
        }
        axios.get(url, {
            headers: {
                "x-token": token,
            },
        })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    const data = result["data"];
                    console.log(data.profile_image);
                    setItems(data)
                } else {
                    alert("error while loading your Profile");
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(`error: `, error)
            });
    };
    
    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div>

            <div className="row">
                <div className="col"></div>
                <div className="col" style={{ boxShadow: "10px 10px 5px lightblue", border: "1px solid blue", borderRadius: 10, marginTop: 100 }}>
                    <h2 className="title mb-3">Profile</h2>
                    <div className="text-center">
                    {items && <img style={{objectFit:"cover",objectPosition:"center",borderRadius:"50%"}} src={'http://localhost:4000/' + items.profile_image} width="200px" height="200px" alt="profile image" />}

                    </div>
                    <div className="mt-3"><strong>Name: </strong><span>{items && items.fname + " " + items.lname}</span></div>

                    <div className="mt-3"><strong>Email: </strong><span>{items && items.email}</span></div>
                    <div className="mt-3"><strong>Phone: </strong><span>{items && items.phone}</span></div>

                    <Link style={{ marginTop: 40, marginBottom: 40, marginLeft: 130 }} className="btn btn-success" to={`edit-user/${items && items.id}`}>Edit Profile</Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default Profile;