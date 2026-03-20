import LoginPage from '../pageobjects/login.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';

describe('Sauce Demo - Negative & Latency Flow', () => {

    it('UC-1: Form Validation', async () => {
        await LoginPage.open();
        
        // 1. Empty fields validation
        await LoginPage.login('', '');
        await expect(LoginPage.errorContainer).toHaveText(
            expect.stringContaining('Username is required')
        );

        // 2. Missing password validation
        await browser.refresh();
        await LoginPage.inputUsername.setValue('standard_user');
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.errorContainer).toHaveText(
            expect.stringContaining('Password is required')
        );

        // 3. Missing Postal Code validation
        await LoginPage.login('standard_user', 'secret_sauce');
        await $('#add-to-cart-sauce-labs-backpack').click();
        await $('.shopping_cart_link').click();
        await $('#checkout').click();
        await $('#first-name').setValue('Sanat');
        await $('#last-name').setValue('Abdalov');
        await CheckoutPage.clickContinue();
        await expect(CheckoutPage.errorContainer).toHaveText(
            expect.stringContaining('Postal Code is required')
        );
    });

    it('UC-2: Latency & App State', async () => {
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        
        // Wait for inventory (handles the 5s glitch delay)
        const inventory = await $('.inventory_list');
        await inventory.waitForDisplayed({ timeout: 10000 });
        await expect(inventory).toBeExisting();

        // Reset App State via Burger Menu
        await $('#react-burger-menu-btn').click();
        const resetBtn = await $('#reset_sidebar_link');
        await resetBtn.waitForClickable();
        await resetBtn.click();

        // Logout
        await $('#logout_sidebar_link').click();
        await expect(LoginPage.btnSubmit).toBeExisting();
    });
});