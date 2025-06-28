// Main Home Logic 
const home = (req, res) => {
  console.log('You have got the access to home');
  res.json({ message: "You have got the access to home" });
};

module.exports = { home };
