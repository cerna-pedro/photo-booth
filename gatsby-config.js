module.exports = {
  siteMetadata: {
    title: `Photo Shoot`,
    description: `A web app that allows you to place a filter over a streaming video of you and your surroundings, take a screenshot, and then download it as an image`,
    author: `Pedro Cerna`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Photo Shoot`,
        short_name: `Photo Shoot`,
        start_url: `/`,
        background_color: `#014B7D`,
        theme_color: `#014B7D`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
