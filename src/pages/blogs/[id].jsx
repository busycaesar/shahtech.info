import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBlog } from "@/Lib";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Blog() {
  const { id } = useRouter().query;
  const [blog, setBlog] = useState();
  useEffect(() => {
    if (!id) return;
    getBlog(id)
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    blog && (
      <>
        <h1>{blog.title}</h1>
        <div className="bg-slate-300 p-3 rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: blog.body_html }} />
        </div>
        <Link href="/#blog">
          <Button variant="dark" className="!text-xl my-3">
            Back
          </Button>
        </Link>
      </>
    )
  );
}
