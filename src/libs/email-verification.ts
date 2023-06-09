interface email_ValidateProps{
  email: string 
}

export function emailVerification({email}:email_ValidateProps){
  let re = /\S+@\S+\.\S+/;
  
  return re.test(email)
}