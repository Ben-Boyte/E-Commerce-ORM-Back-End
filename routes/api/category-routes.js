const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
Category.findAll ({
  attributes: ['id', "category_name"],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock']
    }
  ]
})

.then(dbCategory => res.json(dbCategory))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
  })

});


router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'Not Found!!' });
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: "Not Found!!" });
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
