const allure = require('@wdio/allure-reporter').default;

describe('Q2: Performance glitch user flow', () => {
    it('should complete purchase with Z to A filter', async () => {
        allure.addFeature('Filter and Purchase');
        allure.addSeverity('normal');
        
        await allure.step('Login as performance_glitch_user', async () => {
            await browser.url('/');
            await $('[data-test="username"]').setValue('performance_glitch_user');
            await $('[data-test="password"]').setValue('secret_sauce');
            await $('[data-test="login-button"]').click();
        });

        await allure.step('Reset App State', async () => {
            await $('#react-burger-menu-btn').click();
            await $('#reset_sidebar_link').click();
            await $('#react-burger-cross-btn').click();
        });

        await allure.step('Filter by Z to A', async () => {
            await $('.product_sort_container').selectByAttribute('value', 'za');
            await browser.pause(1000);
        });

        await allure.step('Add first item to cart', async () => {
            await $$('[data-test^="add-to-cart"]')[0].click();
        });

        await allure.step('Complete checkout', async () => {
            await $('.shopping_cart_link').click();
            await $('[data-test="checkout"]').click();
            await $('[data-test="firstName"]').setValue('Jane');
            await $('[data-test="lastName"]').setValue('Smith');
            await $('[data-test="postalCode"]').setValue('67890');
            await $('[data-test="continue"]').click();
            await $('[data-test="finish"]').click();
            await expect($('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
        });

        await allure.step('Reset App State and logout', async () => {
            await $('#react-burger-menu-btn').click();
            await $('#reset_sidebar_link').click();
            await $('#logout_sidebar_link').click();
        });
    });
});