describe('Automation testing', () => {
    it('check title of the web page', () => {
      cy.visit('https://www.saucedemo.com/');
  
      cy.title().should('eq', 'Swag Labs');
    });
  
    it('should allow user to login with valid credentials', () => {
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
    });
  
    it('should not allow user to log into site with invald credentials', () => {
      cy.visit('https://www.saucedemo.com/');
  
      cy.get('input[name="user-name"]').type('standrd_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
    });
  
    it('should not allow locked out user to login, even with valid credentials', () => {
      cy.visit('https://www.saucedemo.com/');
  
      cy.get('input[name="user-name"]').type('locked_out_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
    });
  
    it('should verify items can be addes to the cart', () => {
      //   user must login
      cy.visit('https://www.saucedemo.com');
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
  
      //     user can add items now
  
      cy.get('button[name="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '1');
      cy.get('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '2');
      cy.get('button[name="add-to-cart-sauce-labs-onesie"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '3');
    });
  
    it('verify that TestAllTheThing shirt is available for purchase', () => {
      cy.get('a#item_3_title_link').should('be.visible');
    });
  
    it('should verify items can be removed from the cart', () => {
      cy.visit('https://www.saucedemo.com');
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
  
      cy.get('button[name="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '1');
      cy.get('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '2');
      cy.get('button[name="add-to-cart-sauce-labs-onesie"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '3');
  
      cy.get('.shopping_cart_link').click();
      cy.go('forward');
      cy.get('button#remove-sauce-labs-onesie').should('be.visible');
  
      cy.get('button#remove-sauce-labs-onesie').should('be.visible').click();
      cy.get('.shopping_cart_badge').should('contain.text', '2');
      //     cy.get('shopping_cart_badge').should('contain.text', '2');
    });
  
    //   it('should check total price of items in cart to be correct',()=>{
  
    //                  cy.get('button[name="checkout"]').click();
  
    //         cy.get('form').within(($form) => {
    //           cy.get('input#first-name').clear().type('Richard');
    //           cy.get('input#last-name').clear().type('Steven');
    //           cy.get('input#postal-code').clear().type('00000');
    //           cy.get('div.checkout_buttons');
    //           cy.get('input#continue').click();
    //         });
    //   })
  
    it('should check total price of items in cart to be correct', () => {
      cy.visit('https://www.saucedemo.com');
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[name="login-button"]').click();
  
      cy.get('button[name="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '1');
      cy.get('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '2');
      cy.get('button[name="add-to-cart-sauce-labs-onesie"]').click();
      cy.get('.shopping_cart_badge').should('contain.text', '3');
  
      cy.get('.shopping_cart_link').click();
      cy.go('forward');
      cy.get('button[name="checkout"]').click();
  
      cy.get('form').within(($form) => {
        cy.get('input#first-name').clear().type('Richard');
        cy.get('input#last-name').clear().type('Steven');
        cy.get('input#postal-code').clear().type('00000');
        cy.get('div.checkout_buttons');
        cy.get('input#continue').click();
      });
  
      //     verify total price of item selected is OK
      cy.get('.summary_subtotal_label').should('contain.text', 'Item total: $53.97');
  
      cy.get('button#finish').click();
      cy.go('forward');
    });
  
    it('verify that pony image appear after succesful purchase', () => {
      cy.get('img.pony_express').should('be.visible');
    });
  });
  