[![Build Status](https://travis-ci.org/DamienP33/express-mongoose-generator.svg?branch=master)](https://travis-ci.org/DamienP33/express-mongoose-generator)
# express-mongoose-generator

It’s a mongoose model, REST controller and Express router code generator for Express.js 4 application.

## Installation
```bash
$ npm install -g express-mongoose-generator
```

## Usage
### Non-Interactive mode
Generates a Mongoose model, a REST controller and Express router :
```bash
$ mongoose-gen -m car -f carDoor:number,color -r
        create: ./models/carModel.js
        create: ./routes/cars.js
        create: ./controllers/carController.js
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.

##### Available types
  - string
  - number
  - date
  - boolean
  - array

### Interactive mode

Generates a Mongoose model, a REST controller and Express router :
```bash
$ mongoose-gen
Model Name : car
Available types : string, number, date, boolean, array
Field Name (press <return> to stop adding fields) : door
Field Type [string] : number
Field Name (press <return> to stop adding fields) : color
Field Type [string] :
Field Name (press <return> to stop adding fields) :
Generate Rest (yes/no) ? [yes] :
        create: ./routes/cars.js
        create: ./controllers/carController.js
        create: ./models/carModel.js
```

## Rendering
### Model
models/carModel.js :
```javascript
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
  door: Number,
  color: String,
});

module.exports = mongoose.model('car', carSchema);
```

### Router
routes/cars.js :
```javascript
var controller = require('../controllers/carController.js');

module.exports = function(router) {

  /*
   * GET
   */
  router.get('/car', function(req, res) {
    controller.list(req, res);
  });

  /*
   * GET
   */
  router.get('/car/:id', function(req, res) {
    controller.show(req, res);
  });

  /*
   * POST
   */
  router.post('/car', function(req, res) {
    controller.create(req, res);
  });

  /*
   * PUT
   */
  router.put('/car/:id', function(req, res) {
    controller.update(req, res);
  });

  /*
   * DELETE
   */
  router.delete('/car/:id', function(req, res) {
    controller.remove(req, res);
  });

};

```

### Controller
controllers/carController.js :
```javascript
var Car = require('../models/carModel.js');

/**
 * @module models/carController.js
 * @description Server-side logic for managing cars.
 */
module.exports = {

  /**
   * GET carController
   */
  list: function(req, res) {
    Car.find(function(err, cars) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting car.',
        });
      }
      return res.json(cars);
    });
  },

  /**
   * GET carController
   */
  show: function(req, res) {
    var id = req.params.id;
    Car.findOne({_id: id}, function(err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting car.',
        });
      }
      if (!car) {
        return res.status(404).json({
          message: 'No such car',
        });
      }
      return res.json(car);
    });
  },

  /**
   * POST carController
   */
  create: function(req, res) {
    var car = new Car({
      door: req.body.door,
      color: req.body.color,

    });

    car.save(function(err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving car',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: car._id,
      });
    });
  },

  /**
   * PUT carController
   */
  update: function(req, res) {
    var id = req.params.id;
    Car.findOne({_id: id}, function(err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving car',
          error: err,
        });
      }
      if (!car) {
        return res.status(404).json({
          message: 'No such car',
        });
      }

      car.door = req.body.door ? req.body.door : car.door;
      car.color = req.body.color ? req.body.color : car.color;

      car.save(function(err, car) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting car.',
          });
        }
        if (!car) {
          return res.status(404).json({
            message: 'No such car',
          });
        }
        return res.json(car);
      });
    });
  },

  /**
   * DELETE carController
   */
  remove: function(req, res) {
    var id = req.params.id;
    Car.findByIdAndRemove(id, function(err, car) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting car.',
        });
      }
      return res.json(car);
    });
  },

};
```

You then only have to add router in app.js file and MongoDB connection whit Mongoose.
api.js :
```javascript
var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

// Home
router.get('/', function(req, res, next) {
  res.json({message: 'API is running'});
});

// Read all API routes
fs
  .readdirSync(path.join(__dirname, 'routes'))
  .forEach(function(file) {
    require('./routes/' + file)(router);
  });

module.exports = router;
```

app.js:
```
var app = express();
...
// Register routes
var api = require('./api');
app.use('/api', api);
```

## Licence

Copyright (c) 2014 Damien Perrier
Licensed under the [MIT license](LICENSE).
