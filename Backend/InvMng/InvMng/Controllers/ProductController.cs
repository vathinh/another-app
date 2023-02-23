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
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select ProductId as ""ProductId"",
                        ProductName as ""ProductName"",
                        ProductPrice as ""ProductPrice"",
                        Product.Category as ""Category""
            
                from Product
                inner join Category ON Product.Category = Category.CategoryName;
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
        public JsonResult Post(Product prod)
        {
            string query = @"
                insert into Product (ProductName,ProductPrice,Category) 
                values               (@ProductName,@ProductPrice,@Category) 
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ProductName", prod.ProductName);
                    myCommand.Parameters.AddWithValue("@ProductPrice", prod.ProductPrice);
                    myCommand.Parameters.AddWithValue("@Category", prod.Category);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }



        [HttpPut]
        public JsonResult Put(Product prod)
        {
            string query = @"
                update Product
                set ProductName = @ProductName,
                ProductPrice = @ProductPrice,
                Category = @Category
                where ProductId=@ProductId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", prod.ProductId);
                    myCommand.Parameters.AddWithValue("@ProductName", prod.ProductName);
                    myCommand.Parameters.AddWithValue("@ProductPrice", prod.ProductPrice);
                    myCommand.Parameters.AddWithValue("@Category", prod.Category);
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
                delete from Product
                where ProductId=@ProductId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InvAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", id);
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

