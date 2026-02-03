const { body } = require('express-validator');

exports.productValidator = [
  body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative number'),
  body('category').isIn(['Electronics', 'Clothing', 'Food', 'Books', 'Other']).withMessage('Invalid category'),
];
