import { Box } from '@chakra-ui/react'
import * as React from 'react'
import  ProductCard  from './ProductCard'

import  ProductGrid from './ProductGrid'
import axios from 'axios'

export default function App(){

  const [data, setData]= React.useState([])


  const getData = async()=>{
    let res = await axios.get("http://localhost:3000/api/products/category");
    setData(res.data.data)
    console.log(res.data.data)
}
React.useEffect(()=>{
    getData()
},[])
return(



  <Box
    maxW="7xl"
    mx="auto"
    px={{
      base: '4',
      md: '8',
      lg: '12',
    }}
    py={{
      base: '6',
      md: '8',
      lg: '12',
    }}
  >
    <ProductGrid>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  </Box>
  )
  }
