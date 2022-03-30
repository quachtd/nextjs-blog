import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import {getAllBlogPostIds, getBlogPostData} from '../../utils/readingMDfiles'
import css from '../../styles/utils.module.css'

export default function Post({ blogData }) {
	return (
		<Layout>		
			<Head>
				<title>{blogData.title}</title>
			</Head>
			<article>
			<h1 className={css.headingXl}>{blogData.title}</h1>
			<div className={css.lightText}>
			<Date dateString={blogData.date} />
			</div>			
			<div dangerouslySetInnerHTML={{ __html: blogData.htmlContent }} />
			</article>
		</Layout>
	)
}

export async function getStaticPaths() {
	// return a list of possible value for id
	const paths = getAllBlogPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	// fetch the blog content by using the params.id
	const blogData = await getBlogPostData(params.id)
	return {
		props: {
			blogData
		}
	}
}