/// <reference types="cypress"/>


describe('Form submisson for minimum contribution in a new campaign', () => {
    it('should navigate to the homepage', () => {
        cy.visit('/campaigns/new')
        cy.url().should('include','/campaigns/new')
        cy.get('#minValue').type("100")
        cy.get('#newCampaignForm').submit()
    })
})