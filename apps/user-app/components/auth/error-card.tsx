import { CardWrapper } from "@components/auth/card-wrapper";

  export const ErrorCard = () => {
    return(
        <CardWrapper 
        headerLabel="Verify Your email" 
        backButtonHrf="/auth/signin" 
        backButtonLabel="Back to signin">
        </CardWrapper>
    )
  }