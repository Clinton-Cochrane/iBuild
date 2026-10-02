# iBuild

This repository contains two independent Vite applications and the portfolio contact API.

| Directory | Purpose |
| --- | --- |
| `game/` | KAPLAY game, including its own README and browser test scripts |
| `portfolio/` | React portfolio, including its own package files and `.env` |
| `api/ContactFunction/` | Portfolio contact form Lambda |
| `.github/workflows/deploy.yml` | Portfolio deployment workflow |

Run each application from its own directory:

```sh
cd game
npm ci
npm run dev
# or npm run build
```

```sh
cd portfolio
npm ci
npm run dev
# or npm run build
```

The portfolio build reads `VITE_CONTACT_API_URL` from `portfolio/.env` for the contact form. Portfolio assets live in `portfolio/public/`; game assets live in `game/public/`. The portfolio's `public/photos/` directory is ignored by Git in the original repository, so local photos need to be supplied separately for deployment.

The deployment workflow runs on changes to `portfolio/` or the workflow on `main`, or by manual dispatch. It builds from `portfolio/` and uploads that build to the existing S3 bucket. Review the AWS role's GitHub OIDC trust for the `iBuild` repository before merging this branch; the role was used by the separate portfolio repository.
