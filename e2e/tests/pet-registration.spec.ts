import path from 'path';

import { test, expect, Page } from '@playwright/test';

import { signUpAndLogIn } from './helpers';

const PET_PHOTO = path.join(__dirname, '..', 'fixtures', 'pet-photo.jpg');
const NOT_A_PET_PHOTO = path.join(__dirname, '..', 'fixtures', 'not-a-pet.png');

async function openRegistrationModal(page: Page) {
  await page.goto('/location');
  await page.locator('.leaflet-container').waitFor();
  await page.locator('.leaflet-container').click({ position: { x: 300, y: 200 } });
  await expect(page.getByText('Dados')).toBeVisible();
}

async function fillRequiredFields(page: Page) {
  await page.selectOption('#port', 'Médio');
  await page.locator('#breed').fill('Vira-lata');
  await page.locator('#information').fill('Cadastrado pelo teste E2E');
  await page.locator('#responsible_name').fill('E2E Test User');
}

test.describe('Pet registration', () => {
  test('creates a pet with a valid photo', async ({ page }) => {
    await signUpAndLogIn(page);
    await openRegistrationModal(page);

    await page.setInputFiles('#image\\[\\]', PET_PHOTO);
    await fillRequiredFields(page);
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.getByText('Cadastro realizado!')).toBeVisible();
  });

  test('rejects a photo that does not look like a pet', async ({ page }) => {
    await signUpAndLogIn(page);
    await openRegistrationModal(page);

    await page.setInputFiles('#image\\[\\]', NOT_A_PET_PHOTO);
    await fillRequiredFields(page);
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.getByText('Foto inválida')).toBeVisible();
    await expect(
      page.getByText('Uma ou mais imagens enviadas não parecem ser de um animal de estimação.'),
    ).toBeVisible();
    // Modal stays open so the user can pick a different photo.
    await expect(page.getByText('Dados')).toBeVisible();
  });
});
