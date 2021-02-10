module.exports = {
  apps: [
    // react-mark.js Storybook
    {
      script: 'yarn workspace react-mark.js storybook',
      name: 'react-markjs-sb : 2001',
      env: {
        NODE_ENV: 'development',
      },
    },

    // My App
    // {
    //   script: 'yarn workspace my-storybook start',
    //   name: 'my-app',
    // },

    // My Storybook
    {
      script: 'yarn workspace my-storybook storybook',
      name: 'my-sb : 2000',
    },

    // HFN Gatsby Storybook
    {
      script: 'yarn workspace react-hfn-gatsby-components storybook',
      name: 'hfn-gatsby : 2002',
    },
    // React HFN Components Storybook
    {
      script: 'yarn workspace @appsparkler/react-hfn-components storybook',
      name: 'react-hfn-components | 2003',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
