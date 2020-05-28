import styled from 'styled-components';

//flex custom
export const BoxWrapper = styled.div`
    display : flex;
    width: 100%;
    padding: ${ ({ padding }) => padding ? padding : null};
    margin: ${ ({ margin }) => margin ? margin : null };
    justify-content : ${ ({ justifyContent }) =>
    justifyContent ? justifyContent : null};
    align-items : ${ ({ alignItems }) => alignItems ? alignItems : null };
`;

export const BoxItem = styled.div`
    flex : ${ ({ flex }) => flex ? flex : null };
`;


//container wrapper
export const ContainerWrapper = styled.div`
    max-width: 113rem;
    margin: 0 auto;
    padding: 0 1.5rem;
`;

//Heading
export const Heading = styled.h1`
    text-align: center;
    margin-top: 2rem;
`;
