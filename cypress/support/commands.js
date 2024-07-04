beforeEach(() => {
  cy.viewport(1366, 768)
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window().then((window) => {
    window.sessionStorage.clear()
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('User is not logged!')) {
    return false
  }
  return false
});
