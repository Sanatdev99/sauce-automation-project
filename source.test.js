import LoginPage from '../pageobjects/login.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';

describe('Sauce Demo Negative & Latency Flow', () => {
    it('UC-1: Negative Form Validation', async () => {
        await LoginPage.open();

        // 1. Empty Login
        await LoginPage.login('', '');
        await expect(LoginPage.errorContainer).toHaveTextContaining('Username is required');

        // 2. Username Only
        await browser.refresh();
        await LoginPage.inputUsername.setValue('standard_user');
        await LoginPage.btnSubmit.click();
        await expect(LoginPage.errorContainer).toHaveTextContaining('Password is required');

        // 3. Missing Postal Code
        await LoginPage.login('standard_user', 'secret_sauce');
        await $('#add-to-cart-sauce-labs-backpack').click();
        await $('.shopping_cart_link').click();
        await $('#checkout').click();
        await CheckoutPage.clickContinue();
        await expect(CheckoutPage.errorContainer).toHaveTextContaining('Postal Code is required');
    });

    it('UC-2: Latency Handling (Performance Glitch User)', async () => {
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        
        // Wait Strategy: Handles 5s delay without browser.pause()
        const inventory = await $('.inventory_list');
        await inventory.waitForDisplayed({ timeout: 10000 });
        await expect(inventory).toBeExisting();

        // Reset App State via Burger Menu
        await $('#react-burger-menu-btn').click();
        const resetLink = await $('#reset_sidebar_link');
        await resetLink.waitForClickable();
        await resetLink.click();

        // Logout
        await $('#logout_sidebar_link').click();
        await expect(LoginPage.btnSubmit).toBeExisting();
    });
});