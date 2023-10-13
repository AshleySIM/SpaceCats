import React, { useState } from 'react';


const SignUp = ({ createUser }) =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const save = async(ev) => {
        ev.preventDefault();
        const user = ({
            username,
             password
             
        })
        try{
        await createUser( user )}
        
            
            catch(ex){
                console.log(user)
                console.log(ex)
            }
        }
    
    return (

        <form onSubmit={save}>
            <input 
            placeholder=" Create Username"
            value ={username}
            onChange= {ev => setUsername(ev.target.value)}
            />
             <input
             placeholder='Create Password'
             value = {password}
             onChange= { ev => setPassword(ev.target.value)}
             />
            <button disabled={!username || !password}> Create Account </button>
        </form>
    )
}




export default SignUp;