 //Prueba que comprueba que lpos elementos importantes del juego carguen correctamente.
 describe('Prueba de carga inicial', () => {
  it ('Debe cargar la página y mostrar elementos importantes', () => {
      cy.visit('http://127.0.0.1:3000/');
      cy.get('.display-1').should('exist');
      cy.get('#estado-p').should('exist');
      cy.get('.imagen-oculta').should('have.length', 8);
  });
});

//Prueba que comprueba que las interacciones funcionen correctamente.
describe('Prueba de interacción', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/');
  });

  it('Debe revelar las imágenes al hacer clic', () => {
    cy.get('.imagen-oculta').first().click();
    cy.get('.imagen-oculta').first().should('not.have.class', 'imagen-oculta');
  });

  it('Debe bloquear el clic en las imágenes ya descubiertas', () => {
    cy.get('.imagen-oculta').first().click();
    cy.get('.imagen-oculta').first().should('not.have.class', 'imagen-oculta');

    cy.get('.imagen-oculta').first().click();
    cy.get('.imagen-oculta').first().should('have.class', 'imagen-oculta');
  });
});

//Prueba de comparación de imágenes, para ver si la función principal del juego funciona correctamente.
describe('Prueba de comparación de imágenes', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:3000/');
  });

  it('Debe revelar las imágenes que cuyos pares coinciden y ocultar las que no', () => {
      //Hacer click en dos imágenes del mismo par
      cy.get('.imagen-oculta[data-par="1"]').first().click();
      cy.get('.imagen-oculta[data-par="1"]').last().click();
      //Verificar que las imágenes coincidentes clickeadas estén a la vista
      cy.get('.descubierta[data-par="1"]').should('not.have.class', 'imagen-oculta');
      //Hacer click en dos imágenes de pares diferentes
      cy.get('.imagen-oculta[data-par="2"]').first().click();
      cy.get('.imagen-oculta[data-par="3"]').last().click();
      //Verificar que las imágenes no coincidentes sean ocultadas después del tiempo determinado
      cy.get('.imagen-oculta[data-par="2"]').should('have.class', 'imagen-oculta');
      cy.get('.imagen-oculta[data-par="3"]').should('have.class', 'imagen-oculta');
  });
});

//Prueba de fin del juego, para ver si la función que le anuncia al usuario que ha ganado funciona correctamente.
describe('Prueba de fin del juego', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/');
  });

  it('Debe revelar el fin del juego', () => {
    cy.get('.imagen-oculta').each(($imagen) => {
      cy.wrap($imagen).click();
    });

    cy.contains('¡Felicidades! Has encontrado todos los pares.');
    cy.get('#estado-p').should('have.class', 'estado-ganador');
  });
});

//Prueba de reinicio de juego
describe('Prueba de reinicio del juego', () => {
  it('Debe reiniciar el juego después de completar una partida', () => {
    cy.visit('http://127.0.0.1:3000/');

    // Clic en todas las imágenes
    cy.get('.imagen-oculta').each(($imagen) => {
      cy.wrap($imagen).click();
    });

    // Verifica que todas las imágenes estén ocultas nuevamente
    cy.get('.imagen-oculta').should('have.length', 8);

    // Verifica que el contador de turnos se restablezca
    cy.get('#contador').should('have.text', 'Turnos: 0');
  });
});