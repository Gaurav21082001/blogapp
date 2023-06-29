

create database todo_list;

use todo_list;

create table user(
    id integer primary key auto_increment,
    fname varchar(20),
    lname varchar(20),
    email varchar(50),
    password varchar(100),
    phone varchar(15)
);
create table blogs(
    id integer primary key auto_increment,
    title varchar(100),
    details varchar(1024),
    userId integer,
    status int(1) default 0,
    createdDate timestamp default CURRENT_TIMESTAMP
);
create table userDetails(
    id integer primary key auto_increment,
    fname varchar(20),
    lname varchar(20),
    email varchar(50),
    password varchar(100),
    phone varchar(15)
);

