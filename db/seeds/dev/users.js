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

// exports.seed = function(knex, Promise) {
//   // We must return a Promise from within our seed function
//   // Without this initial `return` statement, the seed execution
//   // will end before the asynchronous tasks have completed
//   return knex('footnotes').del() // delete all footnotes first
//     .then(() => knex('papers').del()) // delete all papers
//
//     // Now that we have a clean slate, we can re-insert our paper data
//     .then(() => {
//       return Promise.all([
//
//         // Insert a single paper, return the paper ID, insert 2 footnotes
//         knex('papers').insert({
//           title: 'Fooo', author: 'Bob', publisher: 'Minnesota'
//         }, 'id')
//         .then(paper => {
//           return knex('footnotes').insert([
//             { note: 'Lorem', paper_id: paper[0] },
//             { note: 'Dolor', paper_id: paper[0] }
//           ])
//         })
//         .then(() => console.log('Seeding complete!'))
//         .catch(error => console.log(`Error seeding data: ${error}`))
//       ]) // end return Promise.all
//     })
//     .catch(error => console.log(`Error seeding data: ${error}`));
// };
