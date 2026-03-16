import fs from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path';
import { APP_BASE_PATH, BUILD_PATH, JSP_NAME, MESSAGES } from "../config/constants.js";
import { getAppHtmlContent, scanAppFiles, scanServices } from '../utils/fileScanner.js';
import { toPascalCase } from '../utils/stringUtils.js';
import { generateFromTemplate } from "../utils/templateEngine.js";
import { addAppToArchive, zipFiles } from '../utils/zipUtil.js'
import { buildScipts, buildSciptsServices, buildStyles } from '../utils/htmlUtils.js';


export const newApp = async (appName, entityName) => {
    appName = toPascalCase(appName);
    const appPath = path.join(process.cwd(), APP_BASE_PATH, appName);

    try {
        const folderExists = await fs.access(appPath).then(() => true).catch(() => false);

        if (folderExists) {
            const answers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: MESSAGES.APP_EXISTS(appName),
                    default: false
                }
            ]);

            if (!answers.overwrite) {
                console.log(MESSAGES.CANCELLED);
                return;
            }
        }

        await fs.mkdir(appPath, { recursive: true });

        const templateData = {
            appName: appName,
            entityName: entityName,
            controllerName: `${appName}Ctrl`
        };

        await Promise.all([
            generateFromTemplate("app.html", path.join(appPath, `${appName}.html`), templateData),
            generateFromTemplate("app.css", path.join(appPath, `${appName}.css`), templateData),
            generateFromTemplate("app.component", path.join(appPath, `${appName}.component.js`), templateData),
        ]);

        console.log(MESSAGES.APP_SUCCESS(appName));
    } catch (err) {
        console.error(MESSAGES.ERROR_ROOT, err);
    }
}


export const buildApp = async (
    appName,
    buildAppPath = path.join(process.cwd(), BUILD_PATH, APP_BASE_PATH, appName),
    output = path.join(buildAppPath, `${appName}.zip`),
) => {
    appName = toPascalCase(appName);

    try {
        await fs.mkdir(buildAppPath, { recursive: true });

        const { head, body } = await getAppHtmlContent(appName)

        const { styles, scripts, controllers } = await scanAppFiles(appName);
        const services = await scanServices()

        const appStyles = buildStyles(styles, appName)
        const appScripts = buildScipts(scripts, appName)
        const appControllersScripts = buildScipts(controllers, appName)
        const servicesScripts = buildSciptsServices(services)
        const appControllers = buildControllers(controllers)


        const templateData = {
            appName: appName,
            appStyles: appStyles,
            appScripts: appScripts,
            appControllersScripts: appControllersScripts,
            servicesScripts: servicesScripts,
            appHead: head,
            appBody: body,
            appControllers: appControllers,
        };


        const jspFile = path.join(buildAppPath, JSP_NAME);
        await generateFromTemplate("app.jsp", jspFile, templateData);

        if (output) {
            const archive = await zipFiles(output, async (archive) => {
                addAppToArchive(archive, appName, jspFile)
            });

            const pointer = archive.pointer()
            console.log(MESSAGES.BUILD_ZIP_SUCCESS(output, pointer));
        } else {
            console.log(MESSAGES.BUILD_SUCCESS(buildAppPath));
        }

    } catch (err) {
        console.error(MESSAGES.ERROR_BUILD, err);
    }
}


export const buildControllers = (controllers) => controllers.map(buildController).join("")


export const buildController = (controller) => {
    const cName = controller.substring(0, controller.indexOf(".component.js"))
    if (cName.length > 0) {
        return `.controller ('${cName}Ctrl', ${cName})`
    }
    return "";
}