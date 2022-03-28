import React from "react"
import {graphql} from "gatsby"
import {Seo} from '../components/Seo';
import {Layout} from '../components/Layout';
import {Pagination} from '../components/Pagination';
import {PostCardContainer} from '../components/PostCardContainer';
import PropTypes from 'prop-types';

const Posts = ({data: {allMarkdownRemark}, pageContext}) => (
  <Layout>
    <Seo title={`${pageContext.fieldValue} posts`}/>
    <h1 className="page__title">
      Posts tagged with <strong>{pageContext.fieldValue}</strong>
    </h1>
    <PostCardContainer posts={allMarkdownRemark.nodes}/>
    <Pagination
      base={pageContext.base}
      currentPage={pageContext.currentPage}
      pageCount={pageContext.pageCount}/>
  </Layout>
);

export const query = graphql`
  query($skip: Int!, $limit: Int!, $fieldValue: String!) {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, skip: $skip, limit: $limit, filter: {frontmatter: {tags: {eq: $fieldValue}}}) {
      nodes {
        excerpt(format: PLAIN)
        frontmatter {
          categories
          title
          date(formatString: "MMMM Do, YYYY")
          excerpt
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 80)
            }
          }
        }
        slug
        id
      }
    }
  }
`;

export default Posts;


Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        frontmatter: PropTypes.shape({
          categories: PropTypes.arrayOf(PropTypes.string),
          tags: PropTypes.arrayOf(PropTypes.string),
          daysAgo: PropTypes.number,
          title: PropTypes.string,
          excerpt: PropTypes.string,
          featuredImage: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              gatsbyImageData: PropTypes.object
            })
          })
        }),
        slug: PropTypes.string,
      }))
    })
  }),
  pageContext: PropTypes.shape({
    fieldValue: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired
  })
};
