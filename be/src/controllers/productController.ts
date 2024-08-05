import mongoose from "mongoose"
import Product from "../models/productModel"
import { z } from 'zod'

const productBody = z.object({
    name: z.string().min(1,"Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    image: z.string().min(1, "Image URL is required")
})

export const createProduct = async (req:any, res:any) => {
try {
      const validation = productBody.safeParse(req.body)
      if(!validation.success)  return res.status(400).json("Validation failed")
        const newProduct = new Product(validation.data)
        const savedProduct = await newProduct.save()

        res.status(201).json({
            success:true,
            msg: "Product created Succesfully",
            savedProduct
        })

} catch (err) {
    res.status(500).json({
        success:false,
        message: "Internal server error",
        err
    });
}
}

export const getProduct = async (req:any, res:any) => {
            try {
                const prodId = req.params.id;
                const product = await Product.findById(prodId)
                
                if (!mongoose.Types.ObjectId.isValid(prodId)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid product ID"
                    });
                }
        
                if(!product) {
                    return res.status(404).json({
                        message:"Product not found"
                    })
                };
                res.status(200).json({
                    success:true,
                    product
                })
            } catch (err)  {
                res.status(500).json({
                sucess:false,
                    message: "Internal server error",
                    err
                });
            }
}

export const getAllProducts = async(req:any, res:any) =>{ 
    try {
            const products = await Product.find({})
            res.status(200).json({sucess:true, data:products})
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "Internal server error",
            err
        });
    }
}

export const deleteProduct = async(req:any, res:any) =>{ 
    try {
        const prodId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(prodId)) {
            return res.status(400).json({
                success:false,
                message:"Invalid prod Id"
            })
        }

        const deletedProduct = await Product.findByIdAndDelete(prodId)

        if(!deletedProduct) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        
        res.status(200).json({
            success:true,
            message: "Product Deleted SUccessfully",
            deletedProduct

        })
    } catch (err) {
        res.status(500).json({
            sucess:false,
            message: "Internal server error",
            err
        });
    }
}

export const updateProduct = async(req:any, res:any) =>{ 
    try {
        const prodId = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(prodId)) {
            return res.status(404).json({
                success:false,
                message:"Invalid product id"
            })
        };

        const validation = productBody.safeParse(req.body)
        if(!validation.success) {
            return res.status(400).json({
                success:false,
                message: "Validation failed"
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(prodId, validation.data, {new:true})

        if(!updatedProduct) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Product updated successfully",
            updatedProduct
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        });
    }
}