import { GetPosts } from "../lib/queries/GetPosts"
import { useQuery } from "@tanstack/react-query"

export default function TanStack () {
    const { data: posts, isLoading, isError } = useQuery({
        queryKey: "posts",
        queryFn: GetPosts
    });




if (isLoading)  { return <h1>Loading...</h1>}
    return (
        <div className="">
            <h1 className="text-4xl font-semibold">Posts</h1>
            <div className="flex flex-col gap-6">
                {isError ? <h1>Error fetching posts</h1> : (
                    <>
                        {posts.map((post, index) => (
                            <div key={index} className="bg-gray-300 rounded-full">
                                <h2>{post.title}</h2>
                        </div>
                        ))}
                    </>
                )} 
            </div>
        </div>
    )
}