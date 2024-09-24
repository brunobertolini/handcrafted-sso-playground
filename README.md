# Handcrafted Identiry Provider (IDP) SSO Playground

Just playing a bit around with handcrafted IDP SSO to learn about the OAuth flow.

I'm exploring, so do not consider this project as a real one, and I'm not concerned about good pratices, layout design, software architeture...
This is far to be considered a production-ready one.

## How to run

This project was made with NextJS and Turborepo, composed by 2 apps: IDP and Client.
- IDP handle all about auth and o auth flow
- Client just consume auth from IDP, like and SSO

If you run `yarn dev`, both project are up on localhost, in differente ports.
So, to run locally you need do with docker, because IDP uses cookie based auth, and cookies are isolated by domain (localhost), not by port.

Docker compose are present, just up.

### Env vars

We have a env file per project, and a root .env file to run containers. Setup this files before run docker.