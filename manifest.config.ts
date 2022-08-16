import { defineManifest } from "@crxjs/vite-plugin";
import * as packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-alpha.6)
let [major, minor, patch, label = "0"] = version
  // 只能包含字母，数字，下划线，中划线，点
  .replace(/[^\d\w.-]/g, "")
  // split into version parts
  .split(/(?:(?<=\d)\.)|(?:-)/);

label = label.replace(/[^\d]/g, "");
// result: 0.1.0.alpha6

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === "staging"
      ? "[INTERNAL] CRXJS Power Tools"
      : "CRXJS Power Tools",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  options_page: "index.html",
}));
