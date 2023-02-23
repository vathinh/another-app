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
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public OrderController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select Orders.OrderId as ""OrderId"",
                sum((OrderDetail.Quantity * Product.ProductPrice)) as ""TotalPrice"" 
                From Orders
                join OrderDetail on OrderDetail.OrderId = Orders.OrderId
                join Product on OrderDetail.ProductId = Product.ProductId 
                Group BY Orders.OrderId;

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
        public JsonResult Post(Order ord)
        {
            string query = @"
                insert into Orders(TotalPrice)
                values (@TotalPrice)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TotalPrice", ord.TotalPrice);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }



        [HttpPut]
        public JsonResult Put(Order ord)
        {
            string query = @"
                update Orders
                set TotalPrice = @TotalPrice
                where OrderId=@OrderId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderId", ord.OrderId);
                    myCommand.Parameters.AddWithValue("@TotalPrice", ord.TotalPrice);
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
                delete from Orders
                where OrderId=@OrderId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@OrderId", id);
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

