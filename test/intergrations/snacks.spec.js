'use strict';
process.env.NODE_ENV = 'test';
process.env.PORT = 8000;

const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const knex = require('../../db/knex');


beforeEach(function(){
  return knex('snacks').del()
    .then(function () {
      // Inserts seed entries
      return knex('snacks').insert([
        {id: 1, name: 'Wookiee Cookies', img_url: 'http://www.starwarscats.com/wp-content/uploads/2013/02/storm-trooper-cats.jpg', review_description: 'so awesome', rating: 5},
        {id: 2, name: 'Greedos', img_url: 'http://www.starwarscats.com/wp-content/uploads/2013/01/darth-vader-cat.jpg', review_description: 'dangerously greeedy', rating: 5},
        {id: 3, name: 'Boba Fett Tea', img_url: 'http://i.imgur.com/0Vq2P50.jpg', review_description: 'high caffeine', rating: 5},
      ]);
    });
});

describe("snacks", function() {
  describe("#index", function() {
    it('show all the snacks', function() {
      return request(app).get('/server/snacks')
              .then(function(response){
                expect(response.text).to.include('Wookiee Cookies');
                expect(response.text).to.include('Greedos');
                expect(response.text).to.include('Boba Fett Tea');
              })
    });
  });

  describe("#new", function() {
    it('gives a form to make a new snack', function() {
      return request(app).get('/snacks/new')
              .then(function(response){
                expect(response.text).to.include('Snacks Form!');
                expect(response.text).to.include('<form');
              })
    });
  });

  describe.only("#post", function() {
    it('creates a snack', function() {
      return request(app).post('/server/snacks')
              .send({
                id: 4,
                name: 'a new snack',
                img_url: 'whateevr.png',
                review_description: 'mediocre',
                rating: 4
              })
              .then(function(response){
                return request(app).get('/server/snacks')
                        .then(function(response){
                          expect(response.text).to.include('Wookiee Cookies');
                          expect(response.text).to.include('Greedos');
                          expect(response.text).to.include('Boba Fett Tea');
                          expect(response.text).to.include('a new snack');
                        })
              })
    });
  });

  describe('#:snack_id/edit', () => {
    it('should send an edit snack form', () => {
      return request(app).get('/server/snacks/3/edit').then((response) => {
        expect(response.text).to.include('Edit page for Boba Fett Tes')
      })
    });
    it('should send an edit snack form', () => {
      return request(app).get('/server/snacks/2/edit').then((response) => {
        expect(response.text).to.include('Edit page for Greedos')
      })
    });
  });

  describe('#update', () => {
    it('should update the boba fett tea', () => {
      return request(app).patch('/server/snacks/3').send({
        snacks: {

        }
      })
    });
  });

});
