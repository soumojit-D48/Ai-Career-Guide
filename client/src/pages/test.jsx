

// import { useUser, useAuth } from '@clerk/clerk-react';

// export default function TestMyComponent() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
  
//   const showCredentials = async () => {
//     const clerkId = user?.id;
//     // const clerkId = "user_35D1kknX8O24N3rNAHkWwWoRLdG"
//     const token = await getToken();
    
//     console.log("Clerk ID:", clerkId);
//     console.log("Token:", token);
//     console.log("dbfcbfbdsfkj")
//   };
  
//   return (
//     <button onClick={showCredentials}>
//       Show Credentials
//     </button>
//   );
// }










// import { useUser, useAuth } from '@clerk/clerk-react';

// export default function TestMyComponent() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
  
//   const showCredentials = async () => {
//     if (!user) return console.log("User not loaded yet");
    
//     const clerkId = user.id;
//     const token = await getToken();
    
//     console.log("Clerk ID:", clerkId);
//     console.log("Token:", token);
//   };
  
//   return (
//     <button onClick={showCredentials}>
//       Show Credentials
//     </button>
//   );
// }






import { useUser, useAuth } from "@clerk/clerk-react";

export default function TestMyComponent() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const showCredentials = async () => {
    if (!isLoaded) return console.log("User not loaded yet");
    if (!user) return console.log("No user signed in");

    const clerkId = user.id;
    const token = await getToken();

    console.log("Clerk ID:", clerkId);
    console.log("Token:", token);
  };

  return <button onClick={showCredentials}>Show Credentials</button>;
}
