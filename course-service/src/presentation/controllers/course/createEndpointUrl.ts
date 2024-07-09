import { Request, Response, NextFunction } from "express";
import Mux from '@mux/mux-node'
import { IDependencies } from "../../../application/interfaces/IDependencies";

const mux = new Mux({
    tokenId:process.env.MUX_TOKEN_ID,
    tokenSecret:process.env.MUX_TOKEN_SECRET
})

const { video } = mux

export const createEndpointUrl = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const upload  = await video.uploads.create({
                cors_origin: "*",
                new_asset_settings: {
                  playback_policy: ["public"],
                  encoding_tier: "baseline",
                },
              });
              res.json(upload);
        } catch (error) {
            next(error);
        }
    }
}

