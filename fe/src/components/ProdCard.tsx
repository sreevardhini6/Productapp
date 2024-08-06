import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useState } from "react"

export const ProdCard = ({prod}) => {
    const [updateProd, setUpdateProd] = useState({ name: prod.name, price: prod.price, image: prod.image });

const {deleteProduct , updateProduct} = useProductStore()
    const handleDeleteProduct = async(pid) => {
        const {success,message} = await deleteProduct(pid)

    }
const { isOpen, onOpen, onClose } = useDisclosure()
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white","gray.200")
  
   const handleUpdateProduct = async (pid) => {
        const updatedProduct = {
            name: updateProd.name,
            price: updateProd.price,
            image: updateProd.image,
          };
        console.log("Updating product with data:", updatedProduct);
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (success) {
          onClose();
        } else {
          console.error("Update failed:", message);
        }
    }
  
  
    return <Box
    shadow="lg"
    rounded="lg"
    overflow='hidden'
    transition='all 0.3s'
    _hover=  {{ transform: 'translateY(-5px)', shadow: 'xl' }}  
    >   
    <Image src={prod.image}  alt={prod.name} h={48} w="full" objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {prod.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                {prod.price}
            </Text>
            <HStack spacing={2}>
                        <IconButton 
                        icon={<EditIcon />}
                        onClick={onOpen}
                        colorScheme="blue" />
                        <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(prod._id)} colorScheme="red"/>
            </HStack>
                    </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Update Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                    <VStack spacing={4}>
                                               <Input placeholder="Product Name" name="name" value={updateProd.name}
                                               onChange={(e) => setUpdateProd({...updateProd, name:e.target.value })}
                                               /> 
                                               <Input placeholder="Product price" name="price" type="number" value={updateProd.price}
                                                 onChange={(e) => setUpdateProd({...updateProd, price:e.target.value })}/> 
                                               <Input placeholder="Product image" name="image" value={updateProd.image}
                                                 onChange={(e) => setUpdateProd({...updateProd, image:e.target.value })} /> 
                                    </VStack>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} 
                                    onClick={() => handleUpdateProduct(prod._id)}
                                >
                                    Update
                                </Button>
                                <Button variant='ghost' onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
            </Modal>

  </Box>
}