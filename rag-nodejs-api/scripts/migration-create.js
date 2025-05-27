const { execSync } = require("child_process");

const name = process.argv[2] || "AddNewField";
execSync(
  `env-cmd -f .env ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js src/migration/${name}`,
  { stdio: "inherit" }
);
