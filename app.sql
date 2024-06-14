create database egg_guesthouse;

use egg_guesthouse;

create table user(
    userId int not null auto_increment,
    userName varchar(20) default null comment '用户名',
    password varchar(40) default null comment '密码',
    avatar text default null comment '头像',
    phone varchar(20) default null comment '电话',
    createdAt timestamp default null comment '创建时间',
    updatedAt timestamp default null comment '更新时间',
    primary key(userId)
) engine = InnoDB auto_increment = 1 default charset = utf8mb4 comment = '用户表';

create table guesthouse(
    id int not null auto_increment,
    name varchar(50) default null comment '房屋名称',
    des varchar(150) default null comment '房屋简介',
    address varchar(100) default null comment '房屋地址',
    price int default null comment '房屋价格',
    cityCode varchar(10) default null comment '城市编码',
    showCount int not null default 0 comment '展示次数',
    startTime timestamp default null comment '开始出租时间',
    endTime timestamp default null comment '结束出租时间',
    createdAt timestamp default null comment '创建时间',
    updatedAt timestamp default null comment '更新时间',
    primary key(id)
) engine = InnoDB auto_increment = 1 default charset = utf8mb4 comment = '民宿表';

create table imgs(
    id int not null auto_increment,
    url varchar(150) default null comment '图片地址',
    guesthouseId int not null comment '房屋ID',
    createdAt timestamp default null comment '创建时间',
    updatedAt timestamp default null comment '更新时间',
    primary key(id)
) engine = InnoDB auto_increment = 1 default charset = utf8mb4 comment = '民宿图片表';

create table comment(
    id int not null auto_increment,
    userId int not null comment '用户ID',
    guesthouseId int not null comment '房屋ID',
    msg text default null comment '评论内容',
    createdAt timestamp default null comment '创建时间',
    updatedAt timestamp default null comment '更新时间',
    primary key(id)
) engine = InnoDB auto_increment = 1 default charset = utf8mb4 comment = '评论表';

create table orders(
    id int not null auto_increment,
    userId int not null comment '用户ID',
    guesthouseId int not null comment '房屋ID',
    isPayed int default 0 comment '是否支付, 0未支付, 1已支付',
    createdAt timestamp default null comment '创建时间',
    updatedAt timestamp default null comment '更新时间',
    primary key(id)
) engine = InnoDB auto_increment = 1 default charset = utf8mb4 comment = '订单表';

insert into
    guesthouse
values
    (
        1,
        '东城民宿',
        '东区 临近地铁',
        '东城区',
        200,
        '10001',
        1,
        '2020-08-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        2,
        '西城民宿',
        '西区 临近地铁',
        '西城区',
        100,
        '10001',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        3,
        '武昌民宿',
        '风景秀美适合放松身心',
        '洪山区',
        300,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        4,
        '汉口民宿',
        '风景秀美适合放松身心',
        '江岸区',
        300,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        5,
        '黄陂民宿',
        '风景秀美适合放松身心',
        '黄陂区',
        86.98,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        6,
        '江夏民宿',
        '风景秀美适合放松身心',
        '江夏区',
        86.98,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        7,
        '青山民宿',
        '风景秀美适合放松身心',
        '青山区',
        545.79,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        8,
        '武昌民宿2',
        '风景秀美适合放松身心',
        '洪山区',
        300,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        9,
        '汉口民宿2',
        '风景秀美适合放松身心',
        '江岸区',
        300,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        10,
        '黄陂民宿2',
        '风景秀美适合放松身心',
        '黄陂区',
        86.98,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        11,
        '江夏民宿2',
        '风景秀美适合放松身心',
        '江夏区',
        86.98,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        12,
        '青山民宿2',
        '风景秀美适合放松身心',
        '青山区',
        545.79,
        '10002',
        1,
        '2020-08-10 13:37:57',
        '2020-11-10 13:37:57',
        '2020-10-20 13:37:57',
        '2020-10-20 13:37:57'
    ),
    (
        13,
        '西丽民宿',
        'very good',
        '南山区',
        800,
        '10003',
        1,
        '2023-08-10 13:37:57',
        '2024-03-10 13:37:57',
        '2023-08-10 13:37:57',
        '2023-08-10 13:37:57'
    );

insert into
    imgs
values
    (
        1,
        "/static/images/flower.jpg",
        1,
        "2020-08-11 13:37:57",
        "2020-08-11 13:37:57"
    ),
    (
        2,
        "/static/images/flower.jpg",
        1,
        "2020-08-11 13:37:58",
        "2020-08-11 13:37:58"
    ),
    (
        3,
        "/static/images/flower.jpg",
        2,
        "2020-08-12 13:37:59",
        "2020-08-12 13:37:59"
    ),
    (
        4,
        "/static/images/flower.jpg",
        3,
        "2020-09-11 13:37:59",
        "2020-09-11 13:37:59"
    ),
    (
        5,
        "/static/images/flower.jpg",
        3,
        "2024-05-11 13:37:59",
        "2024-05-11 13:37:59"
    ),
    (
        6,
        "/static/images/flower.jpg",
        4,
        "2024-05-11 13:37:59",
        "2024-05-11 13:37:59"
    );