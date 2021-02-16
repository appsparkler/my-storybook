import React from 'react'
// import FileManager from '.'

const FileManager = () => {
  return (
    <div>
      <label>
        Upload Files
        <br />
        <input type="file" multiple />
      </label>
      <table>
        <thead>
          <tr>
            <th>Sr #</th>
            <th>File Name</th>
            <th>CTAs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Profile_pic.jpeg</td>
            <td>
              <button type="button">Download/Open</button>
              &nbsp;
              <button type="button">Delete File</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Story = {
  title: 'Components/File Manager',
  component: FileManager,
}

export default Story

const Template = (args) => <FileManager {...args} />
Template.args = {
  filePath: 'uploadedFiles/522d2ac7-8e30-4c48-8747-41ca37bb76d7-env-with-auth',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
