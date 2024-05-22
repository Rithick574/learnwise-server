import { Request, Response, NextFunction } from "express";
import Mux from '@mux/mux-node'

const mux = new Mux({
    tokenId:process.env.MUX_TOKEN_ID,
    tokenSecret:process.env.MUX_TOKEN_SECRET
})

const { video } = mux

export const getPlaybackId = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { uploadId } = req.params;
      
      try {
        const upload = await video.uploads.retrieve(uploadId);
        if (!upload.asset_id) {
            return res.status(404).send("Asset not found");
          }
        if (upload.asset_id) {
          const asset = await video.assets.retrieve(upload.asset_id);
          const playbackId = asset.playback_ids ? asset.playback_ids[0].id : null;
          res.json({ playbackId });
        } else {
          res.status(404).json({ message: "Asset not yet available. Please try again later." });
        }
      } catch (error) {
        next(error);
      }
    };
  };
  
