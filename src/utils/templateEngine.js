import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_ENCODING, TEMPLATE_PATH } from '../config/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateFromTemplate = async (templateName, outputPath, data) => {
    const templatePath = path.resolve(__dirname, `../${TEMPLATE_PATH}/${templateName}.tpl`);
    
    let content = await fs.readFile(templatePath, DEFAULT_ENCODING);

    Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        content = content.replace(regex, data[key]);
    });

    await fs.writeFile(outputPath, content);
};