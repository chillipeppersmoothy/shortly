import { ShortenedURL, ShortURLResponse } from "../interface/types";

const API_URL = "https://smally-psi.vercel.app";

export async function postUrl(record: ShortenedURL): Promise<ShortURLResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  return data;
}

export async function patchUrl(slug: string, clicks: number): Promise<boolean> {
  console.log("Updating clicks for slug:", slug, "to", clicks);
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clicks }),
    });
    console.log("Response status:", response);
    await response.json();

    if (!response.ok) {
      throw new Error("Failed to update clicks");
    }

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteUrl(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete URL");
    }

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserUrls(user: string): Promise<ShortenedURL[]> {
  try {
    const response = await fetch(`${API_URL}/users/${user}`);

    if (!response.ok) {
      throw new Error("Failed to retrieve user data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch URLs:", error);
    return [];
  }
}
