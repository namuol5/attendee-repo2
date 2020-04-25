require("dotenv").config({
  path: `.env.production`,
})

const blogQuery = `{
  allMarkdownRemark{
    nodes {
      frontmatter {
        title 
        date
        description
      }
      fields{
        slug
      }
      excerpt
      html
    }
  }
}`

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) => data.allMarkdownRemark.nodes, // optional
  },
]
module.exports = {
  siteMetadata: {
    title: `GraphQL Workshop`,
    author: {
      name: `Jeff and Louman`,
      summary: `who love to code.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `twitter`,
    },
    hero: {
      nameFirst: {
        jan: {
          name: 'Atomic',
        },
        feb: {
          name: 'Captain',
        },
        mar:{
          name: 'Iron',
        },
        apr: {
          name: 'The',
        },
        may: {
          name: 'Mighty',
        },
        jun: {
          name: 'Invincible',
        },
        jul: {
          name: 'Incredible',
        },
        aug: {
          name: 'Professor',
        },
        sep: {
          name: 'Metal',
        },
        oct: {
          name: 'One Punch',
        },
        nov: {
          name: 'Fantastic',
        },
        dec: {
          name: 'Super',
        },
      },
      nameSecond: {
        "01_03": {
          name: 'Sloth',
        },
        "04_06": {
          name: 'Giraffe',
        },
        "07_09": {
          name: 'Pupper',
        },
        "10_12":{
          name: 'Panther',
        },
        "13_15":{
          name: 'Tiger',
        },
        "16_18":{
          name: 'Squirrel',
        },
        "19_21":{
          name: 'Armadillo',
        },
        "22_24":{
          name: 'Capybara',
        },
        "25_27":{
          name: 'Honey Badger',
        },
        "28_31":{
          name: 'Mouse',
        },
      },
      power: {
        superstrength: {
          name: 'Super Strength',
          desc: 'Ability to lift 10x your body weight',
        },
        superagility: {
          name: 'Super Agility',
          desc: 'Highly agile and quick',
        },
        zawarudo:{
          name: 'Time Stop',
          desc: 'Able to stop time for everything else around you',
        },
        levitation: {
          name: 'Levitation',
          desc: 'Ability to cause whatever you touch to levitate',
        },
        telekinesis:{
          name: 'Telekinesis',
          desc: 'Able to move objects with your mind',
        },
        tech:{
          name: 'Cutting Edge Technology',
          desc: 'Inventor and wielder of cutting edge technology',
        },
      },
    },

    crossword: {
      food: {
        chinese: {
          noodles: {
            name: `chowmein`,
          },
          dimsum: {
            name: `chasiubao`,
          },
        },
        taiwanese: {
          drink: {
            name: `boba`,
          },
        },
        korean: {
          beef: {
            name: `bulgogi`,
          },
          cabbage: {
            name: `kimchi`,
          },
        },
        japanese: {
          grill: {
            name: `hibachi`,
          },
          seafood: {
            name: `sushi`,
          },
          dessert: {
            name: `mochi`,
          },
          noodles: {
            thick: {
              name: `udon`,
            },
            thin: {
              name: `ramen`,
            },
          },
        },
        hawaiian: {
          name: `poke`,
        },
        indian: {
          dumplings: {
            name: `malaikofta`
          },
          flatbread: {
            name: `naan`,
          },
        },
        mediterranean: {
          name: `shawarma`,
        },
        french: {
          dessert: {
            name: `cremebrulee`,
          },
        },
        miscdessert: {
          name: `cake`,
        },
      },
    },
  },
  
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Recipe",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "recipe",
        // Url to query from
        url:
          "https://us-west-2.aws.stitch.mongodb.com/api/client/v2.0/app/testapp-kcwun/graphql",
        headers: async () => {
          return {
            Authorization: await getAuthorizationToken(),
          }
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
