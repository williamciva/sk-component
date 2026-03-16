import fs from 'fs/promises';
import path from 'path';
import { APP_BASE_PATH, SERVICE_BASE_PATH } from '../config/constants.js';

export const scanAppFiles = async (appName) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);
    const files = await fs.readdir(appPath);
    const appComponentsName = `${appName}.component.js`

    const styles = files.filter(f => f.endsWith(`${appName}.css`));
    const scripts = files.filter(f => f.endsWith('.js') && !f.endsWith(appComponentsName));
    const controllers = files.filter(f => f.endsWith(appComponentsName));

    return { styles, scripts, controllers };
};


export const scanStyles = async (appName) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);
    const files = await fs.readdir(appPath);
    return files.filter(f => f.endsWith(`${appName}.css`));
}


export const scanCustomsJS = async (appName) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);
    const files = await fs.readdir(appPath);
    return files.filter(f => f.endsWith('.js') && !f.endsWith(`${appName}.component.js`));
}


export const scanControllers = async (appName) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);
    const files = await fs.readdir(appPath);
    return files.filter(f => f.endsWith(`${appName}.component.js`));
}


export const scanServices = async () => {
    const sercicesPath = path.join(process.cwd(), SERVICE_BASE_PATH);
    const files = await fs.readdir(sercicesPath);
    return files.filter(f => f.endsWith('.js'));;
};


export const getAppHtmlContent = async (appName) => {
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);

    try {
        const content = await fs.readFile(path.join(appPath, `${appName}.html`), 'utf-8');

        const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

        return {
            head: headMatch ? headMatch[1].trim() : '',
            body: bodyMatch ? bodyMatch[1].trim() : content.trim()
        };
    } catch (err) {
        return { head: '', body: '' };
    }
};