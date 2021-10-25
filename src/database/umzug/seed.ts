import UmzugInit from ".";

(async () => {
  const umzug = new UmzugInit('seeders').init();
  // checks migrations and run them if they are not already applied
  await umzug.up();
  console.log("All seeds performed successfully");
})();
