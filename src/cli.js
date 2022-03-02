import { spawn } from 'child_process';
import parseArgumentsIntoOptions from './parseArgumentsIntoOptions';
import promptForMissingOptions from './promptForMissingOptions';

export async function cli(args) {
  let options, skipPrompts, directory;
  options = parseArgumentsIntoOptions(args);
  ({ skipPrompts, directory, ...options } = await promptForMissingOptions(options));
  options = Object.keys(options).reduce((obj, key) => {
    if (options[key]) obj = [...obj, key];
    return obj;
  }, []).join('+')
  if (options !== '') options = ` --with ${options}`
  const isWindows = process.platform === 'win32';
  const cmd = isWindows ? 'cmd' : 'npm';
  const npmArgs = isWindows ? ['/c', `npm init @svelte-add/kit@latest ${directory}${options}`] : [`init @svelte-add/kit@latest ${directory}${options}`];
  const cwd = process.cwd();

  spawn(cmd, npmArgs, {
    cwd,
    shell: true,
    stdio: 'inherit'
  })
}