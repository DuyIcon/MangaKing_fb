import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { TextRecommend, WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import bn1 from '../../assets/images/bn1.jpg'
import bn2 from '../../assets/images/bn2.jpg'
import bn3 from '../../assets/images/bn3.jpg'

import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
// import { getAllProduct } from '../../services/ProductService'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [typeProducts, setTypeProducts] = useState([])


  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const {isLoading, data: products, isPreviousData} = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  // const navigate = useNavigate();


  //   const handleCardClick = () => {
  //       navigate('/:type');
  //   };
  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{width:'1270px', margin:'0 auto'}}>
          <WrapperTypeProduct>
            {typeProducts.map((item) => {
              return (
                <TypeProduct name={item} key={item}/>
              )
            })}
          </WrapperTypeProduct>
      </div>

      <div>
          < SliderComponent arrImages={[bn1, bn2, bn3]}/>
      </div>

      <div id='body' style={{width:'100%', backgroundColor:'#efefef' }}>
          <div id='container' style={{height:'1300px', width:'1270px', margin:'0 auto'}}>

              <div style={{borderBottom: '1px solid #e68a00'}}>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <TextRecommend>Recommend Comics</TextRecommend>
              </div>

              <WrapperProducts>
                {products?.data?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    ></CardComponent>
                  )
                })}
                  {/* <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/>
                  <CardComponent/> */}
              </WrapperProducts>


              <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'15px'}}>
                  <WrapperButtonMore
                  textButton={isPreviousData ? 'Load more' : 'See more' } type='primary'
                      styleButton={{
                        border:'2px solid #e68a00',
                        width: '240px',
                        height: '40px',
                        borderRadius: '10px',
                        color: `${products?.total === products?.data?.length ? '#ccc' : '#e68a00' }`,
                        fontWeight: '600',
                        fontFamily:'Oswald',
                      }}
                      disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                      onClick={() => setLimit((prev) => prev + 5)}
                  />
                </div>
            </div>
        </div>
    </Loading>

  )
}

export default HomePage
