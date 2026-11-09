import React from "react";
import MediaCard, { CardTitle, CardMeta } from "./mediaCard";

// GitHub's social preview: the custom image if the repo has one, otherwise a generated card.
const previewImage = (url) =>
  `https://opengraph.githubassets.com/1/${url.replace("https://github.com/", "")}`;

export default function ProjectSection({
  name,
  description,
  language,
  languageColor,
  stars,
  url,
}) {
  return (
    <MediaCard href={url} image={previewImage(url)}>
      <div>
        <CardTitle lines={1}>{name.replace(/[_-]+/g, " ")}</CardTitle>
        {description && (
          <p
            title={description}
            style={{
              margin: "0.35em 0 0",
              fontSize: "0.85rem",
              color: "#4b5563",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        )}
      </div>
      <CardMeta>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              gap: "0.7em",
              alignItems: "center",
            }}
          >
            {language && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4em",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: languageColor || "#1b2a41",
                  }}
                />
                {language}
              </span>
            )}
            {stars > 0 && <span>★ {stars}</span>}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "32px",
              padding: "0 0.9em",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: "#1b2a41",
              color: "#f1f2ee",
              letterSpacing: "0.02em",
            }}
          >
            ☆ Star
          </span>
        </div>
      </CardMeta>
    </MediaCard>
  );
}
