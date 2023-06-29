import { createURL } from "../config"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BsHeart, BsShareFill } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiFillEdit,AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
const Myblog = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState("");
    const token = sessionStorage["token"];
    const { id } = useParams();

    const [like, setLike] = useState(""),
        [isLike, setIsLike] = useState(false);

    const onLike = () => {
        setLike(like + (isLike ? -1 : 1));
        setIsLike(!isLike);
    }

    const onDelete = (id) => {
        const url = createURL(`blog/${id}`);

        if (!token) {
            navigate("/");
            return;
        }
        axios.delete(url, {
            headers: {
                "x-token": token,
            },
            id,
        })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    toast.success("Blog successfully deleted.")
                    loadBlogs();
                } else {
                    toast.error("error while deleting your blog");
                }
            })
            .catch((error) => {
                console.log(`error: `, error)
            });

    }
    const loadBlogs = () => {
        const url = createURL("blog/");


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
                    setItems(data);
                    
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

        <h2 style={{ position: "relative", alignItems: "center" }} className="title">My Blogs <Link style={{ marginTop: 10 }} className="btn btn-primary btn-sm float-end" to="/new-blog">Add</Link></h2>



        <div>
            {items && items.map((item, index) => {
                return <div key={index} className="container-blog">
                    <div className="fw-bold">Title: {item.title}</div>
                    <div> <strong> Content:</strong> {item.details}</div>
                    <div style={{ position: "relative", marginLeft: 70, marginTop: 12 }}>
                        <AiOutlineLike onClick={onLike} className={"" + (isLike ? "text-primary " : " ")} style={{ fontSize: 30, marginRight: 30, cursor: "pointer" }} />
                        <Link to={`/my-blog/edit-blog/${item.id}`} style={{ textDecoration: "none", color: "black" }}><AiFillEdit style={{ fontSize: 30, marginRight: 30, cursor: "pointer" }} /></Link>
                        <AiOutlineDelete onClick={() => onDelete(item.id)} style={{ fontSize: 30, marginRight: 30, cursor: "pointer" }} />
                        <div className="fw-bold">like {item.likes}</div>
                    </div>
                </div>
            })}
        </div>
    </div>
}
export default Myblog;