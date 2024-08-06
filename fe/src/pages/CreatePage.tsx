import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"
import { Text } from "@chakra-ui/react";

export const CreatePage = () => {
    const [newProduct,setNewProduct] = useState({
        name:"", price:"", image:""
    })

    const [error,setError] = useState("")
    const [msg,setMsg] = useState|("")
    const {createProduct} = useProductStore()

    const handleAddProduct = async (e:any) => {
        const {success,message} = await createProduct(newProduct)

        if(!success) {
            setError(message)
            setMsg("")
        } else {
            setMsg(message)
            setError("")
        }
        
        setNewProduct ({
            name:"",price:"",image:""
        })
    }

    return <Container maxW={"Container.sm"}>
    <VStack 
    spacing={12}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
            Create New Product
        </Heading>
       {
        error && (
            <>
            <Text color="red.500" textAlign="center" bg={"slate.600"} p={2} rounded={"md"} shadow={"md"}>
                    {error}
                </Text>
            </>
        )}
        {
            msg && (
                <Text color="green.500" textAlign="center" bg={"slate.600"} p={2} rounded={"md"} shadow={"md"}>
                {msg}
            </Text>
            )
        }

        <Box w={"full"} bg={useColorModeValue("White","gray.800")} p={6} rounded={"lg"} shadow={"md"} >
            <VStack spacing={6}>
                <Input 
                    placeholder="Product Name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
                />

                 <Input 
                    placeholder="Product price"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
                />
                 <Input 
                    placeholder="Product image"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
                />
                
                <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
                    Add Product
                </Button>
            </VStack>
        </Box>

    </VStack>

</Container>
    
}