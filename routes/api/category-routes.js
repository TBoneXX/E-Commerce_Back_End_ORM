const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories including all associated Products
router.get('/', (req, res) => {
     Category.findAll({
        attributes: ['id', 'category_name'],
        include: [ 
          {
            model: Product,
            attributes: ['id', 'product_name', 'price']
          }
        ]
      })
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

});
   
  // find one category by its `id` value including its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: [ 'category_name', 'id'],
    include: [ 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price']
      }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });



});
 // create a new category
router.post('/', (req, res) => {
   Category.create({
    category_name: req.body.category_name,
  })
  .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

 // update a category by its `id` value
router.put('/:id', (req, res) => {
   Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 // delete a category by its `id` value
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(categoryData => {
        if (!categoryData) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;