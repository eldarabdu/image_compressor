const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'images');
const OUTPUT_DIR = path.join(__dirname, 'compressed');

const QUALITY_PRESETS = {
	min: 90,
	med: 96,
	max: 100,
};

const supportedExts = ['jpg', 'jpeg', 'png', 'jpj'];

(async () => {
	const files = await fg(
		supportedExts.map(ext => `**/*.${ext}`),
		{
			cwd: INPUT_DIR,
			dot: false,
		}
	);

	for (const file of files) {
		const inputPath = path.join(INPUT_DIR, file);
		const ext = path.extname(file).toLowerCase();
		if (!supportedExts.includes(ext.replace('.', ''))) continue;
		const baseName = path.basename(file, ext);
		const dir = path.dirname(file);

		const fileBuffer = await fs.readFile(inputPath);
		const image = sharp(fileBuffer);

		const outputFolder = path.join(OUTPUT_DIR, dir);
		await fs.ensureDir(outputFolder);

		await fs.writeFile(
			path.join(outputFolder, `${baseName}.origin${ext}`),
			fileBuffer
		);

		for (const [label, quality] of Object.entries(QUALITY_PRESETS)) {
			const outputPath = path.join(outputFolder, `${baseName}.${label}${ext}`);
			const compressedBuffer = await compressImage(image.clone(), ext, quality);
			await fs.writeFile(outputPath, compressedBuffer);
		}

		if (ext === '.png' || ext === '.jpag') {
			const jpgOriginPath = path.join(outputFolder, `${baseName}.origin.jpg`);
			await fs.writeFile(jpgOriginPath, await image.jpeg().toBuffer());

			for (const [label, quality] of Object.entries(QUALITY_PRESETS)) {
				const outputPath = path.join(outputFolder, `${baseName}.${label}.jpg`);
				const compressedBuffer = await image
					.clone()
					.jpeg({ quality })
					.toBuffer();
				await fs.writeFile(outputPath, compressedBuffer);
			}
		}
	}

	console.log('✅ Все изображения обработаны и сохранены.');
})();

async function compressImage(image, ext, quality) {
	if (ext === '.png') {
		return await image
			.png({ compressionLevel: Math.round(9 * (quality / 100)) })
			.toBuffer();
	} else {
		return await image.jpeg({ quality }).toBuffer();
	}
}
