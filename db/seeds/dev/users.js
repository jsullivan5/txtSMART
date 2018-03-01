/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('texts').del()
    .then(() => knex('users').del())
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({
          first_name: 'James',
          last_name: 'Sullivan',
          email: 'jamesfsullivan5@gmail.com',
          phone_number: '+12146210523'
        }, 'id')
        .then(userId => {
          return knex('texts').insert([
          {
            body: 'hello!',
            from: '+12146210523',
            to: '+18178732313',
            smsId: '123',
            user_id: userId[0]
          },
          {
            body: 'goodbye!',
            from: '+12146210523',
            to: '+18178732313',
            smsId: '123',
            user_id: userId[0]
          }
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ]);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
