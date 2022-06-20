// Подключаю специальный метод Router для работы с маршрутами
const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/users');

// Joi schemes
const { updateProfileJoi } = require('../middlewares/joiSchemes');

router.get('/me', getProfile);
router.patch(
  '/me',
  updateProfileJoi,
  updateProfile,
);

module.exports = router;
