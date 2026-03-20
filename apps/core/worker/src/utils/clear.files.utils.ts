import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

export async function clearBuildFolders(id: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error("Invalid ID");
  }

  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // `cmd.sh` lives in `src/cmd`, and it expects to run from `apps/core`
    const coreRootDir = path.join(__dirname, "../..");
    const scriptPath = path.join(coreRootDir, "src/cmd/cmd.sh");

    const child = spawn("bash", [scriptPath, id], { cwd: coreRootDir });

    child.on("error", (err) => reject(err));

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("Folders cleared successfully");
        resolve(true);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}
