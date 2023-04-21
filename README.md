# Interview Scheduler

1. Clone this repository.
2. Install the scheduler dependencies with `npm install`.
3. Clone the [scheduler-api repository](https://github.com/mzparulina/scheduler-api).
4. Install the scheduler-api dependencies with `npm install`.
5. Login to the the PostgreSQL server with the username **development** and the password **development**. Use the command `psql -U development`.
6. Create the database with the command `CREATE DATABASE scheduler_development;`.
7. Within the scheduler-api root folder, copy and paste the **.env.example file.** Name the new file **.env.development**.
8. In the **.env.development** file, add the following PostgreSQL configiration:

```sh
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

9. Run the scheduler-api with the command `npm start`.
10. Perform a database reset by navigating to http://localhost:8001/api/debug/reset in your browser.
11. In a seperate terminal window, navigate to the scheduler root folder and use the command `npm start` to run the scheduler.
12. Visit http://localhost:8000/ in your browser and check out the scheduler! The scheduler should
    now be populated with data from the scheduler-api.

## Dependancies

- axios: 0.20.0
- classnames: 2.2.6
- normalize.css: 8.0.1
- react: 16.9.0
- react-dom: 16.9.0
- react-hooks-testing-library: 0.6.0
- react-scripts: 3.4.4
- react-test-renderer: 16.9.0

## Running Webpack Development Server

```sh
npm run start
```

## Running Jest Test Framework

```sh
npm test
npm run coverage
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress
```sh
npm run cypress
```


## App Screenshots

Home
!["Scheduler Home"](https://github.com/mzparulina/scheduler/blob/master/docs/appointment-home.png)
Appointment Form
!["Scheduler Form"](https://github.com/mzparulina/scheduler/blob/master/docs/appointment-form.png)

Appointment Edit & Delete
!["Scheduler Buttons"](https://github.com/mzparulina/scheduler/blob/master/docs/appointment-buttons.png)

## Deployment
- Netlify: [scheduler](https://6442e07e414d60178b5f725d--cool-cat-36be52.netlify.app/)
- Railway: [scheduler-api repository](https://scheduler-api-production-d2f7.up.railway.app/)