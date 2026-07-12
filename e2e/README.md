# PetFinder E2E tests

Playwright tests that drive the real frontend + backend together (not unit tests — see
`petfinder-backend/` and `petfinder-web/` for those).

## Running locally

```
cd e2e
yarn install
yarn test
```

This starts a backend on port `3334` and the frontend on port `3001` (different from the normal
dev ports, so it won't conflict with `yarn dev` running elsewhere). The backend uses its own
SQLite file (`petfinder-backend/src/database/e2e.sqlite`) and its own uploads folder
(`petfinder-backend/uploads-e2e/`), reset on every run — never touches your real dev data.

## Mocking the Gemini image validation

Pet photo uploads normally call the Gemini API to check the photo is of an animal
(`petfinder-backend/src/services/PetImageValidationService.ts`). E2E tests set
`PET_IMAGE_VALIDATION_MOCK=true`, which skips the real API call and instead decides valid/invalid
based on the uploaded filename: any file whose name contains `not-a-pet` is rejected, everything
else is accepted. See `fixtures/pet-photo.jpg` and `fixtures/not-a-pet.png`.

## `prisma db push --force-reset`

The backend's `webServer` command resets the E2E database schema before every run. If Prisma
ever blocks this with an AI-agent consent prompt (it can detect when it's invoked through an AI
coding tool), that's a one-time human-confirmation gate — set
`PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` to the exact text of the human's consent message for
that single run. Don't hardcode a consent value into this repo.
