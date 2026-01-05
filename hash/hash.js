const bcrypt = require("bcryptjs");

bcrypt.hash("admin@123", 10).then(hash => {
  console.log("Your hashed password:");
  console.log(hash);
});
