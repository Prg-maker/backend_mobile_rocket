interface email_ValidateProps{
  email: string 
}

export function emailVerification(email:string){
  let re = /\S+@\S+\.\S+/;
  
  return re.test(email)
}