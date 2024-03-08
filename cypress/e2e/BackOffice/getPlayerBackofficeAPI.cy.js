/// <reference types="cypress" />

// Descreve o conjunto de testes para a API backOffice
describe('getPlayer - API backOffice', () => {
    // Antes de cada teste
    beforeEach(() => {
      // Carrega as URLs do arquivo 'url.json' usando o fixture
      cy.fixture('url.json').then((urls) => {
        // Visita a URL de login do backOffice definida no arquivo 'url.json'
        cy.visit(urls.urlBackOffice.login);
        // Log para indicar que a visita à página foi realizada
        cy.log('foi');
      });
  
      // Realiza o login e obtém o token de autenticação
      cy.loginAndGetToken();
    });
      
    // Teste para verificar se um jogador com login "alienmb" é retornado corretamente
    it('Deve retornar o player com login "alienmb"', () => {
      // Carrega as URLs do arquivo 'url.json' usando o fixture
      cy.fixture('url.json').then((urls) => {
        // Faz uma requisição para o endpoint 'getPlayer' usando a URL definida no 'url.json'
        cy.request({
          method: 'POST',
          url: urls.urlBackOffice.getPlayer,
          headers: {
            'Application-Authorization': Cypress.env('authToken'),
            'x-api-key': '02ff96c8f50ce6a488812146d448a04b2e2358dd45d0dbb59824'
          },
          form: true,
          body: {
            id_user: "719464"
          }
        }).then((response) =>{
          // Verifica se a requisição retorna o status 200 e se o login é "alienmb"
          expect(response.status).to.eq(200)
          expect(response.body.dados.login).to.eq("alienmb")
        });
      });
    });
  
    // Teste para verificar se é retornada uma mensagem de erro quando o jogador não é encontrado
    it('Deve retornar player não encontrado', () => {
      // Carrega as URLs do arquivo 'url.json' usando o fixture
      cy.fixture('url.json').then((urls) => {
        // Faz uma requisição para o endpoint 'getPlayer' usando a URL definida no 'url.json'
        cy.request({
          failOnStatusCode: false,
          method: 'POST',
          url: urls.urlBackOffice.getPlayer,
          headers: {
            'Application-Authorization': Cypress.env('authToken'),
            'x-api-key': '02ff96c8f50ce6a488812146d448a04b2e2358dd45d0dbb59824'
          },
          form: true,
          body: {
            id_user: ""
          }
        }).then((response) => {
          // Verifica se a requisição retorna o status 400 e se a mensagem de erro é correta
          expect(response.status).to.eq(400)
          expect(response.body.messages.error).to.eq("Nenhum jogador encontrado!")
        });
      });
    });
  });
  