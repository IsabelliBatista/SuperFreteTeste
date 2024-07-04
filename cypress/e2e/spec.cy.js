/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/#/calcular-correios')
  });
  it('happy scenario', () => {
    cy.wait(10000)

    cy.get('#originPostcode').type('08090284')
    cy.get('#object_format').click()
    cy.get('.Mui-selected').click()
    cy.get('#weight').click()
    cy.get('[data-value="0.3"]').click()
    cy.get('#packageHeight').type('2')
    cy.get('#packageWidth').type('11')
    cy.get('#packageDepth').type('16')
    cy.get('#destinationPostcode').type('05407002')
    cy.get('[data-cy="calculator-submit"]').click()
    cy.get('.MuiGrid-grid-xs-7 > .MuiTypography-root').scrollIntoView().should('be.visible')
    
  });

  it('origin zip code error', () => {
    cy.get('#originPostcode').type('00000-120')
    cy.get('#object_format').click()
    cy.get('.Mui-selected').click()
    cy.get('#weight').click()
    cy.get('[data-value="0.3"]').click()
    cy.get('#packageHeight').type('2')
    cy.get('#packageWidth').type('11')
    cy.get('#packageDepth').type('16')
    cy.get('#destinationPostcode').type('05407002')
    cy.get('[data-cy="calculator-submit"]').click()
    cy.wait(3000)
    cy.get('#originPostcode-helper-text').should('have.text', 'CEP de origem inválido.')
  });

  it('destination zip code error', () => {
    cy.get('#originPostcode').type('08090284')
    cy.get('#object_format').click()
    cy.get('.Mui-selected').click()
    cy.get('#weight').click()
    cy.get('[data-value="0.3"]').click()
    cy.get('#packageHeight').type('2')
    cy.get('#packageWidth').type('11')
    cy.get('#packageDepth').type('16')
    cy.get('#destinationPostcode').type('00000-120')
    cy.get('[data-cy="calculator-submit"]').click()
    cy.wait(3000)
    cy.get('#destinationPostcode-helper-text').should('have.text', 'CEP de destino inválido.')
  });

  it('measurement error', () => {
    cy.get('#originPostcode').type('08090284')
    cy.get('#object_format').click()
    cy.get('.Mui-selected').click()
    cy.get('#weight').click()
    cy.get('[data-value="0.3"]').click()
    cy.get('#packageHeight').type('0')
    cy.get('#packageWidth').type('2')
    cy.get('#packageDepth').type('7')
    cy.get('#destinationPostcode').type('05407002')
    cy.get('[data-cy="calculator-submit"]').click()
    cy.get('#packageHeight-helper-text').should('have.text', 'Altura mínima 0.4 cm.')
    cy.get('#packageWidth-helper-text').should('have.text', 'Largura mínima 8 cm.')
    cy.get('#packageDepth-helper-text').should('have.text', 'Comprimento mínimo 13 cm.')
  });
});
