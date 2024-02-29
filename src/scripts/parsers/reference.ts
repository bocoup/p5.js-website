import { cloneLibraryRepo, readFile } from "./utils";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import type { ParsedLibraryReference } from "../../../types/parsers.interface";

// Derive the directory name (__dirname equivalent) in ES Module scope
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Local directory to clone the p5.js library
const localPath = path.join(__dirname, "in", "p5.js");
// Local path to save the YUIDoc output
const yuidocOutputPath = path.join(__dirname, "out", "data.json");

/**
 * Main function to clone the p5.js library and save the YUIDoc output to a file
 * @returns Promise<ParsedLibraryReference | null>
 */
export const parseLibrary =
  async (): Promise<ParsedLibraryReference | null> => {
    await cloneLibraryRepo(localPath);
    await saveYuidocOutput();
    return getYuidocOutput();
  };

/**
 * Gets the parsed YUIDoc output from the saved file and parses it as JSON
 * @returns Promise<ParsedLibraryReference | null> the parsed YUIDoc output
 */
const getYuidocOutput = async (): Promise<ParsedLibraryReference | null> => {
  const outputFilePath = path.join(yuidocOutputPath, "data.json");
  const output = await readFile(outputFilePath);
  if (output) {
    try {
      return JSON.parse(output);
    } catch (err) {
      console.error(`Error parsing YUIDoc output as JSON: ${err}`);
    }
  }
  return null;
};

/**
 * Parses the p5.js library using YUIDoc and captures the output
 * @returns void
 */
export const saveYuidocOutput = async () => {
  console.log("Running YUIDoc command and capturing output...");
  try {
    await new Promise((resolve, reject) => {
      exec(`yuidoc -p --outdir ${yuidocOutputPath}`, (error, stdout) => {
        if (error) {
          console.error(`Error running YUIDoc command: ${error}`);
          reject(error);
        } else {
          console.log("YUIDoc command completed successfully.");
          resolve(stdout); // Assuming stdout contains the JSON output
        }
      });
    });
  } catch (err) {
    console.error(`Error capturing YUIDoc output: ${err}`);
    throw err;
  }
};

parseLibrary();
