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
