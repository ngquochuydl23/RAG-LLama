const { execSync } = require("child_process");

const name = process.argv[2] || "AddNewField";
execSync(
  `npm run typeorm -- migration:generate ./src/migrations/${name} -d ./src/data-source.ts`,
  { stdio: "inherit" }
);
