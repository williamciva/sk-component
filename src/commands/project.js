import fs from 'fs/promises';
import path from 'path';
import { APP_BASE_PATH, BUILD_PATH, JSP_NAME, MESSAGES, RESOURCE_BASE_PATH, SERVICE_BASE_PATH } from "../config/constants.js";
import { toKebabCase } from "../utils/stringUtils.js";
import { buildApp } from './app.js';
import { addAppToArchive, addCommonsToArchive, zipFiles } from '../utils/zipUtil.js';

export const init = async (projectName) => {
	projectName = toKebabCase(projectName)

	const targetDir = path.join(process.cwd(), projectName);

	try {
		await fs.mkdir(targetDir);
		await fs.mkdir(path.join(targetDir, APP_BASE_PATH));
		await fs.mkdir(path.join(targetDir, SERVICE_BASE_PATH));
		await fs.mkdir(path.join(targetDir, RESOURCE_BASE_PATH));
		console.log(MESSAGES.APP_SUCCESS(projectName));
	} catch (err) {
		console.error(MESSAGES.ERROR_INIT_PROJECT, err);
	}
}


export const buildProject = async () => {
	const appsSourcePath = path.join(process.cwd(), APP_BASE_PATH);
	const projectName = path.basename(process.cwd());
	const projectBuildPath = path.join(process.cwd(), BUILD_PATH);
	const zipPath = path.join(projectBuildPath, `${projectName}.zip`);

	try {
		const entries = await fs.readdir(appsSourcePath, { withFileTypes: true });
		const appFolders = entries
			.filter(entry => entry.isDirectory())
			.map(entry => entry.name);

		if (appFolders.length === 0) {
			console.warn("⚠️ Nenhum app encontrado para build.\n");
			return;
		}

		console.log(`🏗️ Iniciando build do projeto para ${appFolders.length} apps...\n`);


		const appPathsToExclude = []
		const archive = await zipFiles(zipPath, async (archive) => {

			for (const appName of appFolders) {

				const buildAppPath = path.join(projectBuildPath, appName);
				const jspFile = path.join(buildAppPath, JSP_NAME);

				await buildApp(appName, buildAppPath, false);

				addAppToArchive(archive, appName, jspFile);

				appPathsToExclude.push(buildAppPath)
			}

			addCommonsToArchive(archive)

		});

		appPathsToExclude.forEach((path) => fs.rm(path, { recursive: true, force: true }, (err) => {
			if (err) {
				throw err;
			}
		}))

		const pointer = archive.pointer()
		console.log(MESSAGES.BUILD_ZIP_SUCCESS(zipPath, pointer));
	} catch (err) {
		console.error(`\n${MESSAGES.ERROR_BUILD, err}`);
	}
};