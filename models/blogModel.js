const mongoose = require("mongoose"); // Erase if already required
var blogSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        message: {
            type: String,
            required: true,
        },

        comments: [{
            sentBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            sentAt: {
                type: Date,
                default: Date.now,
            },
            liked:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }],
        numViews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
//Export the model
module.exports = mongoose.model("Blog", blogSchema);