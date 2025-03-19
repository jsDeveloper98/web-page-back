import fs from "fs";
import sharp from "sharp";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Product } from "../models";
import { IRequest } from "../@types";

class ProductC {
  async create(req: IRequest, res: Response) {
    try {
      const plainObject = Object.assign({}, req.body);
      const errors = validationResult(plainObject);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Invalid Data",
        });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Image does not exist", data: null });
      }

      const now = Date.now();

      const originalImagePath = `uploads/${now}-full-${req.file.originalname}`;
      const setka = await sharp(req.file.path).toBuffer();
      // fs.writeFileSync(originalImagePath, "sdfsfsdf"); // Write the original image buffer to file

      // Resize the uploaded image using Sharp
      const resizedImageBuffer = await sharp(req.file.path)
        .resize({ width: 240, height: 320, fit: "cover" })
        .toBuffer();

      // Save the resized image
      // Assuming you have a folder named 'uploads' where you want to save the processed images
      const imagePath = `uploads/${now}-${req.file.originalname}`;
      await sharp(resizedImageBuffer).toFile(imagePath);

      await sharp(setka).toFile(originalImagePath);

      const productModel = new Product({
        ...req.body,
        image: imagePath,
        user: req.user?.userId,
      });

      const product = await productModel.save();

      res.status(201).json({
        data: product,
        message: "Created",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async delete(req: IRequest, res: Response) {
    try {
      await Product.findOneAndDelete({ _id: req.params.productId });

      res.json({
        data: { _id: req.params.productId },
        message: "Deleted",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async get(req: IRequest, res: Response) {
    try {
      const products = await Product.find({ user: req.user?.userId }).sort({
        createdAt: -1,
      });
      return res.json({
        data: products,
        message: "Success",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async getById(req: IRequest, res: Response) {
    try {
      const product = await Product.findById(req.params.productId);

      return res.json({
        data: product,
        message: "Success",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const ProductController = new ProductC();
