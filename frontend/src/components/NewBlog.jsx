import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { createURL } from "../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function NewBlog() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const navigate=useNavigate()
    const onSave = () => {
        if (title.length === 0) {
            toast.warn("enter title");
        } else if (details.length === 0) {
            toast.warn("enter content");
        } else {
            const url = createURL("blog/");
            axios.post(url, { title, details }, { headers: { "x-token": sessionStorage["token"] } })
                .then((response) => {
                    const result = response.data;
                    if (result["status"] === "success") {
                        toast.success("successfully added blog");
                        navigate('/home')
                    }else{
                        toast.error("error while adding blog")
                    }
                })
            }
        }
        return (
            <div>
                
                <div className="row">
                    <div className="col"></div>
                    <div className="col" style={{boxShadow:"10px 10px 5px lightblue",border:"1px solid blue",marginTop:30,borderRadius:10}}>
                    <h2 className="title">Post New Blog</h2>
                        <div  className="form-group">
                            <label htmlFor="" className="mt-3"><strong>Title:</strong></label>
                            <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="mt-3"><strong>Content:</strong></label>
                            <textarea onChange={(e) => setDetails(e.target.value)} className="form-control" cols="30" rows="10"></textarea>
                        </div>
                        <div className="form-group" style={{paddingBottom:10,paddingLeft:100}}>
                            <button onClick={onSave} className="btn btn-success mt-3" style={{ marginRight: 30 }}>Save</button>
                            <Link to="/home" className="btn btn-danger mt-3">Cancel</Link>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
    export default NewBlog