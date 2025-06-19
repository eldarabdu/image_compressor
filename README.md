# Image Compressor

A batch image compression tool that preserves folder structure and creates multiple versions with different compression quality levels.

## Features

- Supported formats: JPG, JPEG, PNG
- Creates three versions of each image with different compression quality:
  - min (90% quality)
  - med (96% quality)
  - max (100% quality)
- Automatic PNG to JPG conversion while preserving originals
- Preserves original folder structure
- Keeps source files

## Requirements

- Node.js 14.0 or higher
- npm 6.0 or higher

## Installation

1. Clone the repository:

```bash
git clone https://github.com/eldarabdu/image_compressor.git
cd image_compressor
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Place images for processing in the `images/` folder (you can create any subfolder structure)

2. Run the script:

```bash
npm start
```

3. After processing is complete, compressed versions of images will be available in the `compressed/` folder while maintaining the original folder structure

### Output File Structure

For each input image `example.jpg`, the following files will be created:

- `example.origin.jpg` - original file
- `example.min.jpg` - version with 90% quality
- `example.med.jpg` - version with 96% quality
- `example.max.jpg` - version with 100% quality

For PNG files, additional JPG versions are created with the same quality levels.

## Technical Details

The project uses the following libraries:

- [sharp](https://sharp.pixelplumbing.com/) - for image processing
- [fast-glob](https://github.com/mrmlnc/fast-glob) - for file searching
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - for file system operations

## Compression Quality Settings

Compression quality levels can be configured in the `compress-images.js` file by modifying the values in the `QUALITY_PRESETS` object:

```javascript
const QUALITY_PRESETS = {
	min: 90, // Minimum quality
	med: 96, // Medium quality
	max: 100, // Maximum quality
};
```

## Author

Eldar Abdu

## License

ISC
