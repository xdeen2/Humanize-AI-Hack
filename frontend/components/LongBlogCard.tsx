import Link from "next/link"

function LongBlogCard(props: LongBlogCardProps) {
  return (
    <Link href={`/blogs/${props.blogId}`}>
    <div className={`flex flex-col-reverse md:flex-row gap-2 md:gap-16 cursor-pointer my-10 md:my-5 ${props.className}`}>

        <div className="flex flex-col grow">
            <div className="flex items-center my-4 mb-6">
                <span className="px-3 py-2 bg-neutral-500">
                    AI upgrade
                </span>
                <span className="px-3 py-2 text-bg-900 font-semibold text-sm">
                    AUGUST 13, 2021
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-bg-900 text-2xl font-bold">
                    {props.title}
                </span>
                <span className="font-medium text-base text-bg-50">
                    {props.description}
                </span>
                <span className="text-primary-500 font-semibold cursor-pointer">
                    Read more
                </span>
            </div>
        </div>

        <img src="/assets/temp-blog-thumbnail.png" className="rounded-lg w-80 object-cover" alt="" />

    </div>
    </Link>
  )
}

interface LongBlogCardProps {
    className?: string
    date?: string
    category?: string
    title?: string
    blogId?: string
    description?: string
    image?: string
}

LongBlogCard.defaultProps = {
    className: "",
    date: "12 June, 2023",
    category: "AI upgrade",
    title: "Blog topic name will come here",
    blogId: "1",
    description: "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet. Vulputate arcu eget quam sed purus mattis duis in ante. Viverra ac enim massa maecenas. Et praesent maecenas sed augue eu nisl condimentum.",
    image: "/assets/temp-blog-thumbnail.png"
}

export default LongBlogCard