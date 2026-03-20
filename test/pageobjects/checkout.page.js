class CheckoutPage {
    get btnContinue() { return $('#continue'); }
    get errorContainer() { return $('.error-message-container'); }

    async clickContinue() {
        await this.btnContinue.click();
    }
}
export default new CheckoutPage();