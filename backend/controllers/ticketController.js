const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
// @get  user ticket
// @route get/api/tickets
// acess private
const getTickets = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  const tickets = await Ticket.find({ clientId: req.user.id });
  res.status(200).json(tickets);
});

// @get  user ticket
// @route post/api/tickets
// acess private
const createTicket = asyncHandler(async (req, res) => {
  const { product, problem, purchase_date, serial, note, clientId } = req.body;
  if (!product || !problem) {
    res.status(400);
    throw new Error('please add product and issue');
  }
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  let stage = {
    type: 'Confirmation Stage',
    message:
      "We're in the process of confirming the details you submitted for your warranty. Once the confirmation is complete, we'll promptly notify you.",
  };

  const ticket = await Ticket.create({
    product,
    problem,
    user: req.user.id,
    purchase_date,
    serial,
    note,
    // created_date,
    // created_time,
    status: 'active',
    stage: stage,
    clientId,
    stageType: 'confirme',
  });
  res.status(201).json(ticket);
});
// @get  user ticket
// @route get/api/tickets
// acess private
const getTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not authorized');
  }

  res.status(200).json(ticket);
});

// delete
const deleteTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not authorized');
  }
  await ticket.deleteOne();
  res.status(200).json({ success: true });
});
// @get  user ticket
// @route put/api/tickets
// acess private
const updateTicket = asyncHandler(async (req, res) => {
  // get user using th eid jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
    ('');
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not authorized');
  }
  const { stageType } = req.body;
  let stage;
  if (stageType === 'confirme') {
    stage = {
      type: 'Confirmation Stage',
      message:
        "We're in the process of confirming the details you submitted for your warranty. Once the confirmation is complete, we'll promptly notify you.",
    };
  }
  if (stageType === 'request') {
    stage = {
      type: 'Return Request',
      message:
        'We kindly request your immediate assistance in bringing the product you reported for inspection. Your prompt action will greatly assist in resolving the issue efficiently. Please let us know a convenient time for drop-off. Your cooperation is highly valued.',
    };
  }
  if (stageType === 'recieved') {
    stage = {
      type: 'In-progress',
      message:
        "We've received the product you returned regarding the reported issue. Our team is currently inspecting it to address the matter effectively. We'll update you on the progress shortly.",
    };
  }

  if (stageType === 'ready') {
    stage = {
      type: 'Ready for Collection',
      message:
        "We're pleased to inform you that your product is now ready for collection following the necessary repairs. Please let us know your preferred time for pick-up, and we'll ensure a smooth handover.",
    };
  }

  const data = {
    ...req.body,
    stage,
  };
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
