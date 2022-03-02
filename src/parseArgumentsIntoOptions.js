import arg from 'arg';

export default rawArgs => {
  const args = arg(
    {
      '--yes': Boolean,
      '--eslint': Boolean,
      '--prettier': Boolean,
      '--tailwindcss': Boolean,
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    eslint: args['--eslint'] || false,
    prettier: args['--prettier'] || false,
    tailwindcss: args['--tailwindcss'] || false,
  };
}