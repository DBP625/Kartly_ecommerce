import mongoose from "mongoose";
import bcrypt from "bcryptjs"; //to hash password before saving to database

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Validation: Name must be provided
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Validation: Email must be provided
      unique: true, // Ensure email uniqueness
      lowercase: true, // Store email in lowercase
      trim: true, // Remove whitespace from both ends
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local"; // Only required for local auth
      },
      minlength: [6, "Password must be at least 6 characters long"], // Validation: Minimum length
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },

    // NEW: Firebase-specific fields
    firebaseUid: {
      type: String,
      sparse: true, // Allows multiple null values (for non-Firebase users)
      unique: true, // But unique when it exists
    },

    authProvider: {
      type: String,
      enum: ["local", "firebase"], // Can be either 'local' or 'firebase'
      default: "local",
    },

    profilePicture: {
      type: String, // URL to profile picture from Firebase/Google
    },

    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"], // Validation: Minimum quantity
        },
        product: {
          type: mongoose.Schema.Types.ObjectId, //it means that the product field will store an ObjectId that references a document in another collection.
          ref: "Product", // Reference to the Product model
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"], // Role can be either 'user' or 'admin'
      default: "customer", // Default role is 'user'
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.authProvider !== "local") {
    // Skip hashing if password not modified or not local auth
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
//it means that before saving a user document to the database, if the password field has been modified, it will hash the password using bcryptjs with a salt factor of 10.

const User = mongoose.model("User", userSchema);

export default User;
