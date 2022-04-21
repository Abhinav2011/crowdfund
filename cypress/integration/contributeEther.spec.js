/// <reference types="cypress"/>


describe('Contribute Ether to the campaign', () => {
    it('should be able submit (contribute) ether to the current campaign', () => {
        cy.visit('/campaigns/0xd733ddFd2215e2a84B76Ef46a91Fd78A64eD947e')
        cy.get('#contributeEther').type("1")
        cy.get('#contributeForm').submit()
    })
})