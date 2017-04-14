exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('snacks').del()
    .then(function () {
      // Inserts seed entries
      return knex('snacks').insert([
        {name:'Skinny Cow Rock', img_url: 'http://bit.ly/2p54fvQ', review_description: 'I tried a Skinny Cow Vanilla cake and it rocked!', rating: 5},
        {name:'Skinny Cow Rock', img_url: 'http://bit.ly/2p54fvQ', review_description: 'I tried a Skinny Cow Vanilla cake and it rocked!', rating: 5},
        {name:'Skinny Cow Rock', img_url: 'http://bit.ly/2p54fvQ', review_description: 'I tried a Skinny Cow Vanilla cake and it rocked!', rating: 5},
      ]);
    });
};
