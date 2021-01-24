module.exports = {
  apps : [


    // MY STORYBOOK
    {
    script: 'yarn workspace my-storybook start',
    name: 'my-app'
      // watch: '.'
    }, {
      script: 'yarn workspace my-storybook storybook',
      name: 'my-sb'
      // watch: '.'
    }
  ]
};
