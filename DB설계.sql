create table user(
	Id int(11) not null auto_increment,
	email varchar(50) not null unique,
	profile text default "null",
	password varchar(40) not null,
    userName varchar(40) not null,
	birthday varchar(40) not null,
	gender varchar(10),
	primary key(Id),
	index(email)
);
create table post(
	Id int(11) not null auto_increment,
	content varchar(255) not null,
	userName varchar(50) not null,
	inserDt varchar(255) not null,
	image text default "null",
	userId int(11),
	primary key(Id),
	foreign key(userId) REFERENCES user(Id) ON UPDATE CASCADE,
	index(Id)
);
create table comment(
	Id int(11) not null auto_increment,
	comment varchar(50) not null,
	userId int(20) not null,
	postId int(20) not null,
	primary key(Id),
	foreign key(userId) REFERENCES user(Id) ON UPDATE CASCADE,
    	foreign key(postId) REFERENCES post(Id) ON UPDATE CASCADE,
	index(Id)
);
create table like(
	Id int(11) not null auto_increment,
	userId int(20) not null,
	postId int(20) not null,
	primary key(Id),
	foreign key(postId)REFERENCES post(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    	foreign key(userId)REFERENCES user(Id) ON DELETE CASCADE ON UPDATE CASCADE,
	index(userId)
);