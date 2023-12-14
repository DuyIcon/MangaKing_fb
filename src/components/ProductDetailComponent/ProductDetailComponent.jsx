import { Col, Image, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
// import cv1 from '../../assets/images/cv1.jpg'
import cv2 from '../../assets/images/cv2.webp'
import cv3 from '../../assets/images/cv3.webp'
import cv4 from '../../assets/images/cv4.webp'
import cv5 from '../../assets/images/cv5.webp'
import cv6 from '../../assets/images/cv6.webp'
import cv7 from '../../assets/images/cv7.webp'
import { StylePriceProduct, StyleSalePercentProduct, StyleSalePriceProduct, StyleSpan1, StyleSpan2, StyleTextDes, WrapperAddress, WrapperBtnQualityProduct, WrapperDeppRow, WrapperHeadingInfo, WrapperImageSmall, WrapperInfo, WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperRow, WrapperSalePercentProduct, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperTextDes, Divider } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from 'react-query'
import Loading from '../LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/sildes/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import * as message from '../Message/Message'
import { useMemo } from 'react'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'

const ProductDetailComponent = ({idProduct}) => {
  const[numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorLimitOrder,setErrorLimitOrder] = useState(false)
  const order = useSelector((state) => state.order)


  const onChange = (value) => {
    setNumProduct(Number(value))
  }


  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id) {
        const res = await ProductService.getDetailsProduct(id)
        return res.data
    }
  }

  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
    if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
        setErrorLimitOrder(false)
    } else if(productDetails?.countInStock === 0){
        setErrorLimitOrder(true)
    }
},[numProduct])

useEffect(() => {
    if(order.isSucessOrder) {
        message.success('Đã thêm vào giỏ hàng')
    }
    return () => {
        dispatch(resetOrder())
    }
}, [order.isSucessOrder])

useEffect(() => {
    initFacebookSDK()
}, [])


  const handleChangeCount = (type, limited) => {
    if(type === 'increase') {
        if(!limited) {
            setNumProduct(numProduct + 1)
        }
    }else {
        if(!limited) {
            setNumProduct(numProduct - 1)
        }
    }
}

    const {isLoading, data: productDetails } = useQuery(['products-details', idProduct], fetchGetDetailsProduct, { enabled : !!idProduct})
    const handleAddOderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        } else {
            // {
            //     name: {type: String, required: true},
            //     amount: {type: Number, required: true},
            //     image: {type: String, required: true},
            //     price: {type: Number, required: true},
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            //     },
            // },
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            console.log('checkcheck', orderRedux, numProduct)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }



  return (
    <Loading isLoading={isLoading}>
      <Row style={{padding:'16px', backgroundColor:'#fff', borderRadius:'10px'}}>
            <Col span={10} style={{border:'1px solid #ccc', paddingRight:'10px'}}>
                  <Image src={productDetails?.image} alt='product image' preview={false} />

                  <Row style={{paddingTop:'10px', justifyContent:'space-between'}}>
                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv2} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv3} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv4} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv5} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv6} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>

                    <WrapperStyleColImage span={4}>
                      <WrapperImageSmall src={cv7} alt='product small image' preview={false}/>
                    </WrapperStyleColImage>
                  </Row>
            </Col>
            <Col span={14} style={{paddingLeft:'30px'}}>
                <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
                    <WrapperStyleTextSell style={{marginLeft:'5px'}}> | {numProduct}+</WrapperStyleTextSell>
                </div>

                <WrapperPriceProduct>
                    {/* <StyleSalePriceProduct>
                        <s>220,000 VND</s>
                    </StyleSalePriceProduct> */}

                    <StylePriceProduct>
                        {convertPrice(productDetails?.price)}
                    </StylePriceProduct>

                    <div style={{height: '50px', display: 'flex ', alignItems:'center'}}>
                        <StyleSalePercentProduct>-{productDetails?.discount}%</StyleSalePercentProduct>
                    </div>
                  </WrapperPriceProduct>

                  <WrapperAddress>
                    <span style={{color: '#000', fontFamily:'Oswald'}}>Deliver to</span>
                    <span className='address'>{user?.address}</span>
                    <span className='change-address'> - Change the location</span>
                  </WrapperAddress>

                  <LikeButtonComponent 
                  dataHref={ process.env.REACT_APP_IS_LOCAL 
                            ? "https://developers.facebook.com/docs/plugins/" 
                            : window.location.href
                            } 
                  />

                  <div style={{margin:'50px 0', borderBottom:'1px solid #ccc',borderTop:'1px solid #ccc',padding:'10px 0'}}>
                      <div style={{marginBottom:'10px', fontFamily:'Oswald'}}>Quantity</div>
                      <WrapperQualityProduct>
                          <button style={{border: 'none', background: 'transparent', cursor:'pointer'}}>
                              <MinusOutlined style={{color:'#000', fontSize:'16px'}} onClick={() => handleChangeCount('decrease')}/>
                          </button>

                          <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />

                          <button style={{border: 'none', background: 'transparent'}}>
                              <PlusOutlined style={{color:'#000', fontSize:'16  px'}} onClick={() => handleChangeCount('increase')}/>
                          </button>
                      </WrapperQualityProduct>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'20px', justifyContent:'center', marginTop:'90px'}}>
                    <div>
                      <ButtonComponent
                          size={40}

                          styleButton={{border: 'none',
                              backgroundColor: '#e68a00',
                              width: '250px',
                              height: '55px',
                              borderRadius: '10px',

                          }}
                          onClick={handleAddOderProduct}
                          textButton="Buy"
                          styleTextButton={{color: 'rgb(36,36,36)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                      >

                      </ButtonComponent>

                          
                          {order?.isErrorOrder && <span style={{color: 'red'}}>San pham da het hang</span>}
                          </div>
                      <ButtonComponent
                          size={40}

                          styleButton={{
                              border: '2px solid #e68a00',
                              backgroundColor: '#efefef',
                              width: '250px',
                              height: '55px',
                              borderRadius: '10px',

                          }}
                          textButton="Add to cart"
                          styleTextButton={{color: '#e68a00', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                      >

                      </ButtonComponent>
                  </div>
            </Col>
            <CommentComponent dataHref= {process.env.REACT_APP_IS_LOCAL 
            ? "https://developers.facebook.com/docs/plugins/comments#configurator"
            : window.location.href } width="1000" />
        </Row>

        <Row style={{padding:'16px', backgroundColor:'#fff', borderRadius:'10px', marginTop:'20px', flexWrap:'nowrap'}}>
            <Col span={10}>
                <WrapperInfo>
                  <WrapperHeadingInfo>
                      <h4 style={{margin:'0px'}}>Details</h4>
                  </WrapperHeadingInfo>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Category</StyleSpan1>
                              <StyleSpan2>
                                  Action, Adventure , Comedy, Drama,..
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Author</StyleSpan1>
                              <StyleSpan2>
                                  Oda Eiichiro
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Publisher</StyleSpan1>
                              <StyleSpan2>
                                  Weekly Shonen Jump
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Publication date</StyleSpan1>
                              <StyleSpan2>
                                  2023-10-23 00:00:00
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Size</StyleSpan1>
                              <StyleSpan2>
                                  11,3x17,6cm
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>

                  <div style={{display:'flex', flexDirection:'column'}}>
                      <WrapperRow>
                          <WrapperDeppRow>
                              <StyleSpan1>Number of pages</StyleSpan1>
                              <StyleSpan2>
                                  208
                              </StyleSpan2>
                          </WrapperDeppRow>
                      </WrapperRow>
                  </div>


                </WrapperInfo>
            </Col>


              <Divider/>



            <Col span={14}>
                <WrapperInfo >
                    <WrapperHeadingInfo>Description</WrapperHeadingInfo>

                  <WrapperTextDes>
                      <StyleTextDes>
                        "One Piece" is an iconic Japanese manga series created by Eiichiro Oda.
                        The story revolves around the exciting adventures of Monkey D. Luffy,
                        a young and ambitious pirate with a unique ability gained from consuming the Gum-Gum Fruit.
                        Luffy's ultimate goal is to become the Pirate King by finding the legendary treasure known as One Piece.
                         To achieve this dream, he embarks on an epic journey across the Grand Line,
                         assembling a diverse and loyal crew known as the Straw Hat Pirates.
                         This manga is renowned for its perfect blend of humor, intense action,
                         and profound themes of friendship and unwavering determination.
                         It has garnered a massive global fanbase and holds the record for being one
                         of the longest-running and most beloved manga series worldwide.
                      </StyleTextDes>
                     <StyleTextDes>
                      The world of "One Piece" is a vibrant and intriguing universe,
                      filled with mystical islands, mythical creatures, and powerful foes.
                      Luffy and his crew navigate treacherous waters, encountering other pirates,
                      marines, and revolutionaries along the way. As they sail through uncharted territories,
                      they strive to leave their mark in history while uncovering the mysteries of the Void Century,
                      the world's true history, and the enigmatic abilities of the Devil Fruits.
                      "One Piece" is a captivating tale that has resonated with readers of all ages,
                      capturing the essence of adventure and the pursuit of one's dreams.
                      It's a testament to the power of storytelling and the enduring appeal
                      of well-crafted characters and their remarkable journeys.
                      </StyleTextDes>
                    </WrapperTextDes>
                </WrapperInfo>
            </Col>
        </Row>
    </Loading>

  )
}

export default ProductDetailComponent
