const allure = require('@wdio/allure-reporter').default;

describe('Q1 Part 2: Standard user purchase flow', () => {
    it('should complete purchase journey and verify details', async () => {
        allure.addFeature('Purchase Flow');
        allure.addSeverity('blocker');
        
        await allure.step('Login as standard_user', async () => {
            await browser.url('/');
            await $('[data-test="username"]').setValue('standard_user');
            await $('[data-test="password"]').setValue('secret_sauce');
            await $('[data-test="login-button"]').click();
        });

        await allure.step('Reset App State', async () => {
            await $('#react-burger-menu-btn').click();
            await $('#reset_sidebar_link').click();
            await $('#react-burger-cross-btn').click();
        });

        await allure.step('Add three items to cart', async () => {
            const inventoryItems = await $$('.inventory_item_name');
            for (let i = 0; i < 3; i++) {
                await $$('[data-test^="add-to-cart"]')[i].click();
            }
        });

        await allure.step('Verify cart and checkout', async () => {
            await $('.shopping_cart_link').click();
            await $('[data-test="checkout"]').click();
            await $('[data-test="firstName"]').setValue('John');
            await $('[data-test="lastName"]').setValue('Doe');
            await $('[data-test="postalCode"]').setValue('12345');
            await $('[data-test="continue"]').click();
        });

        await allure.step('Verify total price', async () => {
            const totalElement = await $('.summary_total_label');
            const totalText = await totalElement.getText();
            const total = parseFloat(totalText.replace('Total: $', ''));
            await expect(total).toBeGreaterThan(0);
        });

        await allure.step('Complete purchase', async () => {
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