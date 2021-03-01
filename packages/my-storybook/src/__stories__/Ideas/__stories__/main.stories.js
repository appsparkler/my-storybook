import React from 'react'

const Template = ({ ideas, title }) => (
  <div>
    <h3>{title}</h3>
    <ol>
      {ideas.map((idea) => (
        <li>{idea}</li>
      ))}
    </ol>
  </div>
)
Template.args = {
  title: '',
  ideas: [],
}

export const TimeTool = Template.bind({})
TimeTool.args = {
  ...Template.args,
  title: 'Time Tool',
  ideas: [
    // Add ideas here :)
    'Convert time in one timezone to timezone in another region.',
    'Convert time for a timezone to a timestamp',
    'Convert a timestamp to time in various timezones.',
    'Get time different between two times',
  ],
}

export const YouTubePlaylist = Template.bind({})
YouTubePlaylist.args = {
  ...Template.args,
  title: 'Custom YouTube Playlist',
  ideas: [
    'Add a configuirable playlist for YouTube videos where the user can set the start and end time of the videos, loop them, etc. (provide various options based on query params available for YouTube Videos)',
  ],
}
YouTubePlaylist.storyName = 'YouTube Playlist'

const Story = {
  title: 'POC/Ideas',
}

export default Story
