# Money Manager
>This was created during my time as a student at Code Chrysalis

Money Manager is a simple API that helps you keep track of your expenses.

Money Manager is powered by Graphql<br> 
![alt text](img/graphql-logo.png)

Node<br>
![alt text](img/node-logo.png)

and PostrgeSQL<br>
![alt text](img/postgresql-logo.png)

<br>
## Set Up

Clone this repository

```bash
git clone https://github.com/zero4994/money-manager.git
```

Install [PostgreSQL](https://postgresapp.com/) (on Mac)

Create database

```bash
CREATE DATABASE m_manager;
```

Run migrations files

```bash
yarn migrate;
```

The created database will have this schema<br>
![alt text](img/database-schema.png)

>**Users**: This is the table that will hold all users
<br>
>**Accounts**: In this table the accounts will be stored. There should be only one account per user.
<br>
>**Transactions**: In this table all the transactions made by all users will be stored.

<br>

Run seed file

```bash
yarn seed;
```

>The seed files contains two users<br>
>**username**: bob.k<br>
>**password**: userpass<br><br>
>**username**: harvey.ibarra<br>
>**password**: userpass<br>
