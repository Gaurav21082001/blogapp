import { createURL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import { BsShareFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";

const Home = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState("");
    const loadBlogs = () => {
        const url = createURL("blog/all-blogs");

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
                    setItems(data)
                } else {
                    alert("error while loading your blogs");
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(`error: `, error)
            });
    };

    useEffect(() => {
        loadBlogs();
    }, []);
    return <div >

        <h2 style={{ position: "relative", alignItems: "center" }} className="title">Blogs </h2>



        <div>
            {items && items.map((item, index) => {
                return <div key={index} className="container-blog">
                    <div className="fw-bold">Title: {item.title}</div>
                    <div> <strong> Content:</strong> {item.details}</div>
                    <p style={{ marginLeft: 70, marginTop: 10 ,display:"flex",alignItems:"center",marginBottom:10}}>
                        <FcLike style={{ fontSize: 30, cursor: "pointer" }} />
                        <p style={{position:"relative",top:35,right:25}} className="fw-bold">like</p>
                        <BsShareFill style={{ fontSize: 25,cursor: "pointer" }}/>
                    </p>
                </div>
            })}
        </div>
    </div>
}
export default Home