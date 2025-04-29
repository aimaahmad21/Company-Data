const neatCsv = require('neat-csv'); // Import neat-csv for parsing CSV data

let TKR; // Declare the variable to store CSV data

describe('Companies name', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.fixture('companies.csv')
      .then(neatCsv) // Parse CSV
      .then((data) => {
        TKR = data; // Assign parsed data to TKR
      });

      
    // localStorage.setItem('clerk_telemetry_throttler', JSON.stringify({
    //   "[false,false,\"SignIn\",\"5.43.6\",false,\"COMPONENT_MOUNTED\",\"development\",\"@clerk/nextjs\",\"5.3.1\",false]": 1736758739459,
    //   "[false,false,\"SignIn\",\"5.43.7\",false,\"COMPONENT_MOUNTED\",\"development\",\"@clerk/nextjs\",\"5.3.1\",false]": 1736851368928
    // }));

    localStorage.setItem('user','undefined');
  })

  it('Passes with Soft Assertions', function () {
    // Ensure TKR is defined before using it
    if (!TKR) {
      throw new Error('TKR is not defined');
    }

    // Visit the login page
    cy.wait(2000)
    cy.visit('https://app.marketverse.ai');

    // // Commented out login steps (uncomment if required)
    cy.get('#identifier-field').type('aima.ahmad@datics.ai');
    cy.get('.cl-formButtonPrimary').click();
    cy.get('#password-field').should('be.visible').type('1234567890', { force: true });
    cy.get('.cl-formButtonPrimary').click();
    cy.wait(5000); // Wait for the page to load

   // Iterate through each company name in the CSV
    TKR.forEach((row) => {
      const companyName = row['Company Name']; // Replace with the correct column name from your CSV

      // Type into the search field and press Enter
      cy.get('.MuiInputBase-root').type(`${companyName}{enter}`);

      // Wait for options to load and click the desired option
      cy.wait(2000);
      cy.get('.css-1wtcfwn .MuiAutocomplete-option').click();

      // Wait for the next page or information to load
      cy.wait(5000);

      // Perform soft assertions
      cy.softAssert(() => {
        cy.get('.css-18q30ne').should('be.visible');
      });

      cy.softAssert(() => {
        cy.get('.css-kbn7if > :nth-child(1) > :nth-child(1) > .css-1rh32ff').should('be.visible');
      });

      // cy.get('.css-kbn7if > :nth-child(1) > :nth-child(1) > .css-1rh32ff').then(($el) => {
      //   const actualValue = $el.is(':visible');
      //   const expectedValue = true;

      //   cy.softAssert(actualValue, expectedValue, "Element Visible.");
      // });

      cy.softAssert(() => {
        cy.get('.css-3aa918 > .css-1i71sjj').should('be.visible');
      });

      cy.softAssert(() => {
        cy.get(':nth-child(4) > .css-1i71sjj').should('be.visible');
      });

      cy.softAssert(() => {
        cy.get(':nth-child(1) > .css-1ayaret > .MuiBox-root').should('be.visible');
      });

      cy.softAssert(() => {
        cy.get(':nth-child(2) > .css-1ayaret').should('be.visible');
      });
    });

    // Assert all soft assertions at the end of the test
    cy.assertAll();
  });
});
