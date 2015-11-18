var request = require('supertest');
var app = require('../../app').app;

// Models
var Item = require('../../app/models/item');

// Test 1 - checks the database to see if there are no items in the database
describe('ItemsController', function() {
  describe('with no data', function() {
    it('should return an empty list of items', function(done) {
      request(app).get('/api/items')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toEqual([]);
          done();
        }
      });
    });
  });

//.end triggers the function for you
// if there is not an error
// expect the body to be an empty string
// the response is just json
// can test what the data should look like
// can test the data that is coming back from any of our api calls


  describe('with data', function() {
    var testItem;

    beforeEach(function(done) {
      Item.create({ item_name: 'test item' }, function(err, newItem) {
        if (err) {
          done.fail(err);
        } else {
          testItem = newItem;
          done();
        }
      });
    });

    // Test 2 - check if showItems returns data when there is information in the database
    it('should return an item', function(done) {
      request(app).get('/api/items')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(1);
          returnedItem = res.body[0];
          expect(returnedItem).toBeDefined();
          expect(returnedItem.item_name).toEqual(testItem.item_name);
          done();
        }
      });
    });

    // Test 3 - check if createItem can create an entry in the database
    it('should create an item', function(done) {
      var createItem = {item_name: 'test 3 item', description: 'Test 3 create action'};
      request(app).post('/api/items/create')
      .send(createItem)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        console.log('This is res.body: ', res.body);
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toEqual(jasmine.objectContaining(createItem));

          var returnedItem = res.body;
          expect(returnedItem).toBeDefined();
          console.log('This is the returnedItem: ', returnedItem);

          expect(returnedItem.item_name).toEqual('test 3 item')
          console.log('This is the returnedItemId: ', returnedItem._id)

          console.log('This is res.body._id: ', res.body._id);

          Item.find({_id: returnedItem._id}, function (err, foundItem) {
            console.log('This is err inside of createItem: ', err);
            if (foundItem) {
              console.log('This is the foundItem: ', foundItem);
              expect(foundItem[0]).toEqual(returnedItem);

              Item.remove({_id: returnedItem._id} , function (err) {
                if (err) {
                  console.log('Failed to remove: ' + err);
                }
                done();
              })
            } else if(err) {
              done.fail(err);
            }
          })
          console.log('This is outside of the database query');
        }
      });
    });

    afterEach(function(done) {
      testItem.remove(function(err, removedItem) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });
  });
});


// Checks the database to see if there are no items
// describe('Items', function() {
//   describe('with no data', function() {
//     it('should create an item and assign it to a list', function(done) {
//       console.log('In the items test');
//       request(app).post('/api/items/create')
//       .send({item_name: 'mac book pro', description: 'computer', _list: '5642300a4e7bd69d9102d39a'})
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         console.log('In the end callback');
//         if (err) {
//           done.fail(err);
//         } else {
//           console.log('This is res.body: ', res.body);
//           expect(res.body.item_name).toEqual('mac book pro');
//           expect(res.body.description).toEqual('computer');
//           expect(res.body._list).toEqual('5642300a4e7bd69d9102d39a');
//           Item.remove({ _id: res.body._id }, function(err, numAffected) {
//             done();
//           })
//         }
//       });
//     });
//   });
// })

