# Pubmed Search Frontend

An ugly but functional frontend for [it's companion API](https://github.com/mark-restrepo/nih-backend).

## Installation

Installation requires [npm](https://www.npmjs.com/):

```bash
git clone git@github.com:mark-restrepo/nih-frontend.git
cd nih-frontend
npm install
```

The app can then be run with:

```bash
npm start
```

If setup was successful, you should be able to view the application at http://localhost:3000/. Please note that if you have not run [the backend](https://github.com/mark-restrepo/nih-backend), you will get errors trying to search anything.

### Docker

A docker configuration is also provided alongside the ui. To build the image, run:

```bash
docker build -t nih-frontend .
```

Then to run the image:

```bash
docker run -p 3000:3000 nih-frontend
```

There is also a docker-compose yml available that runs both components, pulling the latest from dockerhub:

```bash
docker compose up
```
