import React from "react"
import { graphql } from "gatsby"



export default ({ data }) => {
    const hero = data.site.siteMetadata.hero

    return(
    <div>
        <h1>I am the {hero.nameFirst.nov.name} {hero.nameSecond._01_03.name}</h1>
        <p>I have the power of {hero.power.zawarudo.name} which can {hero.power.zawarudo.desc}</p>
    </div>
    )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        hero {
          nameFirst {
            nov {
              name
            }
          }
          nameSecond {
            _01_03 {
              name
            }
          }
          power {
            zawarudo {
              name
              desc
            }
          }
        }
      }
    }
  }
  
`