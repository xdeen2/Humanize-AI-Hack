import BlogCard from '@/components/BlogCard'
import SpecialText from '@/components/SpecialText'
import { Orbitron } from 'next/font/google'
import { BlogCardProps } from '@/components/BlogCard'
import React from 'react'
import Link from 'next/link'

const orbitron = Orbitron({ subsets: ['latin'] })

function TrendingTopics(props: {title?: string, blogs?: BlogCardProps[], number?: number}) {
  return (
    <div className='md:px-24 flex flex-col mt-6'>
        <span className={`font-bold text-4xl my-16 mb-8 ml-10 md:ml-0`}>
          {props.title? props.title : "Trending Topics"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4">
          {
            props.blogs ? props.blogs.map((blog, index) => {
              return <BlogCard blogId={blog.blogId} key={index} title={blog.title} previewParagraph={blog.previewParagraph} image={blog.image} category={blog.category} date={blog.date} author={blog.author} authorImage={blog.authorImage} />
            }
            ) : [0,1,2].map((blog, index) => {
              return <BlogCard blogId={blog.toString()} key={index} title="Blog Title" previewParagraph="Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet." image="/assets/temporaryBlog2.png" category="AI and ML" date="12 June, 2023" author="John Doe" authorImage="/assets/temporaryAuthor.png" />
            })
          }
        </div>
    </div>
  )
}

export default TrendingTopics