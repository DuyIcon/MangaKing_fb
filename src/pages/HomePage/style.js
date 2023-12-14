import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    justify-content: flex-start;
    height: 50px;
    cursor: pointer;
`

export const TextRecommend = styled.p`
    font-family: 'Pixelify Sans', sans-serif; 
    font-size: 28px;
    font-weight: 600;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        background-color: #e68a00;
        color: #000;
        span {
            color:#000;
        }
    }
    
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
    
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap
`