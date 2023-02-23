using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace InvMng.Models
{
    public class OrderDetail
    {

        public int OrderDetailId { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }
    }
}

