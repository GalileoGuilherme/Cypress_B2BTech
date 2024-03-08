// Adiciona um comando personalizado para fazer login via API
Cypress.Commands.add('loginAdmViaApi', () => {
    // Carrega as credenciais do arquivo 'credentials.json' usando o fixture
    cy.fixture('credentials.json').then((credentials) => {
      // Faz uma requisição para fazer login com as credenciais carregadas
      return cy.request({
        method: 'POST',
        url: 'https://apidev.sga.bet/auth/login',
        headers: {
          'x-api-key': '02ff96c8f50ce6a488812146d448a04b2e2358dd45d0dbb59824'
        },
        form: true,
        body: {
          operator_code: 'Sysbet',
          login: credentials.login,
          password: credentials.senha
        }
      }).then((response) => {
        // Verifica se o token JWT foi retornado corretamente na resposta
        const token_jwt = response.body.token_jwt;
        if (!token_jwt) {
          throw new Error('Token JWT não encontrado');
        }
        // Retorna o token JWT
        return token_jwt;
      });
    });
  });
  
  // Adiciona um comando personalizado para fazer login e obter o token
  Cypress.Commands.add('loginAndGetToken', () => {
    // Chama o comando para fazer login via API e obter o token
    cy.loginAdmViaApi().then((token) => {
      // Verifica se o token foi obtido corretamente
      if (!token) {
        throw new Error('Token JWT não encontrado');
      }
      // Define o alias @tokenAdm com o token retornado
      cy.wrap(token).as('tokenAdm');
      // Armazena o token retornado no localStorage
      localStorage.setItem('token_jwt', token);
      // Armazena o token retornado no ambiente do Cypress
      Cypress.env('authToken', token);
    });
  });
  