#!/usr/bin/env node

import { Command, Option } from 'commander';
import { buildApp, newApp } from './commands/app.js';
import { buildProject, init } from './commands/project.js';

const program = new Command();

program
    .name('sk-component')
    .description('Create Angular apps with the Sankhya framework and run them as a BI component')
    .version('1.0.0');

program
    .commandsGroup("Project")
    .command('init-project <projectName>')
    .description('Start a new project')
    .action(init);

program
    .commandsGroup("Project")
    .command('build-project')
    .description('Build a complete project')
    .action(buildProject);

program
    .commandsGroup("App")
    .command('new-app <appName>')
    .addOption(
        new Option('-E, --entity-name <entityName>', 'Application Entity Name')
            .makeOptionMandatory()
    )
    .description('Create a new Sankhya app')
    .action((appName, options) => newApp(appName, options.entityName));

program
    .commandsGroup("App")
    .command('build-app <appName>')
    .description('Build a application')
    .action((appName) => buildApp(appName));

program.parse();