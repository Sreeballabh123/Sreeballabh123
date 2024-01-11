import express from 'express'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getsingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//routes
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)


//get products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getsingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete category
router.delete('/product/:pid',requireSignIn , isAdmin,deleteProductController)

export default router;