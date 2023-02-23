import React,{Component} from 'react';
import {variables} from '../Variables.js';

export class Product extends Component{

    constructor(props){
        super(props);

        this.state={
            categorys:[],
            products:[],
            modalTitle:"",
            ProductId:0,
            ProductName:"",
            Category:"",
            ProductPrice:0
        }
    }

    refreshList(){

        fetch(variables.API_URL+'product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({products:data});
        });

        fetch(variables.API_URL+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({categorys:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeProductName =(e)=>{
        this.setState({ProductName:e.target.value});
    }
    changeCategory =(e)=>{
        this.setState({Category:e.target.value});
    }
    changeProductPrice =(e)=>{
        this.setState({ProductPrice:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Product",
            ProductId:0,
            ProductName:"",
            Category:"",
            ProductPrice:0
            
        });
    }
    editClick(pro){
        this.setState({
            modalTitle:"Edit Product",
            ProductId:pro.ProductId,
            ProductName:pro.ProductName,
            Category:pro.Category,
            ProductPrice:pro.ProductPrice
           
        });
    }

    createClick(){
        fetch(variables.API_URL+'product',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductName:this.state.ProductName,
                Category:this.state.Category,
                ProductPrice:this.state.ProductPrice
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductId:this.state.ProductId,
                ProductName:this.state.ProductName,
                Category:this.state.Category,
                ProductPrice:this.state.ProductPrice
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'product/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }


    render(){
        const {
            categorys,
            products,
            modalTitle,
            ProductId,
            ProductName,
            Category,
            ProductPrice
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Product
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ProductId
        </th>
        <th>
            ProductName
        </th>
        <th>
            Category
        </th>
        <th>
            Price
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {products.map(pro=>
            <tr key={pro.ProductId}>
                <td>{pro.ProductId}</td>
                <td>{pro.ProductName}</td>
                <td>{pro.Category}</td>
                <td>{pro.ProductPrice}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(pro)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(pro.ProductId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Product Name</span>
            <input type="text" className="form-control"
            value={ProductName}
            onChange={this.changeProductName}/>
        </div>

       
        <div className="input-group mb-3">
            <span className="input-group-text">Category</span>
            <select className="form-select"
            onChange={this.changeCategory}
            value={Category}>
                {categorys.map(cat=><option key={cat.CategoryId}>
                    {cat.CategoryName}
                </option>)}
            </select>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <input type="text" className="form-control"
            value={ProductPrice}
            onChange={this.changeProductPrice}/>
        </div>


     </div>

    </div>

    {ProductId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {ProductId!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}