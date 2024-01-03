import { useState } from 'react'
import './styleSheet/App.css'
import { banks } from './bankData'
import { UseWithdrawal } from './hooks/useWithdraw'

function App() {
  const [selectedBank, setSelectedBank] = useState('')
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const { initiateTransfer, loading } = UseWithdrawal()  // withdrawal hook


  const handleWithdrawal = async () => {
    // handle allneccessary checks before initiating transfer
    if (!amount) {

      return
    }
    if (!accountNumber) {

      return
    }
    if (!selectedBank) {

      return
    }

    //if all the checks pass, initiate transfer 

    const bankCode = selectedBank.split('-')[1]
    //we use the js split method to get the bank code because that's what the the backend is expecting.
    //note that displaying the bank name was just to provide a simple ui for the user

    await initiateTransfer(bankCode, accountNumber, amount)
  }
  return (
    <div className='main-page'>

      <br />
      <h5>WITHDRAW</h5>
      <input
        value={amount}
        type="number"
        className="form-control my-2"
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount..'
      />

      <input
        value={accountNumber}
        type="number"
        className="form-control my-2"
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder='Account number..'
      />
      <select
        value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        className='form-select my-2'
      >
        <option value="" disabled>select bank</option>
        {
          banks.map((bank, index) => (
            <option
              value={bank.name + "-" + bank.code}
              key={index}
            >
              {bank.name}
            </option>
          ))
        }
      </select>
      <button
        className="btn btn-outline-success mt-3"
        onClick={handleWithdrawal}
      >
        WITHDRAW
      </button>
    </div>
  )
}

export default App
