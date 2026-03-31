import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { APP_BASE_PATH, RESOURCE_BASE_PATH, SERVICE_BASE_PATH } from '../config/constants.js';


export const addAppToArchive = (archive, appName, jspFile) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);

    archive.append(null, { name: `${appName}/` });

    archive.directory(appPath, appName);

    archive.file(jspFile, { name: `${appName}/index.jsp` });
}


export const addCommonsToArchive = (archive) => {
    const servicePath = path.join(process.cwd(), SERVICE_BASE_PATH);
    const resourcePath = path.join(process.cwd(), RESOURCE_BASE_PATH);

    archive.append(null, { name: `${SERVICE_BASE_PATH}/` });
    archive.append(null, { name: `${RESOURCE_BASE_PATH}/` });

    archive.directory(servicePath, SERVICE_BASE_PATH);
    archive.directory(resourcePath, RESOURCE_BASE_PATH);
}


export const zipFiles = async (zipOutput, fun) => {
    const dir = path.dirname(zipOutput);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const output = fs.createWriteStream(zipOutput);

    const archive = archiver('zip', {
        zlib: { level: 9 },
        forceLocalTime: true,
        forceZip64: true,
    });

    const streamFinished = new Promise((resolve, reject) => {
        output.on('close', resolve);
        output.on('error', reject);
        archive.on('error', reject);
    });

    archive.pipe(output);

    try {
        await fun(archive)
        await archive.finalize();
        await streamFinished;
    } catch (e) {
        output.destroy();
        throw e;
    }

    return archive;
}