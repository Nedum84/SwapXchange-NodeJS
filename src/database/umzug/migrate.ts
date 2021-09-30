import umzug from ".";

(async () => {
  // checks migrations and run them if they are not already applied
  await umzug.up();
  console.log("All migrations performed successfully");
})();
