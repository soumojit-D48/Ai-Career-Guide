

// // middleware/authMiddleware.js
// import { clerkClient } from "@clerk/clerk-sdk-node";

// // RECOMMENDED: Simple middleware using Clerk's built-in token verification
// // export const requireAuth = async (req, res, next) => {
// //   try {
// //     // Clerk automatically adds session token to Authorization header from frontend
// //     const sessionToken = req.headers.authorization?.replace("Bearer ", "");

// //     if (!sessionToken) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "No authentication token provided"
// //       });
// //     }

// //     // Verify the session token with Clerk
// //     const { userId } = await clerkClient.verifyToken(sessionToken, {
// //       secretKey: process.env.CLERK_SECRET_KEY
// //     });

// //     if (!userId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Invalid token"
// //       });
// //     }

// //     // Attach userId to request for use in controllers
// //     req.auth = { userId };

// //     next();
// //   } catch (error) {
// //     console.error("Auth middleware error:", error);
// //     return res.status(401).json({
// //       success: false,
// //       message: "Authentication failed",
// //       error: error.message
// //     });
// //   }
// // };


// // middleware/authMiddleware.js

// export const requireAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "");
    
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Verify token and get userId
//     const { userId } = await clerkClient.verifyToken(token);
    
//     req.auth = { userId }; // Attach to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Middleware to verify Clerk webhook signatures
// export const verifyClerkWebhook = (req, res, next) => {
//   try {
//     const svixId = req.headers["svix-id"];
//     const svixTimestamp = req.headers["svix-timestamp"];
//     const svixSignature = req.headers["svix-signature"];

//     if (!svixId || !svixTimestamp || !svixSignature) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing webhook headers"
//       });
//     }

//     // You should verify the signature using Svix or Clerk's webhook verification
//     // For production, implement proper signature verification
//     // Example with Svix:
//     /*
//     import { Webhook } from "svix";
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const payload = wh.verify(JSON.stringify(req.body), {
//       "svix-id": svixId,
//       "svix-timestamp": svixTimestamp,
//       "svix-signature": svixSignature,
//     });
//     req.body = payload;
//     */

//     next();
//   } catch (error) {
//     console.error("Webhook verification error:", error);
//     return res.status(400).json({
//       success: false,
//       message: "Webhook verification failed"
//     });
//   }
// };







import { clerkClient } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import {requireAuth as clerkRequireAuth} from "@clerk/express"

// ✅ Fixed requireAuth middleware

// export const requireAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ 
//         success: false,
//         message: "No authentication token provided" 
//       });
//     }

//     const token = authHeader.replace("Bearer ", "");

//     // ✅ Use Clerk's sessions API to verify
//     const { data: sessions } = await clerkClient.sessions.getSessionList();
    
//     // Alternative: Get user from token
//     const decoded = await clerkClient.verifyToken(token, {
//       jwtKey: process.env.CLERK_SECRET_KEY
//     });

//     if (!decoded || !decoded.sub) {
//       return res.status(401).json({ 
//         success: false,
//         message: "Invalid token" 
//       });
//     }

//     // Attach userId to request (sub contains the user ID)
//     req.auth = { userId: decoded.sub };
    
//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     return res.status(401).json({ 
//       success: false,
//       message: "Authentication failed",
//       error: error.message 
//     });
//   }
// };



// ✅ Use Clerk's built-in requireAuth
export const requireAuth = clerkRequireAuth();


// ✅ Properly verify webhook signatures
export const verifyClerkWebhook = (req, res, next) => {
  try {
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({
        success: false,
        message: "Missing webhook headers"
      });
    }

    // ✅ Actually verify the webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    try {
      const payload = wh.verify(JSON.stringify(req.body), {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
      
      // Replace body with verified payload
      req.body = payload;
      next();
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature"
      });
    }

  } catch (error) {
    console.error("Webhook verification error:", error);
    return res.status(400).json({
      success: false,
      message: "Webhook verification failed"
    });
  }
};