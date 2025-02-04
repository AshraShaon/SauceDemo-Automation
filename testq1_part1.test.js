const allure = require('@wdio/allure-reporter').default;

describe('Q1 Part 1: Locked out user login', () => {
    it('should display error message when logging in as locked_out_user', async () => {
        allure.addFeature('Login Validation');
        allure.addSeverity('critical');
        
        await allure.step('Navigate to login page', async () => {
            await browser.url('/');
        });

        await allure.step('Enter credentials', async () => {
            await $('[data-test="username"]').setValue('locked_out_user');
            await $('[data-test="password"]').setValue('secret_sauce');
        });

        await allure.step('Click login button', async () => {
            await $('[data-test="login-button"]').click();
        });

        await allure.step('Verify error message', async () => {
            const errorElement = await $('[data-test="error"]');
            await expect(errorElement).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
    });
});