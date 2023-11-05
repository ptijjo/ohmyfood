
describe('Sign in complete test', () => {
  it('successfull', () => {
    cy.visit("/");

     cy.get("#email").type("test2@test.com");
     cy.get("#password").type("Francoise56?");
     cy.get("#formSignIn").submit();


  })

  it("fail", ()=>{

    cy.visit("/");
    
    cy.get("#email").type("test2@test.com");
     cy.get("#password").type("Francoise56");
     cy.get("#formSignIn").submit();
  })
})


