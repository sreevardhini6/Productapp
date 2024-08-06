import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { useEffect } from "react"
import { ProdCard } from "../components/ProdCard"

export const HomePage = () => {

    const {getProducts, products} = useProductStore()
    
    useEffect(() => {
        getProducts();
    }, [getProducts])
    console.log("products",products)
     
    return <Container maxW='container.xl' py={12}>
            <VStack spacing={8} >
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r,cyan.400, blue.500"}
                    textAlign={"center"}
                >

                    Current Products
                </Text>
                <SimpleGrid
                    columns={{
                        base:1,
                        md:2,
                        lg:3
                    }}
                    spacing={10}
                    w={"full"}
                >

                  {products.map((prod) => (
                        <ProdCard key={prod._id} prod={prod} />
                           
                  ))}
            
                </SimpleGrid>
                  {
                    products.length === 0 && (
                        
                <Text fontSize={"xl"} textAlign={"center"} fontWeight='bold' color='gray.500'>
                No products found
                
                <Link to={'/create'}>  
                                <Text as='span' color='blue.500' _hover={{ textDecoration:"underline" }}>
                                    Create a product
                                </Text>
                </Link>
        </Text>
                    )
                  }

            </VStack>
        </Container>
}