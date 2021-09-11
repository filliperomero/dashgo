import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps } from '@chakra-ui/react'

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps

const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput 
        id={name} 
        name={name} 
        focusBorderColor="pink.500" 
        bgColor="gray.900" 
        variant="filled" 
        _hover={{ bgColor: 'gray.900' }} 
        size="lg" {...rest} 
      />
    </FormControl>
  )
}

export default Input