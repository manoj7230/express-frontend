const test = require("node:test");
const assert = require("node:assert/strict");
test("node runtime is available", () => assert.ok(process.version.startsWith("v")));
