import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const CategoryTemplate = props => {
  const {
    pageContext: { category },
  } = props
  const {
    data: {
      categories: { nodes: posts },
    },
  } = props
  return (
    <Layout>
      <Hero />
      <Posts posts={posts} title={`category/${category}`} />
    </Layout>
  )
}

export const query = graphql`
  query getCategories($category: String) {
    categories: allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        excerpt
        frontmatter {
          category
          date(formatString: "MMMM Do, YYYY")
          readTime
          slug
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate
