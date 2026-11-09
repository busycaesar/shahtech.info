const BLOGS_NEEDED = 6;
const BLOGS_API = process.env.NEXT_PUBLIC_BLOGS_URL || "https://dev.to/api";

export const getBlogs = async () => {
  try {
    const response = await fetch(
      `${BLOGS_API}/articles?username=busycaesar&per_page=${BLOGS_NEEDED}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getBlog = async (id) => {
  try {
    const response = await fetch(
      `${BLOGS_API}/articles/${id}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
