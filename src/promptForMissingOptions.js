import inquirer from 'inquirer';

export default async options => {
  if (options.skipPrompts) {
    return {
      ...options,
      directory: '.',
      eslint: true,
      prettier: true,
      tailwindcss: true,
    };
  }

  const questions = [
    { name: 'directory', message: 'Where should we create your project (leave blank to use current directory)?', type: 'input', default: '' },
    { name: 'eslint', message: 'Add ESLint for code linting?', type: 'confirm', default: options.eslint || true },
    { name: 'prettier', message: 'Add Prettier for code formatting?', type: 'confirm', default: options.prettier || true },
    { name: 'tailwindcss', message: 'Add Tailwindcss for CSS styling?', type: 'confirm', default: options.tailwindcss || true },
  ];

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    directory: answers.directory === '' ? '.' : answers.directory,
    eslint: answers.eslint,
    prettier: answers.prettier,
    tailwindcss: answers.tailwindcss,
  };
}