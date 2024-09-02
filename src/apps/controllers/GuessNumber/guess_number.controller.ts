import asyncHandler from "@core/helpers/asyncHandler";
import HttpResponse from "@core/modules/response/HttpResponse";
import route from "@routes/v1";
import { type Request, type Response } from "express";
import GuessNumberService from "@apps/services/GuessNumber/guess_number.service";
import authorization from "@apps/middlewares/authorization";

route.post(
  "/start_game",
  authorization,
  asyncHandler(async function getTopCoinPairs(req: Request, res: Response) {
    const data = req.getBody();
    const auth = req.getState("userId");
    await GuessNumberService.start(auth)

    const httpResponse = HttpResponse.created({ ok: true });
    res.status(200).json(httpResponse);
  })
);

route.post(
  "/guess",
  authorization,
  asyncHandler(async function getTopCoinPairs(req: Request, res: Response) {
    const data = req.getBody();
    const auth = req.getState("userId");
    const result = await GuessNumberService.guess(data, auth)

    const httpResponse = HttpResponse.created({ result });
    res.status(200).json(httpResponse);
  })
);
