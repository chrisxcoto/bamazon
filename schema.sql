CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
    item_id int not NULL auto_increment,
    product_name varchar not null,
    department_name varchar not NULL,
    price decimal(6,2) not null,
    stock_quantity int not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity) 

values ("crest", "higiene", 2.99, 30);