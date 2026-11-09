import React, { useEffect, useState } from "react";
import { getBlogs } from "@/Lib";
import { formatDate } from "@/Lib/formatDate";
import { BLOG_URL, YOUTUBE_URL } from "@/siteConfig";
import MediaCard, { CardTitle, CardMeta } from "@/Components/mediaCard";
import Label from "@/Components/label";
import { Row, Col, Button } from "react-bootstrap";

function MoreLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button variant="dark" className="!text-lg my-2">
        {children}
      </Button>
    </a>
  );
}

const thumbnail = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export default function BlogsAndVideos({ videos }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(
            [...data].sort((a, b) =>
              (b.published_at || "").localeCompare(a.published_at || ""),
            ),
          );
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="blogs-videos" className="content-section">
      <h1>
        <strong>BLOGS & VIDEOS</strong>
      </h1>

      <div style={{ marginBottom: "2.5em" }}>
        <Label>Blogs</Label>
        <Row className="align-items-stretch">
          {blogs.map((blog, index) => (
            <Col lg={4} md={6} key={blog.id} className="mb-3 d-flex">
              <MediaCard
                href={blog.url}
                image={blog.social_image}
                badge={index === 0 ? "LATEST" : null}
              >
                <CardTitle>{blog.title}</CardTitle>
                <CardMeta>
                  {formatDate(blog.published_at)} · {blog.reading_time_minutes} min read
                </CardMeta>
              </MediaCard>
            </Col>
          ))}
        </Row>
        <MoreLink href={BLOG_URL}>All posts on DEV</MoreLink>
      </div>

      <div>
        <Label>Videos</Label>

        <Row className="align-items-stretch">
          {videos.map((video) => (
            <Col lg={4} md={6} key={video.id} className="mb-3 d-flex">
              <MediaCard href={video.url} image={thumbnail(video.id)} aspect="16 / 9">
                <CardTitle>{video.title}</CardTitle>
                <CardMeta>{formatDate(video.publishedAt)}</CardMeta>
              </MediaCard>
            </Col>
          ))}
        </Row>
        <MoreLink href={YOUTUBE_URL}>YouTube channel</MoreLink>
      </div>
    </div>
  );
}
