import React from 'react';
import styled from 'styled-components';
import { Formik,Form,Field, ErrorMessage } from 'formik';
import { Persist } from 'formik-persist';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { useStores } from '../../../hooks/useStores';
import history from '../../../utils/history';
import { toJS } from 'mobx';

// import { toJS } from 'mobx';

const FormWrapper = styled.div`
    width: 50rem;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 3rem 5rem;
`;
const FormGroup = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    &:not(:last-child){
        margin-bottom : 1.5rem;
    }
`;
const StyledLabel = styled.label`
    flex: 0 0 20%;
`;

const StyledInput = styled.input`
    border: none;
    padding: .5rem;
    border: 1px solid #ddd;
    flex: 0 0 80%;
`;

const H3 = styled.h3`
    font-size: 2.5rem;
    text-align: center;
`;

const StyledButton = styled.button`
    display: block;
    border: none;
    padding: .5rem 1rem;
    border: 1px solid #333;
    margin: 0 auto;
`;


const AdminLogin = observer(() => {
        const { userStore } = useStores();
        React.useEffect(() => {
            userStore.checkAdmin();
            // console.log(toJS(userStore.jwToken));
            if(userStore.jwToken) {
                history.push('/dashboard');
            } else {
                history.push('/adminlogin');
            }
        },[]);
        return (
            <FormWrapper>
                <H3>Login Admin</H3>
                <Formik
                initialValues={{ email: '', password : '' }}
                validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password : Yup.string()
                            .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    // console.log(values);
                    userStore.login(values);
                    setSubmitting(false);
                }}
            >
            <Form>
                <FormGroup>
                    <StyledLabel htmlFor="email">Email </StyledLabel>
                    <Field name="email" as={StyledInput} type="email" />
                </FormGroup>
                <FormGroup>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <Field name="password" as={StyledInput} type="password" />
                </FormGroup>
                <StyledButton type="submit">Submit</StyledButton>
                <Persist name="signup-form" />
            </Form>
            </Formik>
            </FormWrapper>
        );
});

export default AdminLogin;
