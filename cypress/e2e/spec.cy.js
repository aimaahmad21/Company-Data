const neatCsv = require('neat-csv'); // Import neat-csv for parsing CSV data

let TKR; // Declare the variable to store CSV data

describe('Companies name', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.fixture('Bottom-200 Companies.csv')
      .then(neatCsv) // Parse CSV
      .then((data) => {
        TKR = data; // Assign parsed data to TKR
      });

      console.log("here TKR",TKR)

    localStorage.setItem('user','undefined');
  })

  it('Passes with Soft Assertions', function () {
    // Ensure TKR is defined before using it
    if (!TKR) {
      throw new Error('TKR is not defined');
    }

    // Visit the login page
    cy.wait(2000)
    cy.visit('https://next-app.marketverse.ai');

    // // Commented out login steps (uncomment if required)
    cy.get('#identifier-field').type('aima.ahmad@datics.ai');
    cy.get('.cl-formButtonPrimary').click();
    cy.get('#password-field').should('be.visible').type('1234567890', { force: true });
    cy.get('.cl-formButtonPrimary').click();
    cy.wait(5000); // Wait for the page to load
    cy.get('.MuiAvatar-img').click();
    cy.get('[href="/portfolio-tracker"]').click();
   // Iterate through each company name in the CSV
   TKR.forEach((row) => {
    const companyName = row['Company Name'];
  
    cy.get('input[placeholder="Search by Company"]')
      .clear({ force: true })
      .type(companyName, { force: true });
  
    // Wait for search suggestions to load
    cy.wait(2000);
  
    // Click the exact match
    cy.contains('.companyName', companyName)
      .should('be.visible')
      .click({ force: true });
  
    cy.wait(3000); // wait for page to load or do next steps
  });
  
    });
  });

