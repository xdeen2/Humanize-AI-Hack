import Link from 'next/link'
import React from 'react'

function BlogCard(props: BlogCardProps = DefaultBlogProps) {
  return (
    <Link href={`/blogs/${props.blogId}`}>
    <div className='flex flex-col cursor-pointer h-full p-6 rounded-lg mx-5 bg-neutral-300' style={{boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)"}}>
        <img src={props.image} alt="Blog Image" className='w-full mb-3 h-44 object-cover' />
        <span className='text-secondary-500 font-semibold text-sm'>{props.category}</span>
        <div className="flex w-full justify-between my-2">
            <span className='text-bg-900 font-bold text-2xl'>{props.title}</span>
            <img src="/assets/arrow.svg" alt="" className='fill-bg-900 w-2.5 h-2.5' />
        </div>
        <span className='text-bg-50 mb-auto'>{props.previewParagraph}</span>
        <div className="flex mt-5 gap-3">
            <img src={props.authorImage} alt="Author Image" className='rounded-full w-10 h-10' />
            <div className="flex flex-col">
                <span className='text-sm text-bg-50 font-semibold'>{props.author}</span>
                <span className='text-sm text-neutral-900'>{props.date}</span>
            </div>
        </div>
    </div>
    </Link>
  )
}

export interface BlogCardProps {
    title: string,
    blogId?: string,
    previewParagraph: string,
    image: string,
    category: string,
    date: string,
    author: string,
    authorImage: string
}

// defining default props
const DefaultBlogProps: BlogCardProps = {
    title: "Blog Title",
    blogId: "1",
    previewParagraph: "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet. Vulputate arcu eget quam sed purus mattis duis in ante. Viverra ac enim massa maecenas. Et praesent maecenas sed augue eu nisl condimentum.",
    image: "/assets/temporaryBlog2.png",
    category: "AI and ML",
    date: "12 June, 2023",
    author: "John Doe",
    authorImage: "/assets/temporaryAuthor.png"
}

export default BlogCard