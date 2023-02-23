using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using InvMng.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvMng.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public OrderDetailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select OrderDetailId as ""OrderDetailId"",
                        OrderDetail.OrderId as ""OrderId"",
                        ProductName as ""ProductName"",
                        Quantity as ""Quantity"",
                        Product.ProductPrice as ""Price""
                from ((OrderDetail
                    INNER JOIN Orders ON OrderDetail.OrderId = Orders.OrderId)
                    INNER JOIN Product ON OrderDetail.ProductId = Product.ProductId);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(OrderDetail odt)
        {
            string query = @"
                insert into OrderDetail(OrderId, ProductId,Quantity)
                values (@OrderId, @ProductId, @Quantity)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderId", odt.OrderId);
                    myCommand.Parameters.AddWithValue("@ProductId", odt.ProductId);
                    myCommand.Parameters.AddWithValue("@Quantity", odt.Quantity);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }



        [HttpPut]
        public JsonResult Put(OrderDetail odt)
        {
            string query = @"
                update OrderDetail
                set OrderId = @OrderId,
                ProductId = @ProductId,
                Quantity = @Quantity,
                where OrderDetailId=@OrderDetailId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderDetailId", odt.OrderDetailId);
                    myCommand.Parameters.AddWithValue("@OrderId", odt.OrderId);
                    myCommand.Parameters.AddWithValue("@ProductId", odt.ProductId);
                    myCommand.Parameters.AddWithValue("@Quantity", odt.Quantity);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Updated ");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from OrderDetail
                where OrderDetailId=@OrderDetailId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderDetailId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Deleted successfully");
        }

    }
}

