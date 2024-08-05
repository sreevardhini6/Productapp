import express from'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productController'

const router = express.Router()

router.post("/",createProduct)
router.get("/",getAllProducts)
router.get("/:id",getProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export {
    router as productRouter
}