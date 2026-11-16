# Express Frontend – Jenkins CI/CD

A minimal Express web app with a health endpoint and Node test. Jenkins pipeline is defined in `Jenkinsfile` and deploys to an Ubuntu EC2 host using the systemd service `express-frontend`.

## Local run
```bash
npm install
npm test
npm start
```

Open `/` on port 3000; health endpoint is `/health`. Set `BACKEND_URL` to configure the displayed backend URL.

Configure Jenkins as Pipeline from SCM with Script Path `Jenkinsfile`. Commit `package-lock.json` after running `npm install` before switching the pipeline to `npm ci`.