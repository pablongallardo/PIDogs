/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const { get } = require('../../src/routes/temperament.js');

const agent = session(app);
const dog = {
  id: '107',
  name: " Eurasier",
  height: "40 - 70",
  weight: "52 - 60",
  life_span: "12 - 14 years"
};

describe('Dogs routes', () => {
  before(() => 
  conn.authenticate().catch((err) => {
    console.error('No se pudo conectar a la DataBase:', err);
  })
  );
    
  describe('/dogs',function() {
    it('GET responde con status 200', function(){
      return agent
      .get('/dogs')
      .expect(function(res){
        expect(res.status).equal(200);
      })
    })
  })
  describe('/dogs?name=', function(){
    it('GET responde con status 200 si encuentra un perro', function(){
      return agent
      .get('/dogs?name=Eurasier')
      .expect(function(res){
        expect(res.status).equal(200);
      })
    })
  })

  describe('/dogs/:id', function(){
    it('GET responde con status 200 si encuentra un perro con id', function(){
      return agent
      .get('/dogs/107')
      .expect(function(res){
        expect(res.status).equal(200);
      })
    })
  })
  describe('/temperament', function(){
    it('GET responde con status 200 a la ruta de los temperaments', function(){
      return agent
      .get('/temperament')
      .expect(function(res){
        expect(res.status).equal(200);
      })
    })
  })







});
