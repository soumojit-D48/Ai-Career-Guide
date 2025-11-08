

// controllers/authController.js
import User from "../models/User.js";

// @desc    Sync user from Clerk webhook or login
// @route   POST /api/auth/sync
// @access  Public (called by Clerk webhook or frontend)


export const syncUser = async(req, res) => {
    try {
        const {clerkId, email, name, avatar} = req.body

        if (!clerkId || !email) {
            return res.status(400).json({ 
                success: false, 
                message: "ClerkId and email are required" 
            });
        }

         // Find or create user
    let user = await User.findOne({ clerkId });

    if (!user) {
      // Create new user with default stats
      user = await User.create({
        clerkId,
        email,
        name: name || email.split("@")[0],
        avatar: avatar || "",
        currentStage: 1,
        stats: {
          careerProgress: 0,
          skillsMastered: 0,
          goalsAchieved: 0,
          totalGoals: 0,
          learningHours: 0
        },
        roadmap: [],
        badges: [],
        quizAnswers: []
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          clerkId: user.clerkId,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currentStage: user.currentStage,
          stats: user.stats
        }
      });
    }

    // Update existing user info if changed
    let updated = false;
    if (name && user.name !== name) {
      user.name = name;
      updated = true;
    }
    if (avatar && user.avatar !== avatar) {
      user.avatar = avatar;
      updated = true;
    }

    if (updated) {
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "User synced successfully",
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        currentStage: user.currentStage,
        stats: user.stats
      }
    });

    } catch (e) {
        console.error("Sync user error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during user sync",
      error: error.message 
    });
    }
}



// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        currentStage: user.currentStage,
        detectedInterest: user.detectedInterest,
        chosenCareer: user.chosenCareer,
        stats: user.stats,
        badges: user.badges,
        roadmap: user.roadmap,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching user profile",
      error: error.message 
    });
  }
};


// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error updating profile",
      error: error.message 
    });
  }
};



// @desc    Delete user account
// @route   DELETE /api/auth/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });

  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error deleting account",
      error: error.message 
    });
  }
};


// @desc    Handle Clerk webhooks (user.created, user.updated, user.deleted)
// @route   POST /api/webhooks/clerk
// @access  Public (verified by Clerk signature)
// export const handleClerkWebhook = async (req, res) => {
//   try {
//     const { type, data } = req.body;

//     switch (type) {
//       case "user.created":
//         await User.create({
//           clerkId: data.id,
//           email: data.email_addresses[0]?.email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || 
//                 data.email_addresses[0]?.email_address.split("@")[0],
//           avatar: data.image_url || "",
//           currentStage: 1,
//           stats: {
//             careerProgress: 0,
//             skillsMastered: 0,
//             goalsAchieved: 0,
//             totalGoals: 0,
//             learningHours: 0
//           }
//         });
//         break;

//       case "user.updated":
//         await User.findOneAndUpdate(
//           { clerkId: data.id },
//           {
//             email: data.email_addresses[0]?.email_address,
//             name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//             avatar: data.image_url || ""
//           }
//         );
//         break;

//       case "user.deleted":
//         await User.findOneAndDelete({ clerkId: data.id });
//         break;

//       default:
//         console.log(`Unhandled webhook type: ${type}`);
//     }

//     res.status(200).json({ success: true, received: true });

//   } catch (error) {
//     console.error("Clerk webhook error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Webhook processing error",
//       error: error.message 
//     });
//   }
// };






export const handleClerkWebhook = async (req, res) => {
  try {
    console.log("🔔 Webhook received!");
    console.log("📦 Request body:", JSON.stringify(req.body, null, 2));
    
    const { type, data } = req.body;
    console.log("📌 Event type:", type);

    switch (type) {
      case "user.created":
        console.log("✅ Creating user with data:", data);
        
        const newUser = await User.create({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || 
                data.email_addresses[0]?.email_address.split("@")[0],
          avatar: data.image_url || "",
          currentStage: 1,
          stats: {
            careerProgress: 0,
            skillsMastered: 0,
            goalsAchieved: 0,
            totalGoals: 0,
            learningHours: 0
          }
        });
        
        console.log("🎉 User created successfully:", newUser._id);
        break;

      case "user.updated":
        console.log("📝 Updating user:", data.id);
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            avatar: data.image_url || ""
          }
        );
        console.log("✅ User updated");
        break;

      case "user.deleted":
        console.log("🗑️ Deleting user:", data.id);
        await User.findOneAndDelete({ clerkId: data.id });
        console.log("✅ User deleted");
        break;

      default:
        console.log(`⚠️ Unhandled webhook type: ${type}`);
    }

    res.status(200).json({ success: true, received: true });

  } catch (error) {
    console.error("❌ Clerk webhook error:", error);
    console.error("❌ Error details:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Webhook processing error",
      error: error.message 
    });
  }
};