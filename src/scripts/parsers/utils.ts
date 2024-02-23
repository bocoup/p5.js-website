import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";

/**
 * Clone the library repo if it doesn't exist or if it's not recent
 * @param localSavePath The path to save the library repo to
 * @param [repoUrl] The URL of the library repo to clone, default to p5.js library
 * @returns void
 */
export const cloneLibraryRepo = async (
  localSavePath: string,
  repoUrl = "https://github.com/processing/p5.js.git",
) => {
  const git = simpleGit();

  const repoExists = await fileExistsAt(localSavePath);
  const hasRecentRepo = repoExists && (await fileModifiedSince(localSavePath));

  if (!hasRecentRepo) {
    console.log("Cloning repository ...");
    try {
      await git.clone(repoUrl, localSavePath, [
        "--depth",
        "1",
        "--filter=blob:none",
      ]);
      console.log("Repository cloned successfully.");
      await fixAbsolutePathInPreprocessor(localSavePath);
    } catch (err) {
      console.error(`Error cloning repo: ${err}`);
      throw err;
    }
  } else {
    console.log(
      "Recent version of library repo already exists, skipping clone...",
    );
  }
};

/**
 * Check if a file was modified within a given time frame
 * @param path Path to the file
 * @param [hoursAgo] Number of hours ago to compare the file's modification time to, default = 24
 * @returns boolean whether the file was modified within the given time frame
 */
export const fileModifiedSince = async (path: string, hoursAgo = 24) => {
  try {
    const stats = await fs.stat(path);
    const modifiedTime = stats.mtime.getTime();
    const currentTime = Date.now();
    const threshold = currentTime - hoursAgo * 60 * 60 * 1000; // 24 hours in milliseconds

    return modifiedTime >= threshold;
  } catch (err) {
    console.error(`Error checking modification time: ${err}`);
    return false;
  }
};

/**
 *
 * @param path Path to the file
 * @returns boolean whether a file exists at the given path
 */
export const fileExistsAt = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

/**
 * A wrapper around fs.writeFile that creates the directory if it doesn't exist,
 * logs the path of the file written, and catches errors.
 * @param filePath path to write the file to
 * @param data content for the file
 */
export const writeFile = async (filePath: string, data: string) => {
  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    // Write the file
    await fs.writeFile(filePath, data);
    console.log(`File written to ${filePath}`);
  } catch (err) {
    console.error(`Error writing to file: ${err}`);
  }
};

/**
 * Wrapper around fs.readFile that catches errors
 * @param filePath Path to the file
 * @returns string the content of the file
 */
export const readFile = async (filePath: string) => {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return fileContent;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }
};

/**
 * The preprocessor.js file in the library repo has an absolute path to the parameterData.json file.
 * This function modifies the absolute path to a relative path.
 * @param localSavePath The path that the library repo is saved to
 * @returns boolean whether the fix was successful
 */
export const fixAbsolutePathInPreprocessor = async (localSavePath: string) => {
  try {
    const preprocessorPath = path.join(
      localSavePath,
      "docs",
      "preprocessor.js",
    );
    let preprocessorContent = await fs.readFile(preprocessorPath, "utf8");

    preprocessorContent = preprocessorContent.replace(
      "path.join(process.cwd(), 'docs', 'parameterData.json')",
      `path.join(__dirname, 'parameterData.json')`,
    );

    await fs.writeFile(preprocessorPath, preprocessorContent, "utf8");
    console.log("Preprocessor file modified successfully.");
    return true;
  } catch (err) {
    console.error(`Error modifying absolute path in preprocessor: ${err}`);
    return false;
  }
};
