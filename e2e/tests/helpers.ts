import { Page, expect } from '@playwright/test';

export interface TestUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

function randomDigits(length: number): string {
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += Math.floor(Math.random() * 10);
  }

  return result;
}

// Random (not just timestamp-based) so parallel workers never collide on the
// unique phone/email constraints, even when created in the same millisecond.
export function uniqueUser(): TestUser {
  return {
    name: 'E2E Test User',
    email: `e2e-${Date.now()}-${randomDigits(6)}@example.com`,
    password: 'Senha123!',
    phone: `11${randomDigits(9)}`,
  };
}

export async function signUp(page: Page, user: TestUser): Promise<void> {
  await page.goto('/signup');
  await page.getByPlaceholder('Nome').fill(user.name);
  await page.getByPlaceholder('E-mail').fill(user.email);
  await page.getByPlaceholder('Senha').fill(user.password);
  await page.getByPlaceholder('Telefone').fill(user.phone);
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect(page.getByText('Faça seu logon')).toBeVisible();
}

export async function logIn(page: Page, user: TestUser): Promise<void> {
  await page.getByPlaceholder('E-mail').fill(user.email);
  await page.getByPlaceholder('Senha').fill(user.password);
  await page.getByRole('button', { name: 'Entrar' }).click();
}

export async function signUpAndLogIn(page: Page): Promise<TestUser> {
  const user = uniqueUser();

  await signUp(page, user);
  await logIn(page, user);
  await expect(page).toHaveURL(/\/dashboard$/);

  return user;
}
