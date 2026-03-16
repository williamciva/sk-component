export const APP_BASE_PATH = 'apps';
export const SERVICE_BASE_PATH = 'services';
export const TEMPLATE_PATH = 'templates';
export const BUILD_PATH = 'build';
export const JSP_NAME = 'index.jsp'

export const DEFAULT_ENCODING = 'utf-8';
export const SUPPORTED_EXTENSIONS = ['.js', '.html', '.css', '.jsp'];

export const MESSAGES = {
    SUCCESS: '✅ Operation completed successfully!',
    ERROR_ROOT: '❌ We were unable to create a new app. Are you sure you are in the project root?',
    ERROR_INIT_PROJECT: '❌ Error creating project:',
    ERROR_BUILD: '❌ Erro durante o build:',
    CANCELLED: '❌ Transaction cancelled by the user.',
    PROJECT_SUCCESS: (appName) => `✅ Project ${appName} created successfully!`,
    APP_SUCCESS: (appName) => `🚀 App "${appName}" created successfully!`,
    APP_EXISTS: (appName) => `⚠️ The app "${appName}" already exists. Do you want to overwrite the files?`,
    BUILD_SUCCESS: (buildAppPath) => `📦 Build completed: ${buildAppPath}`,
    BUILD_ZIP_SUCCESS: (zipOutput, size) => `📦 Build completed: ${zipOutput} (${size} bytes)`,
};