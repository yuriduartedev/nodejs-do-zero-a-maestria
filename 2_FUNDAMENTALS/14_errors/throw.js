const x = "10";

// check if x is number
if (!Number.isInteger(x)) {
  throw new Error("Invalid argument X should be a integer number");
}

console.log("continue...");
