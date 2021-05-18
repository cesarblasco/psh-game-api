# psh-game-api
Installation:

1) MySQL installed

2) Create a database called psh-api 

3) Modify the .env file with your credentials from MySQL

   PORT=3333
   HOST=0.0.0.0
   DB_CONNECTION=mysql
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=Yourpasswordhere
   MYSQL_DB_NAME=psh-api
  

4) npm install

5) Run migration with the command: 
   node ace migration:run

6) Start the server with the command:
   node ace serve -- watch

7) Run the task to generate the random data and insertions to the database in another terminal with the command:
   node ace generate:player_data
