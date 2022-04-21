/// <reference types="cypress"/>

describe('Check if create new campiagn button works properly', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should navigate to the new campaigns page', () => {
    
        cy.get('#newCampaign').click()
        cy.url().should('include','/campaigns/new')
        
    })
    
})