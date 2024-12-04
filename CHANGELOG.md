# Change Log

All notable changes to the "base64-converter" extension will be documented in this file.

## [1.0.0] - 2024-10-09

- Initial release:
  - Added functionality to convert a Base64 string to a file and save it to the filesystem.
  - Users can specify the file extension or input a custom extension.

## [1.0.1] - 2024-10-09

- Updated README.md with detailed instructions on installation and usage.

## [1.1.0] - 2024-10-10

- Added registration for a new `WebviewViewProvider` in the side panel.
  - This prepares the extension for a future UI that will allow interaction through a graphical interface.
  - No visual interface added yet, but the view container is now in place.

## [1.2.0] - 2024-10-10

### 🌟 New Features

- **Success Message & Input Reset**:
  - Added a success message that is displayed when the Base64 conversion is successfully completed.
  - The Base64 input field is now automatically cleared after a successful conversion.

### 🔧 Improvements

- Enhanced user experience by providing feedback on successful file conversions directly in the UI.

## [1.2.1] - 2024-10-30

### 🌟 New Features

- **Save file path**:
  - Added a feature to save the file path to global storage.
  - When the user saves a new file, the path is stored and displayed in the UI. This allows users to easily access the saved file.

### 🔧 Improvement

- Enhanced user experience by providing quick access to the saved file path.

## [2.0.0] - 2024-11-06

### 🌟 New Features

- **File to Base64 Conversion**:
  - Added functionality to convert a file to a Base64 string.
  - Users can now select a file from the file system and convert it to a Base64 string.
  - The Base64 string is displayed in the UI for easy access and copying.
  - The Base64 string will be automatically copied to the clipboard for convenience.

### 🔧 Improvements

- Enhanced user experience by providing a two-way conversion between files and Base64 strings.
- Improved UI feedback for file selection and conversion.

## [2.0.1] - 2024-12-03

### 🔧 Improvements

- Update logo.
