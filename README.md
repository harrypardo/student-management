# Student Management

##  Install backend
`cd student-management-backend-boilerplate-master`

`yarn install or npm install`

Add `.env` file in root

`
 APP_PORT=4000
 DB_HOST=localhost
 DB_USER=root
 DB_PASS=
 DB_NAME=development-student-management
 DB_DIALECT=mysql
 DB_PORT=3306
 APP_HOST=localhost
 NODE_ENV=development
`

Fill out my MySQL database details

` yarn run dev / npm run dev `


## Install Frontend

`cd student-management-frontend`

Add `env.local` file in root

`NEXT_PUBLIC_BACKEND_URL=http://localhost:4000` add in file 
