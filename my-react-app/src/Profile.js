import React, { useState, useEffect } from 'react';
import Login from './Login';

function Profile({user}) {
    const [userDetail, setUserDetail] = useState(user);
    const [accountno, setAccountno] = useState('');
    const [accountholdername, setAccountHolder] = useState('');
    
    const [beneficiary, setBenifiecery] = useState(false);
    const [showTransactionHistoryList, setshowTransactionHistoryList] = useState(false);
    const [showBeneficiary, setshowBeneficiary] = useState(false);
    const [profile, setProfile] = useState(true);
    const [transactionHistry, setTransactionHistry] = useState(true);
    const [beneficiaryList, setBenifieceryList] = useState([]);
    const [transactionHistryList, setTransactionHistryList] = useState([]);
    const [transferMoneyUi, setTransferMoneyUi] = useState(false);
    const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const manageBenifiecery =()=>{
        setBenifiecery(true);
        setTransferMoneyUi(false)
        setTransactionHistry(false);
        setProfile(false);
        setshowBeneficiary(false);
        setshowTransactionHistoryList(false)
    }
    const fetchBenificieryList= async ()=>{
        const response = await fetch(`http://localhost:3001/beneficiary?beneficiaryFor=${user.id}`);
        const beneficiaryList = await response.json();
        return beneficiaryList;
    }
    const addBenificiery = async (e)=>{
        e.preventDefault();
        if(!accountno){
            alert("add account no.")
            return false;
        }
        const beneficiaryListUser = await fetchBenificieryList();
        const response = await fetch('http://localhost:3001/beneficiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:`${user['id']}-${beneficiaryListUser.length}`, accountno, accountholdername, beneficiaryFor:user['id']}),
      });
        /*setBenifieceryList(previous=>{
            return[...previous, {accountno, accountholdername}]
            
        })*/
        setAccountno('');
        setAccountHolder('');
    }
    const showBeneficiaryList = async()=>{
        setBenifiecery(false);
        setTransferMoneyUi(false)
        setTransactionHistry(false);
        setProfile(false);
        const beneficiaryListUser = await fetchBenificieryList();
        setBenifieceryList(beneficiaryListUser);
        setshowBeneficiary(true);
        setshowTransactionHistoryList(false)
    }
    const showTransactionHistory= async () => {
        setBenifiecery(false);
        setTransferMoneyUi(false)
        setTransactionHistry(false);
        setProfile(false);
        setshowBeneficiary(false);
        setshowTransactionHistoryList(true)
        try {
          const response = await fetch(`http://localhost:3001/transactionHistry?transferer_id=${user.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const response2 = await fetch(`http://localhost:3001/transactionHistry?tranferee_account_no=${user.accountno}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          const jsonData2 = await response2.json();
          const mergeJson = [...jsonData, ...jsonData2];
          setTransactionHistryList(mergeJson);
        } catch (error) {
        } finally {
        }
      };
      const transferMoney = () =>{
        setBenifiecery(false);
        setTransactionHistry(false);
        setProfile(false);
        setshowBeneficiary(false);
        setshowTransactionHistoryList(false);
        setTransferMoneyUi(true)
        setshowTransactionHistoryList(false)

      }
      const selectBenificiery= (e)=>{
        setBeneficiaryAccount(e.target.value)
      }

      const sendMoney = async()=>{
        const datetime = new Date().toLocaleString();
        if(amount<=0){
            alert("Please enter valid Amount");
        }
        if(!beneficiaryAccount){
            alert("Please select Account");
        }
        const response = await fetch('http://localhost:3001/transactionHistry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:`${user['id']}-${datetime}`, tranferee_account_no:beneficiaryAccount,transferer_account:user['accountno'], transferer_id:user['id'],amount:amount}),
          });
          const userData = await fetch(`http://localhost:3001/users/${user['id']}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...user, balance:userDetail.balance-amount}),
          }); 
          const tranfereeAccountDetailResponse = await fetch(`http://localhost:3001/users?accountno=${beneficiaryAccount}`);         
          const tranfereeAccountDetail = await tranfereeAccountDetailResponse.json();
          if(tranfereeAccountDetail.length>0){
            const tranfereeDetail = tranfereeAccountDetail[0]
            await fetch(`http://localhost:3001/users/${tranfereeDetail['id']}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({...tranfereeDetail, balance:parseInt(tranfereeDetail.balance)+parseInt(amount)}),
            });
        }
          const responseUserDetail = await fetch(`http://localhost:3001/users/${user['id']}`);
          const userDetailRes = await responseUserDetail.json();
          setUserDetail(userDetailRes);
          setAmount('')
      }
    return (
        <div className="app">
      <div className="sidebar open">
        <ul>
          <li>Profile</li>
          <li onClick={showTransactionHistory}>Transaction History</li>
          <li onClick={manageBenifiecery}>Add Beneficiary</li>
          <li onClick={showBeneficiaryList}>Beneficiary List</li>
          <li onClick={transferMoney}> Transfer Money</li>
        </ul>
      </div>
      
        <div>
            
            <h2>Account Number {user.accountno}</h2>
            <p>Bank Balance: ${userDetail.balance}</p>
        
        </div>
        <br/><br/><br/><br/>
        {beneficiary?<div>
            Account :<input type="text" value={accountno} name="accountno" onChange={(e)=>setAccountno(e.target.value)}/>
            <br/><br/>
            Account Holder Name<input type="name" name="accountholdername" value={accountholdername} onChange={(e)=>setAccountHolder(e.target.value)}/>
            <br/><br/>
            <input type="button" value="Add" onClick={(e)=>addBenificiery(e)}/>


        </div>:''}
        {showBeneficiary?<table border={1}>
            <tr>
                    <th>Account</th>
                    <th>Account holder name</th>
                </tr>
            {
            beneficiaryList.map((item)=>{
                return (
                <tr>
                    <td>{item.accountno}</td>
                    <td>{item.accountholdername}</td>
                </tr>)
            })
            }
        </table>:''}
        
        {showTransactionHistoryList?<table border={1}>
            <tr>
                 <th>Account No</th>
                 <th>Amount</th>
                 <th>Transaction Type</th>
             </tr>            
            
            {transactionHistryList.map((item)=>{
                return (
                <tr>
                    <td>{item.tranferee_account_no}-{item.transferer_account}</td>
                    <td>{item.amount}</td>
                    <td>{user.id==item.transferer_id?'DEBIT':'CREDIT'}</td>
                </tr>)
            })
            }            
        </table>:''
        }
        {
            transferMoneyUi?<div>
                Select Beneficiary :<select onChange={selectBenificiery}>
                 <option value=""> Select Beneficiary</option>   
                {beneficiaryList.map(beneficiary=><option value={beneficiary.accountno}>{beneficiary.accountno}-{beneficiary.accountholdername}</option>)
                }
                </select>
                <br/>
                Amount: <input type="text" value={amount} name="amount" onChange={(e)=>setAmount(e.target.value)}/>
                <br/>
                <br/>
                <input type='button' value="Send" onClick={sendMoney}/>
                </div>:''
        }
    </div>
    );
}

export default Profile;
