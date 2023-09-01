import * as prodServices from '../../../src/services/dataBase/prodServicesDB.js';
import supertest from 'supertest';
import { expect } from 'chai';
import { products1, products2 } from '../../mocks/products.mocks.js';

// import 'dotenv/config';
// import config from '../../../src/config/config.js';
// console.log(config);
/* 
* Bloque comentado porque no me están llegando los values del config.js, encontré el problema, es que el .env se encuentra dentro de src y no en la raíz del proyecto, pero si lo muevo a la raíz del proyecto, deja de leerlo el config.js 

mongoose.connect(config.db.testing,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); */

const requester = supertest('http://localhost:8080');

describe.skip('Product router testing', function () {
  this.timeout(6000);

  describe('getProducts', () => {
    it('It should return an object with all the products of the DB', async () => {
      const response = await requester.get('/api/products').send();

      expect(response.ok).to.be.true;
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.status).deep.equal('success');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.payload).to.be.an('array');
    });
  });

  describe.skip('getProductById', () => {
    it('It should return an object whit a product from its id', async () => {
      const createProduct = await prodServices.createProduct(products1);
      console.log('createProduct: ' + createProduct);
      const id = '647bb555772098d69e1e8200';
      const response = await requester.get(`/api/products/${id}`).send();

      expect(response.ok).to.be.true;
      expect(response.statusCode).to.be.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.status).deep.equal('success');
      expect(response.body.data).to.be.an('object');
    });

    it('It should fail if the product id is wrong', async () => {
      const idError = '747bb555772098d69e1e8200';
      const bodyResponse = {
        status: 'error',
        message: 'Producto no encontrado',
      };

      const response = await requester.get(`/api/products/${idError}`).send();

      expect(response.ok).to.be.false;
      expect(response.statusCode).to.be.equal(404);
      expect(response.body).to.deep.equal(bodyResponse);
    });

    it('Should fail if product id is not an ObjectId', async () => {
      const idError = '747bb55577';
      const bodyResponse = {
        status: 'error',
        message: 'Error al obtener el producto',
      };

      const response = await requester.get(`/api/products/${idError}`).send();

      expect(response.ok).to.be.false;
      expect(response.statusCode).to.be.equal(500);
      expect(response.body).to.deep.equal(bodyResponse);
    });
  });

  /*   describe('createProducts', () => {
    it('It should create a new product', async () => {
      // crear user premium
      // mockear el inicio de sesión como premium para poder crear un producto por endpoint

      const response = await requester.post('/api/products').send(products1);

      console.log(response);
    });
  });
 */
});
