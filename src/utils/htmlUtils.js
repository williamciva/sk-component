import { SERVICE_BASE_PATH } from "../config/constants.js";


export const buildStyles = (files, appName) => files.map((f) => buildStyle(f, appName)).join('\n    ');

export const buildStyle = (file, appName) => `<link rel="stylesheet" href="\${BASE_FOLDER}${appName != undefined ? appName + "/" : ""}${file}" />`;

export const buildScipts = (files, appName) => files.map((f) => buildScipt(f, appName)).join('\n    ');

export const buildScipt = (file, appName) => `<script src="\${BASE_FOLDER}${appName != undefined ? appName + "/" : ""}${file}"></script>`;

export const buildSciptsServices = (files, appName) => files.map((f) => buildSciptService(f, appName)).join('\n    ');

export const buildSciptService = (file, appName) => `<script src="\${BASE_FOLDER}${appName != undefined ? appName + "/" : ""}${SERVICE_BASE_PATH}/${file}"></script>`;