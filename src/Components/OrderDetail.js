import React, {Component} from 'react';
import { variables } from '../Variables';

export class OrderDetail extends Component{

    constructor(props){
        super(props);

        this.state={
            Orders:[],
            Products:[],
            OrderDetails:[],
            modalTitle:"",
            ProductName:"",
            OrderId:"",
            Quantity:0,
            Price:0,
            OrderDetailId:0,
            ProductId:"",

            OrderDetailIdFilter:"",
            PriceFilter:"",
            OrderDetailsWithoutFilter:[]
        }
    }

    FilterFn(){
        var OrderDetailIdFilter=this.state.OrderDetailIdFilter;
        var PriceFilter = this.state.PriceFilter;

        var filteredData=this.state.OrderDetailsWithoutFilter.filter(
            function(el){
                return el.OrderDetailId.toString().toLowerCase().includes(
                    OrderDetailIdFilter.toString().trim().toLowerCase()
                )&&
                el.Price.toString().toLowerCase().includes(
                    PriceFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({OrderDetails:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.OrderDetailsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({OrderDetails:sortedData});
    }

    changeOrderDetailIdFilter = (e)=>{
        this.setState.OrderDetailIdFilter=e.target.value;
        this.FilterFn();
    }
    changePriceFilter = (e)=>{
        this.setState.PriceFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){

        fetch(variables.API_URL+'order')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Orders:data});
        });

        fetch(variables.API_URL+'product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Products:data});
        });
        fetch(variables.API_URL+'OrderDetail')
        .then(response=>response.json())
        .then(data=>{
            this.setState({OrderDetails:data,OrderDetailsWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeProduct =(e)=>{
        this.setState({ProductId:e.target.value});
    }

    changeOrder =(e)=>{
        this.setState({OrderId:e.target.value});
    }

    changeQuantity =(e)=>{
        this.setState({Quantity:e.target.value});
    }
    
  
    addClick(){
        this.setState({
            modalTitle:"Add OrderDetail",
            OrderDetailId:0,
            OrderId:"",
            ProductId:"",
            Quantity:0
        });
    }
    editClick(odt){
        this.setState({
            modalTitle:"Edit OrderDetail",
            OrderDetailId:odt.OrderDetailId,
            OrderId:odt.OrderId,
            ProductId:odt.ProductId,
            Quantity:odt.Quantity,
        });
    }

    createClick(){
        fetch(variables.API_URL+'OrderDetail',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrderId:this.state.OrderId,
                ProductId:this.state.ProductId,
                Quantity:this.state.Quantity
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
        fetch(variables.API_URL+'OrderDetail',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrderDetailId:this.state.OrderDetailId,
                OrderId:this.state.OrderId,
                ProductId:this.state.ProductId,
                Quantity:this.state.Quantity
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
        fetch(variables.API_URL+'OrderDetail/'+id,{
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
            OrderDetails,
            modalTitle,
            OrderDetailId,
            Quantity,
            ProductId,
            OrderId
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add OrderDetail
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeOrderDetailIdFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('OrderDetailId',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('OrderDetailId',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            OrderDetailId
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changePriceFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Price',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Price',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            OrderId
      
        </th>
        <th>ProductName</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {OrderDetails.map(dep=>
            <tr key={dep.OrderDetailId}>
                <td>{dep.OrderDetailId}</td>
                <td>{dep.OrderId}</td>
                <td>{dep.ProductName}</td>
                <td>{dep.Quantity}</td>
                <td>{dep.Price}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(dep)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(dep.OrderDetailId)}>
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

        <div className="input-group mb-3">
            <span className="input-group-text">OrderId</span>
            <input type="text" className="form-control"
            value={OrderId}
            onChange={this.changeOrder}/>
        </div> 

       <div className="input-group mb-3">
            <span className="input-group-text">Product</span>
            <input type="text" className="form-control"
            value={ProductId}
            onChange={this.changeProduct}/>
        </div>

       <div className="input-group mb-3">
        <span className="input-group-text">Quantity</span>
        <input type="text" className="form-control"
        value={Quantity}
        onChange={this.changeQuantity}/>
       </div>
     
        {OrderDetailId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {OrderDetailId!==0?
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