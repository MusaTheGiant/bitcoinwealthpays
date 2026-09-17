/* Optional offline validation: node check-connect.js */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const rules = require("./connect.js");

function check(directory = __dirname) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(directory, "connect-data.js"), "utf8"), sandbox, { timeout: 1000 });
  const data = sandbox.window.BW_CONNECT;
  const errors = [];
  if (!data || !Array.isArray(data.members) || !Array.isArray(data.events)) {
    throw new Error("connect-data.js must define BW_CONNECT with members and events arrays.");
  }
  if (!rules.phone(data.contactWhatsapp)) errors.push("Directory contactWhatsapp needs an international number.");
  for (const [kind, items, valid] of [["member", data.members, rules.validMember], ["event", data.events, rules.validEvent]]) {
    const ids = new Set();
    items.forEach((item, i) => {
      const label = kind + " " + (i + 1) + " (" + (item && item.id || "no id") + ")";
      if (!item || !valid(kind === "member" ? Object.assign({}, item, { active: true }) : item)) {
        errors.push(label + ": missing or invalid required fields."); return;
      }
      if (ids.has(item.id)) errors.push(label + ": duplicate id.");
      ids.add(item.id);
      if (kind === "member") {
        if (typeof item.active !== "boolean") errors.push(label + ": active must be true or false.");
        if (item.timeZone && !rules.validZone(item.timeZone)) errors.push(label + ": invalid timeZone.");
        if (item.photo && !rules.safeUrl(item.photo, true)) errors.push(label + ": photo needs an approved members/ file or HTTPS URL.");
        if (item.photo && /^(?:\.\/)?members\//.test(item.photo) && !fs.existsSync(path.join(directory, item.photo))) errors.push(label + ": photo file is missing.");
        for (const field of ["languages", "areas", "support", "meetingModes"]) {
          if (item[field] !== undefined && (!Array.isArray(item[field]) || item[field].some(x => typeof x !== "string"))) errors.push(label + ": " + field + " must be an array of text values.");
        }
      } else if (item.mapUrl && !rules.safeUrl(item.mapUrl)) errors.push(label + ": mapUrl must use HTTPS.");
    });
  }
  if (errors.length) throw new Error("Directory checks failed:\n" + errors.join("\n"));
  return { members: data.members.filter(x => x.active).length, events: data.events.length };
}
module.exports = check;
if (require.main === module) {
  try { console.log("Directory checks passed:", check()); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
