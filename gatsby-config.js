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
      twitter: `kylemathews`,
    },
    crossword: {
      food: {
        chinese: {
          name: `chasiubao`,
        },
        taiwanese: {
          drink: {
            name: `boba`,
          },
        },
        korean: {
          name: `bulgogi`,
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
          name: `naan`,
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
