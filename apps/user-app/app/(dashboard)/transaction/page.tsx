import { WelcomeMsgComponent } from "@components/layout/welcome-message"; 
import { AllTransactionsComponent } from "@components/layout/all-transactions";


const TransactionPage = () => {

    return (
        <>
            <div className="bg-white w-full max-w-screen-2xl mx-auto relative">
                    <WelcomeMsgComponent />
                    <AllTransactionsComponent />
            </div>
            
        </>
        
    )
}
export default TransactionPage;