import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react'

type InputProps = {
  name: string;
  label?: string;
  error?: FieldError
} & ChakraInputProps

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput 
        id={name} 
        name={name} 
        focusBorderColor="pink.500" 
        bgColor="gray.900" 
        variant="filled" 
        _hover={{ bgColor: 'gray.900' }} 
        size="lg"
        ref={ref}
        {...rest} 
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export default forwardRef(Input)