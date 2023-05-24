import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductsEdit = () => {
    const { productsid } = useParams();

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://localhost:7099/api/Products/" + productsid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            descriptionchange(resp.description);
            pricechange(resp.price);
            stockchange(resp.stock);
            imageURLchange(resp.imageURL);
            categoryNamechange(resp.categoryName);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[description,descriptionchange]=useState("");
    const[price,pricechange]=useState("");
    const[stock,stockchange]=useState("");
    const[imageURL,imageURLchange]=useState("");
    const[categoryName,categoryNamechange]=useState("");
    const[validation,valchange]=useState(false);



    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const productsdata={id,name,description,price,stock,imageURL,categoryName};
      

      fetch("https://localhost:7099/api/Products/"+productsid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(productsdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/productslisting');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Products Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input required value={description} onMouseDown={e=>valchange(true)} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                                    {description.length==0 && validation && <span className="text-danger">Enter the description</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input value={price} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Stock</label>
                                        <input value={stock} onChange={e=>stockchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input required value={imageURL} onMouseDown={e=>valchange(true)} onChange={e=>imageURLchange(e.target.value)} className="form-control"></input>
                                    {imageURL.length==0 && validation && <span className="text-danger">Enter the imageURL</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input required value={categoryName} onMouseDown={e=>valchange(true)} onChange={e=>categoryNamechange(e.target.value)} className="form-control"></input>
                                    {categoryName.length==0 && validation && <span className="text-danger">Enter the category name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/productslisting" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default ProductsEdit;