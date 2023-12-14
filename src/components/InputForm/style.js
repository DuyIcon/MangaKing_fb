import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-right: none;
    border-left: none;
    border-top: none;
    border-bottom-color: #e68a00;
    
    &:focus {
        background-color: #fff5e6;
    }
`