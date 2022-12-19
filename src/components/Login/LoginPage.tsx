import React from "react";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { LoginFormikForm } from "./LoginFormikForm";

const StyledForm = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;
export const LoginPage: React.FC = () => {
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
   const userId = useSelector((state: AppStateType) => state.auth.userId)
   if (isAuth) {
      return <Navigate to={`/profile/${userId}`} />
   }
   return (
      <StyledForm>
         <LoginFormikForm />
      </StyledForm>
   )
}