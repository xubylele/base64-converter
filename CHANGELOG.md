# Change Log

All notable changes to the "base64-converter" extension will be documented in this file.

## [2.2.0] - 2025-01-11

### 🌟 New Features 2.2.0

- **Conversion History UI**:
  - Added a new WebView panel to display the conversion history in a user-friendly interface.
  - Users can:
    - View all past conversions with details such as timestamp, conversion type, and file path.
    - Copy Base64 strings directly from the history.
    - Reuse previously converted files.
  - Includes dark mode support that adapts to the user’s system preferences or allows manual toggling.

### 🔧 Improvements 2.2.0

- Enhanced UI/UX for history interactions with smooth transitions and responsive design.
- Migrated project dependency management from Yarn to NPM for better compatibility and stability.
- Integrated React and Tailwind CSS:
  - Currently applied to the new WebView for conversion history.
  - Sets the foundation for future UI/UX enhancements across the extension.

### 🔢 Testing Enhancements 2.2.0

- Added Jest unit tests for the new WebView, ensuring robustness and edge-case handling.
- Future plans include extending tests to cover existing extension commands to maintain reliability and functionality across features.

---

## [2.0.1] - 2024-12-03

### 🔧 Improvements 2.0.1

- **Logo Update**: Updated the extension's logo for better visual representation.

---

## [2.0.0] - 2024-11-06

### 🌟 New Features 2.0.0

- **File to Base64 Conversion**:
  - Added functionality to convert a file to a Base64 string.
  - Users can select a file from the file system and convert it to a Base64 string.
  - The Base64 string is displayed in the UI for easy access and copying.
  - Automatically copies the Base64 string to the clipboard for convenience.

### 🔧 Improvements

- Enhanced user experience by providing a two-way conversion between files and Base64 strings.
- Improved UI feedback for file selection and conversion.

---

## [1.2.1] - 2024-10-30

### 🌟 New Features 1.2.1

- **Save File Path**:
  - Added a feature to save the file path to global storage.
  - Displays the saved file path in the UI for quick access.

### 🔧 Improvements 1.2.1

- Improved user experience by allowing easy access to saved file paths.

---

## [1.2.0] - 2024-10-10

### 🌟 New Features

- **Success Message & Input Reset**:
  - Displays a success message when a Base64 conversion is successfully completed.
  - Automatically clears the input field after a successful conversion.

### 🔧 Improvements

- Enhanced feedback mechanism for successful file conversions.

---

## [1.1.0] - 2024-10-10

- **Preparation for UI Enhancements**:
  - Registered a `WebviewViewProvider` in the side panel.
  - The view container is in place for a future graphical interface.
  - No visual changes are introduced yet.

---

## [1.0.1] - 2024-10-09

- Updated `README.md` with detailed instructions on installation and usage.

---

## [1.0.0] - 2024-10-09

### ✨ Initial Release

- Added functionality to convert a Base64 string to a file and save it to the filesystem.
- Users can specify the file extension or input a custom extension.

