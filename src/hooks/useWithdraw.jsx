import { useState } from "react";

export const UseWithdrawal = () => {
    const [loading, setLoading] = useState(false)

    const initiateTransfer = async (code, accountNumber, amount) => {
        try {
            setLoading(true)
            const payload = {
                account_bank: code,  // Replace with the actual account bank code
                account_number: accountNumber,  // Replace with the actual account_number
                amount: amount,  // Replace with the actual amount
            };

            const response = await fetch('https://maketrfrequestapi.netlify.app/.netlify/functions/api/', {
                method: 'POST',  // This is a post request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),  // Include the payload in the request body
            });

            if (!response.ok) {

                // give error response here
                console.log(response)
            }

            const data = await response.json();
            console.log(data);
            console.log('the status:', data.data.data.status)

            if (data.data.data.status === "NEW") {
                //perform neccessary logic here like subtracting amount withdrawn from user current balance
            } else {
                // give error response here
                alert('Failed to initiate transfer. Please try again later')
                setLoading(false)

            }
        } catch (error) {
            // give error response here
            console.error('Error initiating transfer:', error);
            setLoading(false)
        }
    };


    return { initiateTransfer, loading }

}