Sauce Demo Automation - Negative & Latency Flow
A robust automated testing suite built with WebDriverIO (v9) and JavaScript using the Page Object Model (POM). This project demonstrates advanced wait strategies and cross-browser parallel execution.

🚀 Key Requirements Fulfilled
UC-1: Form Validation (Negative Testing)
Login Validation: Verifies that the system triggers correct error messages when fields are left empty.

Checkout Validation: Ensures the "Postal Code" requirement is enforced during the checkout journey.

Logic: Uses high-fidelity assertions to catch specific error string fragments.

UC-2: Handling Latency (Wait Strategies)
Glitch Handling: Specifically designed to pass the performance_glitch_user flow, which has a 5-second built-in delay.

Wait Strategy: Uses waitForDisplayed() and waitForClickable() to sync with the browser.

Constraint: Strictly avoids anti-patterns like browser.pause() or sleep(), ensuring the fastest possible execution time.

Technical Architecture
Pattern: Page Object Model (POM) for clean separation of selectors and test logic.

Locators: Optimized CSS Selectors for reliable element identification.

Parallelism: Configured to run Firefox and Microsoft Edge simultaneously to reduce total execution time.

🛠️ Setup & Execution
1. Prerequisites
Node.js (v18 or higher recommended)

NPM (v9 or higher)

2. Installation
Bash
npm install
3. Running Tests
To execute the suite in both Firefox and Edge in parallel:

''' Bash
npm run test
📊 Reporting
The project utilizes the @wdio/spec-reporter to provide clear, real-time terminal feedback, categorized by browser and test suite.