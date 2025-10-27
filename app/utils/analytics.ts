// app/utils/analytics.ts
// Analytics tracking utilities

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }

  // Console log for development
  console.log("Analytics Event:", eventName, eventData);
};

export const trackCouponClick = (couponId: string, storeName: string, code: string) => {
  trackEvent("coupon_click", {
    coupon_id: couponId,
    store_name: storeName,
    coupon_code: code,
    timestamp: new Date().toISOString(),
  });

  // Store in localStorage for mock analytics (only on client side)
  if (typeof window !== "undefined") {
    try {
      const clicks = JSON.parse(localStorage.getItem("coupon_clicks") || "[]");
      clicks.push({
        couponId,
        storeName,
        code,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("coupon_clicks", JSON.stringify(clicks));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

export const trackPageView = (path: string, title: string) => {
  trackEvent("page_view", {
    page_path: path,
    page_title: title,
  });
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent("search", {
    search_term: query,
    results_count: resultsCount,
  });
};

export const getAnalytics = () => {
  // Return empty stats if not in browser
  if (typeof window === "undefined") {
    return {
      totalClicks: 0,
      topStores: {},
      topCoupons: {},
      clicksByDay: {},
    };
  }

  try {
    const clicks = JSON.parse(localStorage.getItem("coupon_clicks") || "[]");

    const stats = {
      totalClicks: clicks.length,
      topStores: {} as Record<string, number>,
      topCoupons: {} as Record<string, number>,
      clicksByDay: {} as Record<string, number>,
    };

    clicks.forEach((click: any) => {
      stats.topStores[click.storeName] = (stats.topStores[click.storeName] || 0) + 1;

      stats.topCoupons[click.couponId] = (stats.topCoupons[click.couponId] || 0) + 1;

      const day = new Date(click.timestamp).toISOString().split("T")[0];
      stats.clicksByDay[day] = (stats.clicksByDay[day] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return {
      totalClicks: 0,
      topStores: {},
      topCoupons: {},
      clicksByDay: {},
    };
  }
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}