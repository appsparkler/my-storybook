module.exports = {
  apps: [
    {
      script: 'yarn workspace react-mark.js storybook',
      name: 'my-react-markjs-sb',
      // watch: '.'
    },

    // MY STORYBOOK
    {
      script: 'yarn workspace my-storybook start',
      name: 'my-app',
      // watch: '.'
    },
    {
      script: 'yarn workspace my-storybook storybook',
      name: 'my-sb',
      // watch: '.'
    },
  ],
}
