import {create} from "zustand"
import { BACKEND_URL } from "../config"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set( { products }),
    createProduct: async(newProduct) => {

        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success:false, message:"Please fill all details" }
        }
        newProduct.price = parseInt(newProduct.price, 10);
        const res = await fetch(`${BACKEND_URL}/api/v1/product`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })

        const data = await res.json()
        set((state) => ({ products: [...state.products, data.data] }))
        return { success:true, message:"Product created successfully" }
    },
    
    getProducts: async () => {
        const res = await fetch(`${BACKEND_URL}/api/v1/product`)
    const data = await res.json()
    set({ products: data.data })
},

deleteProduct: async(pid) => {
    const res = await fetch(`${BACKEND_URL}/api/v1/product/${pid}`,{
        method:"DELETE",
    })

    const data = await res.json()
    if(!data.success) return {success:false, message:data.message}
    set(state => ({ products: state.products.filter(product => product._id !== pid)}))
    return { success:true, message:data.message }
},

updateProduct: async(pid, updateProduct) => {
    updateProduct.price = parseInt(updateProduct.price, 10);
    const res = await fetch(`${BACKEND_URL}/api/v1/product/${pid}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateProduct)
    });

    const data = await res.json()
  
    if(!data.success) return { success: false, message: data.message}
  
    set((state) => ({
        products: state.products.map((product) =>
             product._id === pid ? data.data : product
    ),
    }))
    
    return { success: true, message: "Product updated successfully" };
}
}))