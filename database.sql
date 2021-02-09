-- CREATE DATABASE "pear"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "city" VARCHAR (80) NOT NULL
);

CREATE TABLE restaurant (
    "id" SERIAL PRIMARY KEY,
    "city" VARCHAR (80) NOT NULL,
    "address" VARCHAR (200) NOT NULL,
    "phone" VARCHAR (20),
    "name" VARCHAR (200) NOT NULL,
    "photo1" VARCHAR (1000) NOT NULL,
    "photo2" VARCHAR (1000),
    "photo3" VARCHAR (1000),
    "photo4" VARCHAR (1000),
    "photo5" VARCHAR (1000),
    "place_id" VARCHAR (200) NOT NULL,
    "rating" numeric(2,1),
    "website" VARCHAR (200)
);

CREATE TABLE "favorite" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int references "user",
	"restaurant_id" int references "restaurant",
	"notes" text
);

CREATE TABLE "friend" (
	"id" SERIAL PRIMARY KEY,
	"user1_id" int references "user",
	"user2_id" int references "user"
);