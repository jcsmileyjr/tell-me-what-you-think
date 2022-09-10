describe("App loads", () => {
  it("to the local development environment", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Pop up modal", () => {
  it("Asks for a user name", () => {
    cy.get("label").should("contain", "What is your name");
  })

  it("has an input field for the user to type a username", () => {
    cy.get(".swal2-input").type("Test").should('have.value', 'Test');
  })

  it("Has a button title to confirm the input of the username and remove the pop up modal.", () => {
    cy.get(".swal2-confirm").click();
  })
})

describe("UI loads correctly", () => {
  it('should have a menu heading title "Article Read', () => {
    cy.get(".header__title--style").contains("Articles Read");
  })

  it('should have a menu heading title "Money Earned', () => {
    cy.get(".header__title--style").contains("Money Earned");
  })

  it('should display "0" for the stories read', () => {
    cy.get(".header__content--style").should("contain", "0");
  });

  it('should display content for the title of the story', () => {
    cy.get(".conversation__title--style").should('not.to.match', ':empty')
  });

  it('should display content to be read', () => {
    cy.get(".conversation__content--style").should('not.to.match', ':empty')
  });

  it("should have a button title 'Read More' to read another paragraph", () => {
    cy.get(".conversation__nextPage--style").should("contain", "Read More");
  });

  it("should have one input area for the user", () => {
    cy.get("textarea").should("have.length", 1);
  });

  it("should have a button title 'Next' to proceed to next part of the app", () => {
    cy.get(".thoughts__button--style").should("contain", "NEXT");
  });
});
