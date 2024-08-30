// Import the built-in 'fs' module for file system operations
const fs = require('fs');
// Import the built-in 'path' module for handling file and directory paths
const path = require('path');

// Retrieve the command line arguments
const operation = process.argv[2]; // The operation to perform (e.g., read, delete, create)
const filePath = process.argv[3];  // The file or directory to operate on
const content = process.argv[4];   // The content to append (only used for 'append' operation)

// Validate that the operation and file path are provided
if (!operation || !filePath) {
  console.log('Usage: node index.js <operation> <file> [content]');
  process.exit(1); // Exit the process with an error code
}

// Perform the operation based on the argument
switch (operation) {
  case 'read':
    // Read and output the contents of the specified file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Log an error if the file cannot be read
        console.error(`Error reading file: ${err.message}`);
      } else {
        // Output the contents of the file to the console
        console.log(data);
      }
    });
    break;

  case 'delete':
    // Delete the specified file
    fs.unlink(filePath, (err) => {
      if (err) {
        // Log an error if the file cannot be deleted
        console.error(`Error deleting file: ${err.message}`);
      } else {
        // Confirm that the file was successfully deleted
        console.log(`File '${filePath}' deleted`);
      }
    });
    break;

  case 'create':
    // Create a new file (or overwrite if it already exists)
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        // Log an error if the file cannot be created
        console.error(`Error creating file: ${err.message}`);
      } else {
        // Confirm that the file was successfully created
        console.log(`File '${filePath}' created`);
      }
    });
    break;

  case 'append':
    // Check if content is provided for appending
    if (!content) {
      console.log('Usage: node index.js append <file> <content>');
      process.exit(1); // Exit the process with an error code
    }
    // Append content to the end of the specified file
    fs.appendFile(filePath, `\n${content}`, (err) => {
      if (err) {
        // Log an error if the content cannot be appended
        console.error(`Error appending to file: ${err.message}`);
      } else {
        // Confirm that the content was successfully appended
        console.log(`Content appended to the file '${filePath}'`);
      }
    });
    break;

  case 'rename':
    // Get the new file name from command line arguments
    const newFileName = process.argv[4];
    if (!newFileName) {
      console.log('Usage: node index.js rename <oldfile> <newfile>');
      process.exit(1); // Exit the process with an error code
    }
    // Rename the specified file to the new file name
    fs.rename(filePath, newFileName, (err) => {
      if (err) {
        // Log an error if the file cannot be renamed
        console.error(`Error renaming file: ${err.message}`);
      } else {
        // Confirm that the file was successfully renamed
        console.log(`File '${filePath}' renamed to '${newFileName}'`);
      }
    });
    break;

  case 'list':
    // List all files and directories in the specified directory
    fs.readdir(filePath, (err, files) => {
      if (err) {
        // Log an error if the directory cannot be read
        console.error(`Error listing directory: ${err.message}`);
      } else {
        // Output the names of all files and directories in the directory
        files.forEach(file => {
          console.log(file);
        });
      }
    });
    break;

  default:
    // Handle invalid operations
    console.log(`Invalid operation '${operation}'`);
    console.log('Valid operations: read, delete, create, append, rename, list');
}
