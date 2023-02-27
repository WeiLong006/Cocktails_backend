const favourites = require("../models/favourites");

// Get favourites of logged in user
const getFave = async (req, res) => {
  console.log("getting fave");
  try {
    console.log("trying to get fave");
    const data = await favourites.find({ email: req.body.email });
    console.log(data);
    return res.json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "request to get slot details failed" });
  }
};

// // CREATE: Create new record in db when volunteer signs up
// async function createNewSignUp(req, res) {
//   try {
//     // Modify date
//     const modified_date = new Date(req.body.date);
//     modified_date.setHours(modified_date.getHours() + 8);

//     // Check if volunteer has signed up for this date and timing
//     const clashingSignUp = await VolunteerSlots.findOne({
//       date: modified_date,
//       sign_ups: {
//         $elemMatch: { timing: req.body.timing, email: req.body.email },
//       },
//     });
//     console.log(1);
//     if (clashingSignUp) {
//       return res.status(400).json({
//         status: "error",
//         message: "clashing sign up",
//       });
//     }
//     console.log(2);
//     // Create new record
//     const newSignUp = {
//       role: req.body.role,
//       timing: req.body.timing,
//       type_of_volunteer: req.body.type_of_volunteer,
//       email: req.body.email,
//       qty: req.body.qty,
//     };

//     await VolunteerSlots.updateOne(
//       { date: modified_date },
//       { $push: { sign_ups: newSignUp } }
//     );

//     return res.json({ status: "ok", message: "successfully created" });
//   } catch (error) {
//     console.error("PATCH /volunteer-slots/new-sign-up", error);
//     return res.status(400).json({ status: "error", message: "request failed" });
//   }
// }

module.exports = {
  getFave,
  //   createNewSignUp,
};
