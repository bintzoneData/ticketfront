const { request } = require('express');
const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'please select a  product'],
    },
    problem: {
      type: String,
      required: [true, 'please enter a description of the issue'],
    },
    purchase_date: {
      type: String,
      required: false,
    },
    serial: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    clientId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'rejected', 'closed'],
      default: 'active',
    },
    stageType: {
      type: String,
      num: ['comfirme', 'request', 'recieved', 'ready'],
      required: true,
    },
    stage: {
      type: {
        type: String,
      },
      message: {
        type: String,
      },
    },
    comfirme: {
      type: Boolean,
      default: true,
    },
    request: {
      type: Boolean,
      default: false,
    },
    recieved: {
      type: Boolean,
      default: false,
    },
    warranty: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ticketSchema.pre('findOneAndUpdate', async function () {
//   this.set({
//     stage: {
//       type: 'Return Request',
//       message:
//         'We kindly request your immediate assistance in bringing the product you reported for inspection. Your prompt action will greatly assist in resolving the issue efficiently. Please let us know a convenient time for drop-off. Your cooperation is highly valued.',
//     },
//   });
//   if (this.stageType === 'comfirm') {
//     this.set({
//       stage: {
//         type: 'Confirmation Stage',
//         message:
//           "We're in the process of confirming the details you submitted for your warranty. Once the confirmation is complete, we'll promptly notify you.",
//       },
//     });
//   }
//   if (this.stageType === 'request') {
//     this.set({
//       stage: {
//         type: 'Return Request',
//         message:
//           'We kindly request your immediate assistance in bringing the product you reported for inspection. Your prompt action will greatly assist in resolving the issue efficiently. Please let us know a convenient time for drop-off. Your cooperation is highly valued.',
//       },
//     });
//   }
//   if (this.stageType === 'recieved') {
//     this.set({
//       stage: {
//         type: 'Product Received',
//         message:
//           "We've received the product you returned regarding the reported issue. Our team is currently inspecting it to address the matter effectively. We'll update you on the progress shortly.",
//       },
//     });
//   }
//   if (this.stageType === 'ready') {
//     this.set({
//       stage: {
//         type: 'Ready for Collection',
//         message:
//           "We're pleased to inform you that your product is now ready for collection following the necessary repairs. Please let us know your preferred time for pick-up, and we'll ensure a smooth handover.",
//       },
//     });
//   }
// });
module.exports = mongoose.model('Ticket', ticketSchema);
