
create table Category(
CategoryId serial PRIMARY KEY,
CategoryName varchar(500)
);

create table Product(
ProductId serial PRIMARY KEY,
ProductName varchar(500),
ProductPrice int,
CategoryId varchar(500)
CONSTRAINT fk_Category
   FOREIGN KEY(CategoryId) 
      REFERENCES Category(CategoryId)

);



insert into Category(CategoryName) values ('Food');
insert into Category(CategoryName) values ('Beverage');
insert into Category(CategoryName) values ('Appetizer');

select * from Category;

insert into Product(ProductName,ProductPrice,Category) values ('Pho',30000,1);
insert into Product(ProductName,ProductPrice,Category) values ('Tra Da',10000,2);
insert into Product(ProductName,ProductPrice,Category) values ('Goi',15000,3);
insert into Product(ProductName,ProductPrice,Category) values ('Bun Bo',45000,1);


select * from Product;

create table Orders(
OrderId SERIAL PRIMARY KEY,
TotalPrice int
);


create table OrderDetail (
OrderDetailId SERIAL,
OrderId int,
ProductId int,
Quantity int,
Price int,
	CONSTRAINT fk_Orders, fk_Product
  	 FOREIGN KEY(OrderId, ProductId) 
	REFERENCES Orders(OrderId), Product(ProductId)

);


insert into Orders(OrderId) values (1);
insert into Orders(OrderId) values (2);
select * from Orders;


insert into OrderDetail(OrderId, ProductId, Quantity)
values(1,1,2);
insert into OrderDetail(OrderId, ProductId, Quantity)
values(1,2,1);
insert into OrderDetail(OrderId, ProductId, Quantity)
values(2,3,3);

select * from OrderDetail;
    


SELECT OrderDetail.OrderDetailId, Orders.OrderId, Product.ProductName, OrderDetail.Quantity, OrderDetail.Price
FROM ((OrderDetail
INNER JOIN Orders ON OrderDetail.OrderId = Orders.OrderId)
INNER JOIN Product ON OrderDetail.ProductID = Product.ProductId);



select Orders.OrderId, Sum((OrderDetail.Quantity * Product.ProductPrice)) as TotalPrice 
From Orders
 join OrderDetail on OrderDetail.OrderId = Orders.OrderId
 join Product on OrderDetail.ProductId = Product.ProductId 
Group By Orders.OrderId;




