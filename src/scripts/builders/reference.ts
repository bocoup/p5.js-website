import fs from "fs/promises";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMDX from "remark-mdx";
import { parseLibrary } from "../parsers/reference";

const prefix = `./src/content/reference/en/`;

const classMethodPreviews = {};

/**
 * @description modulePathTree is used to structure the export of the reference docs
 * It will be built up as the docs are processed
 */
const modulePathTree: ReferenceModulePathTree = {
  modules: {},
  classes: {},
};

export const buildReference = async () => {
  const parsedOutput = await parseLibrary();

  // Class items also covers the functions that
  // p5 makes globally available
  const classItemMDXDocs = await classItemsToMDX(parsedOutput);
  await saveMDX(classItemMDXDocs);
  // Do in two separate steps so that class MDX
  // can reference classitems
  const classMDXDocs = await classesToMDX(parsedOutput);
  await saveMDX(classMDXDocs);

  console.log("Done building reference docs!");
};

const getModulePath = (doc) => {
  if (!doc || !doc.name) {
    return;
  }

  let docClass = doc.class;
  if (!docClass) {
    if (doc.module.startsWith("p5.")) {
      docClass = doc.module;
    } else {
      docClass = "p5";
    }
  }
  const path = `${prefix}/${docClass}/`;

  return path;
};

const addDocToModulePathTree = (doc, path) => {
  if (!doc || !doc.name || !path) {
    return;
  }

  const modulePath = path.replace("./src/pages/en/reference/", "") + doc.name;
  if (doc.class && doc.class !== "p5") {
    if (!modulePathTree.classes[doc.class]) {
      modulePathTree.classes[doc.class] = {};
    }
    modulePathTree.classes[doc.class][doc.name] = modulePath;
  } else {
    if (!modulePathTree.modules[doc.module]) {
      modulePathTree.modules[doc.module] = {};
    }
    if (doc.submodule) {
      if (!modulePathTree.modules[doc.module][doc.submodule]) {
        modulePathTree.modules[doc.module][doc.submodule] = {};
      }
      modulePathTree.modules[doc.module][doc.submodule][doc.name] = modulePath;
    } else {
      modulePathTree.modules[doc.module][doc.name] = modulePath;
    }
  }
};

async function convertClassToMDX(doc) {
  let frontMatterArgs = {};
  const sourcePath = doc.file?.replace(/.*p5\.js\/(.*)/, "$1") ?? "";
  const memberMethodPreviews = classMethodPreviews[doc.name]
    ? { memberMethodPreviews: classMethodPreviews[doc.name] }
    : {};
  try {
    frontMatterArgs = {
      title: doc.name ?? "",
      module: doc.module,
      submodule: doc.submodule ?? "",
      file: sourcePath ?? "",
      description: doc.description ?? "",
      isConstructor: true,
      ...(doc.line ? { line: doc.line } : {}),
      ...(doc.params ? { params: doc.params } : {}),
      ...(doc.itemtype ? { itemtype: doc.itemtype } : {}),
      ...(doc.examples ? { examples: doc.examples } : {}),
      ...(doc.alt ? { alt: doc.alt } : {}),
      ...(doc.return ? { return: doc.return } : {}),
      ...memberMethodPreviews,
    };

    const frontmatter = matter.stringify("", frontMatterArgs);
    const markdownContent = `# ${doc.name}\n`;
    const mdxContent = remark().use(remarkMDX).processSync(markdownContent);
    return `${frontmatter}\n${mdxContent.toString()}`;
  } catch (err) {
    console.error(`Error converting ${doc.name} to MDX: ${err}`);
    console.log(frontMatterArgs);
    return;
  }
}

async function convertToMDX(doc) {
  if (!doc || !doc.name || !doc.file) {
    return;
  }

  if (doc.is_constructor) {
    return convertClassToMDX(doc);
  }

  if (doc.name?.startsWith("_")) {
    return;
  }

  if (doc.name.startsWith(">") || doc.name.startsWith("<")) {
    doc.name = doc.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  let frontMatterArgs = {};
  const sourcePath = doc.file.replace(/.*p5\.js\/(.*)/, "$1") ?? "";
  try {
    frontMatterArgs = {
      title: doc.name ?? "",
      module: doc.module,
      submodule: doc.submodule ?? "",
      file: sourcePath ?? "",
      description: doc.description ?? "",
      ...(doc.line ? { line: doc.line } : {}),
      ...(doc.params ? { params: doc.params } : {}),
      ...(doc.itemtype ? { itemtype: doc.itemtype } : {}),
      ...(doc.class ? { class: doc.class } : {}),
      ...(doc.example ? { example: doc.example } : {}),
      ...(doc.alt ? { alt: doc.alt } : {}),
      ...(doc.return ? { return: doc.return } : {}),
      chainable: doc.chainable === 1,
    };

    const frontmatter = matter.stringify("", frontMatterArgs);
    const markdownContent = `# ${doc.name}\n`;
    const mdxContent = remark().use(remarkMDX).processSync(markdownContent);
    return `${frontmatter}\n${mdxContent.toString()}`;
  } catch (err) {
    console.error(`Error converting ${doc.name} to MDX: ${err}`);
    console.log(frontMatterArgs);
    return;
  }
}

async function classItemsToMDX(docs) {
  console.log("Converting YUI classitem docs to MDX...");

  return convertDocsToMDX(Object.values(docs.classitems));
}

async function classesToMDX(docs) {
  console.log("Converting YUI classes docs to MDX...");

  return convertDocsToMDX(Object.values(docs.classes));
}

function addClassMethodPreviewsToClassDocs(doc, path) {
  if (
    !doc.class ||
    doc.class === "p5" ||
    !doc.name ||
    !path ||
    !doc.description
  ) {
    return;
  }
  // If this is a class method, we need to add relevant info to the classMethodPreviews object
  if (!classMethodPreviews[doc.class]) {
    classMethodPreviews[doc.class] = {};
  }
  const classMethodPath = `../${modulePathTree.classes[doc.class][doc.name]}`;
  classMethodPreviews[doc.class][doc.name] = {
    description: doc.description,
    path: classMethodPath,
  };
}

const convertDocsToMDX = async (docs): ReferenceMDXDoc[] | [] => {
  try {
    const mdxDocs = await Promise.all(
      docs.map(async (doc) => {
        const mdx = await convertToMDX(doc);
        const savePath = getModulePath(doc);
        const name = doc.name;
        addDocToModulePathTree(doc, savePath);
        addClassMethodPreviewsToClassDocs(doc, savePath);
        return { mdx, savePath, name };
      }),
    );

    return mdxDocs.filter(
      (mdxDoc) => mdxDoc.mdx && mdxDoc.savePath && mdxDoc.name,
    );
  } catch (err) {
    console.error(`Error converting docs to MDX: ${err}`);
    return [];
  }
};

async function saveMDX(mdxDocs) {
  console.log("Saving MDX...");
  try {
    for (const mdxDoc of mdxDocs) {
      await fs.mkdir(mdxDoc.savePath, {
        recursive: true,
      });
      await fs.writeFile(
        `${mdxDoc.savePath}/${mdxDoc.name}.mdx`,
        mdxDoc.mdx.toString(),
      );
    }
  } catch (err) {
    console.error(`Error saving MDX: ${err}`);
  }
}

buildReference();
