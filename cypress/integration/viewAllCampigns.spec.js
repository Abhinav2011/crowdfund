/// <reference types="cypress"/>

describe('Check to see if view all campaigns button is running', () => {
    it('should take the user back to the homepage', () => {
        cy.visit('/')
        cy.visit('/campaigns/new')
        cy.get('#viewAllCampaigns').click()
    })
})