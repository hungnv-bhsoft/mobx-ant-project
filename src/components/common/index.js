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

//--------------------DashBoard-----------------
//appbar
export const Appbar = styled.header`
    width: 100%;
    display: ${ ({ display }) => display ? display : null };
    justify-content: ${ ({ justify }) => justify ? justify : null };
    align-items: ${ ({ align }) => align ? align : null };
    flex-direction: ${ ({ flexDirection }) => flexDirection ? flexDirection : null };
    padding: ${ ({ padding }) => padding ? padding : null };
    margin: ${ ({ margin }) => margin ? margin : null };
    background-color : ${ ({ bgColor }) => bgColor ? bgColor : null };
    border: 1px solid #ddd;
`;
//wrapper admin
export const DashboardWrapper = styled.div`
    background-color: #fff;
`;
//button
export const ButtonDefault = styled.button`
    display: block;
    padding: ${ ({ padding }) => padding ? padding : '1rem' };
    margin: ${ ({ margin }) => margin ? margin :  '1rem' };
    border: 0;
    &:hover {
        color: red;
    }
`;

export const ButtonPrimary = styled(ButtonDefault)`
    background-color: ${ ({ theme }) => theme.colors.primary ? theme.colors.primary : null };
    &:hover {
        color: #fff;
    }
`;

export const MainWrapper = styled.main`
    max-width: 100%;
    display: ${ ({ display }) => display ? display : null };
    justify-content: ${ ({ justify }) => justify ? justify : null };
    align-items: ${ ({ align }) => align ? align : null };
    flex-direction: ${ ({ flexDirection }) => flexDirection ? flexDirection : null };
    padding: ${ ({ padding }) => padding ? padding : null };
    margin: ${ ({ margin }) => margin ? margin : null };
    background-color : ${ ({ bgColor }) => bgColor ? bgColor : null };
`;

export const AsideWrapper = styled.aside`
    width: ${ ({ width }) => width ? width : null };
    height: ${ ({ height }) => height ? height : null };
    display: ${ ({ display }) => display ? display : null };
    flex-direction: ${ ({ flexDirection }) => flexDirection ? flexDirection : null };
    justify-content: ${ ({ justify }) => justify ? justify : null };
    align-items: ${ ({ align }) => align ? align : null };
    padding: ${ ({ padding }) => padding ? padding : null };
    margin: ${ ({ margin }) => margin ? margin : null };
    background-color : ${ ({ bgColor }) => bgColor ? bgColor : null };
    position:  ${ ({ postion }) => postion ? postion : null };
    overflow-x: ${ ({ overflowX }) => overflowX ? overflowX : null };
    top: 0;
    z-index: 100;
`;

export const SectionWrapper = styled.section`
    width: ${ ({ width }) => width ? width : null };
    height: ${ ({ height }) => height ? height : null };
    display: ${ ({ display }) => display ? display : null };
    justify-content: ${ ({ justify }) => justify ? justify : null };
    flex-direction: ${ ({ flexDirection }) => flexDirection ? flexDirection : null };
    align-items: ${ ({ align }) => align ? align : null };
    padding: ${ ({ padding }) => padding ? padding : null };
    margin: ${ ({ margin }) => margin ? margin : null };
    background-color : ${ ({ bgColor }) => bgColor ? bgColor : null };
`;