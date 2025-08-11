import { RequestHandler } from "express";
import { getAllBanners } from "../services/banner";
import { getAbsoluteImageIrl } from "../utils/get-absolute-image-url";

export const getBanners: RequestHandler = async (req, res) => {
  const banners = await getAllBanners();
  const bannersWithAbsoluteUrl = banners.map((banner) => ({
    ...banner,
    img: getAbsoluteImageIrl(banner.img),
  }));
  res.json({ error: null, banners: bannersWithAbsoluteUrl });
};
