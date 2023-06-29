import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTittle] = useState("");
    const [details, setDetails] = useState("");
    const navigate = useNavigate();
    const token=sessionStorage["token"];
    const loadBlogs = () => {
        const url = createURL(`blog/single-blog/${id}`);


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
                    console.log(data);
                    setTittle(data[0].title);
                    setDetails(data[0].details);
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
    const onSave = () => {

        const token = sessionStorage["token"];
        if (!token) {
            navigate("/");
            return;
        }
        axios.put(`http://localhost:4000/blog/edit-blog/${id}`, { title, details, id }, { headers: { "x-token": sessionStorage["token"] } })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    const data = result["data"];
                    toast.success("successfully update user");
                    navigate('/my-blog')
                } else {
                    toast.error("error while update user")
                }
            })

    }
    return (
        <div>
            <div className="row">
                <div className="col"></div>
                <div className="col" style={{ boxShadow: "10px 10px 5px lightblue", border: "1px solid blue", borderRadius: 10, marginTop: 100 }}>
                    <h2 className="title">Edit Blog</h2>
                    <div className="form-group">
                        <label htmlFor="">Title :</label>
                        <input onChange={(e) => setTittle(e.target.value)} value={title} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Content :</label>
                        <textarea onChange={(e) => setDetails(e.target.value)} value={details} className="form-control" cols="30" rows="10" />
                    </div>
                    <div className="form-group" style={{ marginTop: 20, marginBottom: 20 }}>
                        <button style={{ marginLeft: 80 }} onClick={onSave} className="btn btn-primary">Save</button>
                        <Link style={{ marginLeft: 40 }} to={"/my-blog"} className="btn btn-danger">
                            Cancel
                        </Link>
                    </div>

                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default EditBlog;