import { faker } from "@faker-js/faker";

describe("template spec", () => {
  it("passes", () => {
    const dateNow = new Date().getDate();
    // Generate random data using Faker.js
    const randomNumeric = faker.string.numeric(6);
    const randomSaldo = faker.string.numeric(30);
    const randomFullName = faker.person.fullName();
    const randomPhone = faker.phone.number();
    cy.visit("/testing");

    // Use the generated random data
    cy.get('[data-id="input-full_name"]').type(randomFullName);
    cy.get('[data-id="input-pn"]').type(randomNumeric);
    cy.get('[data-id="input-phone"]').type(randomPhone);
    cy.get('[data-id="input-saldo"]').type(randomSaldo);
    cy.get('[data-id="button-calendar-birthday"]')
      .should("be.visible")
      .click();
    cy.get('[ data-id="date-picker-content"]').should("be.visible");
    cy.get('button[name="day"]').contains(dateNow).click();
    cy.get("body").click(0, 0);
    cy.get('[data-id="button-submit"]').click();
  });
});
