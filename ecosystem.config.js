module.exports = {
  apps: [
    // react-mark.js Storybook
    {
      script: 'yarn workspace react-mark.js storybook',
      name: 'my-react-markjs-sb',
      env: {
        NODE_ENV: 'development',
      },
    },

    // My App
    {
      script: 'yarn workspace my-storybook start',
      name: 'my-app',
    },

    // My Storybook
    {
      script: 'yarn workspace my-storybook storybook',
      name: 'my-sb',
    },

    // HFN Gatsby Storybook
    {
      script: 'yarn workspace react-hfn-gatsby-components storybook',
      name: 'hfn-gatsby',
    },
  ],
}
