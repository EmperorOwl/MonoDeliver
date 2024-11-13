# MonoDeliver

A web application created during FIT2095 using the MEAN stack which enables the allocation of packages to drivers for delivery.

#### Additional Files
- Place the following files in `/backend`
  - `.env`
    ```
    GOOGLE_APPLICATION_CREDENTIALS="./google-service-account.json"
    GEMINI_API_KEY=
    ```
  - `google-service-account.json` (for Google APIs)
  - `service-account.json` (for Firebase)

#### Single Server
- Access the app at http://localhost:8080
```shell
cd frontend
npm i --force
ng build
cd ../backend
npm i
npm start
```

#### Two Servers
- In app.js, comment out line 21 and uncomment line 26
- Access the app at http://localhost:4200
```shell
# Terminal 1
cd frontend
npm i
npm start

# Terminal 2
cd backend
npm i
npm start
```

#### Deployment
- Need to change `BACKEND_URL` in `/frontend/src/config.ts` to be the external IP of the VM
