import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import { PostList } from "./components/PostList";

function App() {
    const [items, setItems] = useState([]);

    const [pageStart, setPageStart] = useState(0);
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchPosts() {
            try {
                // other endpoint = posts
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                const data = await res.json();

                if (data?.length > 0) {
                    // setPosts(data?.slice(pageStart, pageStart + 10));
                    setItems([...data]);
                }
            } catch (err) {
                console.log(err);
                return;
            }
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        if (items?.length > 0) {
            const pageEnd = pageStart + itemsPerPage;

            setPosts(items?.slice(pageStart, pageEnd));

            setPageCount(Math.ceil(items?.length / itemsPerPage));
        }
    }, [pageStart, itemsPerPage, items]);

    const handlePageChange = (event) => {
        console.log(event.selected);
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setPageStart(newOffset);
    };

    return (
        <div>
            <ReactPaginate
                previousLinkClassName="prev-link"
                nextLinkClassName="next-link"
                containerClassName="pagination"
                pageLinkClassName="page"
                activeLinkClassName="activePage"
                disabledLinkClassName="disabled-link"
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                renderOnZeroPageCount={() => <h3>zero page count</h3>}
            />
            <PostList allPosts={posts} />
        </div>
    );
}

export default App;
