import { test, expect } from '@playwright/test';

import { signUp, logIn, signUpAndLogIn, uniqueUser } from './helpers';

test.describe('Authentication', () => {
  test('signs up and logs in', async ({ page }) => {
    await signUpAndLogIn(page);
  });

  test('shows an error toast for a wrong password', async ({ page }) => {
    const user = uniqueUser();

    await signUp(page, user);
    await logIn(page, { ...user, password: 'wrong-password' });

    await expect(page.getByText('Erro na autenticação')).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
