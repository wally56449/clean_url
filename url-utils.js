// 清除追蹤參數
function cleanTrackingParams(url, trackingKeys) {
  if (!trackingKeys) {
    trackingKeys = new Set([
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "fbclid", "gclid", "igshid", "mc_cid", "mc_eid",
      "ref", "ref_src", "ref_url", "__cft__", "__tn__",
      "rdid", "share_url"
    ]);
  }

  try {
    const urlObj = new URL(url);
    for (const key of trackingKeys) {
      urlObj.searchParams.delete(key);
    }
    return urlObj.toString();
  } catch (e) {
    console.error("無效網址:", url);
    return url;
  }
}

// 還原重定向網址（僅能處理簡單跳轉鏈）
async function resolveRedirects(url) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    return response.url;
  } catch (error) {
    console.error("錯誤：無法還原網址", error);
    return url;
  }
}

// 主處理流程
export async function cleanAndResolveUrl(url) {
  const resolved = await resolveRedirects(url);
  return cleanTrackingParams(resolved);
}